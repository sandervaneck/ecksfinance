import dayjs, { Dayjs } from 'dayjs';
import { StockData } from '../stocks/types';

export interface Box1Props {
  item: string;
  setItem: (s: string) => void;
  setChanged: (s: boolean) => void;
  date: Dayjs;
  setDate: (d: Dayjs) => void;
  stocks: StockData[];
  setStocks: (s: StockData[]) => void;
  setMl: (s: StockData[]) => void;
  ml: StockData[];
  prediction: StockData[];
  setPrediction: (s: StockData[]) => void;
}
