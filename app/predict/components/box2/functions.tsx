import { StockData } from "../../../stocks/types";
import { rfCalc } from "./ML";
import { svcCalc } from "./SVC";
import { Dayjs } from 'dayjs';

export const mlCalc = (pred: string, data: StockData[], predictionDate: Dayjs) => {
    if (pred === "Random Forest") return rfCalc(data, predictionDate)
    if (pred === "SVC") return svcCalc(data, predictionDate)
}

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