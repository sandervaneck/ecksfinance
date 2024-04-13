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

export const mlCalc = (
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
    nEstimators: 200
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

  // Filter results to include only dates after the last date in the original data
  const lastDate = data[data.length - 1].date;
  const lastPrice = data[data.length - 1].price;
  // Calculate the next day after the last date
  const nextDay = new Date(lastDate.getTime() + 24 * 60 * 60 * 1000);

  const volatility = calculateVolatility(data);

  // Iterate over each day from the next day to the prediction date
  for (
    let date = nextDay;
    date <= predictionDate.toDate();
    date.setDate(date.getDate() + 1)
  ) {
    const previousDataPoint = result[result.length - 1];
    // Calculate the time difference between the current date and the last date in days
    const timeDifference =
      (date.getTime() - previousDataPoint.date.getTime()) /
      (24 * 60 * 60 * 1000);

    const randomFactor = Math.random() * volatility * 2 - volatility; // Random factor based on volatility
    const predictedPrice =
      previousDataPoint.price +
      (previousDataPoint.price - lastPrice) * (timeDifference / data.length) +
      randomFactor;

    // Construct the predicted result object for the current date
    const predictedResult: StockData = {
      date: new Date(date.getTime()), // Create a new Date object for the current date
      price: predictedPrice
    };

    // Add the predicted result to the prediction range array
    result.push(predictedResult);
  }

  // Return the predicted result
  return result.filter((d) => d.date > lastDate);
};

export const extrapolatePrediction = (
  result: StockData[],
  data: StockData[],
  prediction: StockData
): StockData[] => {
  const lastDate = data[data.length - 1].date;
  const lastPrice = data[data.length - 1].price;
  // Calculate the next day after the last date
  const nextDay = new Date(lastDate.getTime() + 24 * 60 * 60 * 1000);

  // Iterate over each day from the next day to the prediction date
  for (
    let date = nextDay;
    date <= prediction.date;
    date.setDate(date.getDate() + 1)
  ) {
    // Calculate the time difference between the current date and the last date in days
    const timeDifference =
      (date.getTime() - lastDate.getTime()) / (24 * 60 * 60 * 1000);

    // Predict the price for the current date using the extrapolated trend
    const predictedPrice =
      lastPrice +
      (prediction.price - lastPrice) * (timeDifference / data.length);

    // Construct the predicted result object for the current date
    const predictedResult: StockData = {
      date: new Date(date.getTime()), // Create a new Date object for the current date
      price: predictedPrice
    };

    // Add the predicted result to the result array
    result.push(predictedResult);
  }
  return result;
};
