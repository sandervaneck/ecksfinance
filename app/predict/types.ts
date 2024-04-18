import { Dayjs } from 'dayjs';
import { StockData } from '../stocks/types';

export interface Box1Props {
  item: string;
  setItem: (s: string) => void;
  date: Dayjs;
  setDate: (d: Dayjs) => void;
  stocks: StockData[];
  setStocks: (s: StockData[]) => void;
  predictors: Predictor[];
  prediction: StockData[];
  setPredictors: (s: Predictor[]) => void;
  setPredictedPrice: (b: number) => void;
  predictedPrice: number;
}

type Predictor = {
  name: string;
  show: boolean;
  prediction: StockData[];
}