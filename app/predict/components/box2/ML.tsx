import { RandomForestRegression as RFRegression } from 'ml-random-forest';
import { StockData } from '../../../stocks/types';
import { Dayjs } from 'dayjs';
import { calculateVolatility } from './functions';

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
  const volatility = calculateVolatility(data);

  // Iterate over each day from the next day after the last date to the prediction date
  for (
    let date = new Date(lastDate.getTime() + 24 * 60 * 60 * 1000);
    date <= predictionDate.toDate();
    date.setDate(date.getDate() + 1)
  ) {
    const previousData = data.slice(-45); // Take the previous 45 days
    const previousPrice = previousData[previousData.length - 1].price; // Price of the last day in previous data

    const randomFactor = Math.random() * volatility * (2 - volatility); // Random factor based on volatility
    const predictedPrice =
      regression.predict([[date.getTime(), previousPrice]])[0] + randomFactor;

    // Construct the predicted result object for the current date
    const predictedResult: StockData = {
      date: new Date(date.getTime()), // Create a new Date object for the current date
      price: predictedPrice
    };

    // Add the predicted result to the prediction range array
    result.push(predictedResult);
  }

  // Return the predicted result
  return result.filter((r) => r.date >= lastDate);
};
