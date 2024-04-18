import { SVR } from 'svm';
import { StockData } from '../../../stocks/types';
import { Dayjs } from 'dayjs';

export const svcCalc = (
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

  // Initialize Support Vector Machine regression
  const regression = new SVR({
    kernel: 'rbf', // Radial Basis Function kernel
    C: 1, // Regularization parameter
    epsilon: 0.1 // Epsilon parameter in the epsilon-SVR model
  });

  // Train the regression model
  try {
    regression.fit(trainingSet, predictions);
  } catch (error) {
    console.error('Error during training:', error);
    return []; // Return empty array if training fails
  }

  // Predict using the trained model
  const result: StockData[] = [];
  trainingSet.forEach(([date, previousPrice]) => {
    const predictedPrice = regression.predict([[date, previousPrice]])[0];

    // Construct the predicted result object for the current date
    const predictedResult: StockData = {
      date: new Date(date), // Create a new Date object for the current date
      price: predictedPrice
    };

    // Add the predicted result to the prediction range array
    result.push(predictedResult);
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