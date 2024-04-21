import { StockData } from '../../../stocks/types';
import { gbrCalc } from './GBR';
import { rfCalc } from './ML';
import { svrCalc } from './SVR';
import { Dayjs } from 'dayjs';

export const mlCalc = (
  pred: string,
  data: StockData[],
  predictionDate: Dayjs
) => {
  if (pred === 'Random Forest') return rfCalc(data, predictionDate);
  if (pred === 'SVR') return svrCalc(data, predictionDate);
  if (pred === 'Gradient Boosting') return gbrCalc(data, predictionDate);
};

export const extrapolatePrediction = (
  result: StockData[],
  data: StockData[],
  prediction: StockData
): StockData[] => {
  // Make sure 'data' is not empty
  if (data.length === 0) {
    console.error('Data array is empty');
    return result;
  }

  // Find the last point of 'data'
  const lastDataPoint = data[data.length - 1];

  // Calculate the number of days between the last data point and the prediction date
  const daysUntilPrediction = Math.ceil(
    (prediction.date.getTime() - lastDataPoint.date.getTime()) /
      (24 * 60 * 60 * 1000)
  );

  // Calculate the price change per day
  const priceChangePerDay =
    (prediction.price - lastDataPoint.price) / daysUntilPrediction;

  // Extrapolate data between the last point of 'data' and 'prediction'
  for (let i = 1; i <= daysUntilPrediction; i++) {
    const date = new Date(
      lastDataPoint.date.getTime() + i * 24 * 60 * 60 * 1000
    );
    const price = lastDataPoint.price + i * priceChangePerDay;
    result.push({ date, price });
  }

  // Add the prediction to the result
  result.push(prediction);

  return result;
};

export const calculateVolatility = (data: StockData[]): number => {
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
