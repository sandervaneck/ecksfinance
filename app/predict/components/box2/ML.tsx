import { RandomForestRegression as RFRegression } from 'ml-random-forest';
import { StockData } from '../../../stocks/types';
import { Dayjs } from 'dayjs';

const calculateVolatility = (data: StockData[]): number => {
  // Calculate daily returns
  const returns = data
    .slice(1)
    .map((d, i) => (d.price - data[i].price) / data[i].price);

  // Calculate standard deviation of returns as a proxy for volatility
  const stdDev = Math.sqrt(
    returns.reduce((sum, r) => sum + Math.pow(r, 2), 0) / returns.length
  );

  return stdDev;
};

export const rfCalc = (
  data: StockData[],
  predictionDate: Dayjs
): StockData[] => {
  // Create the dataset array with proper types
  const dataset: [Date, number][] = data.map((s) => [s.date, s.price]);

  // Convert the dataset into arrays for training set and predictions
  const trainingSet: number[][] = dataset.map(([date, price]) => [
    date.getTime(),
    price
  ]);
  const predictions: number[] = dataset.map(([_, price]) => price);

  // Define options for random forest regression
  const options = {
    seed: 3,
    maxFeatures: 1,
    replacement: false,
    nEstimators: 1000
  };

  // Initialize random forest regression
  const regression = new RFRegression(options);

  // Train the regression model
  try {
    regression.train(trainingSet, predictions);
  } catch (error) {
    console.error('Error during training:', error);
    return []; // Return empty array if training fails
  }

  // Predict using the trained model
  const result: StockData[] = [];
  regression.predict(trainingSet).forEach((price, i) => {
    result.push({ date: new Date(trainingSet[i][0]), price });
  });

  const lastDate = data[data.length - 1].date;
  const lastPrice = data[data.length - 1].price;
  const volatility = calculateVolatility(data);

  // Iterate over each day from the last date in data to the prediction date
  let previousPrice = lastPrice; // Initialize previousPrice with the last known price
  for (
    let date = new Date(lastDate.getTime());
    date <= predictionDate.toDate();
    date.setDate(date.getDate() + 1)
  ) {
    // Calculate the time difference between the current date and the last date in days
    const timeDifference =
      (date.getTime() - lastDate.getTime()) / (24 * 60 * 60 * 1000);

    // Extrapolate the price using the regression model and considering volatility
    const randomFactor = Math.random() * volatility * (2 - volatility); // Random factor based on volatility
    const timeFactor = Math.min(timeDifference / 45, 1); // Limit timeFactor to 1 (45 days or less)
    console.log(previousPrice);
    const predictedPrice =
      regression.predict([[date.getTime(), previousPrice]])[0] + randomFactor;

    // Construct the predicted result object for the current date
    const predictedResult: StockData = {
      date: new Date(date.getTime()), // Create a new Date object for the current date
      price: predictedPrice
    };

    // Add the predicted result to the result array
    result.push(predictedResult);

    // Update previousPrice for the next iteration
    previousPrice = predictedPrice;
  }

  return result;
};
