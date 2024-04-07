export interface StockData {
  date: Date;
  price: number;
}

export interface InvestmentData {
  startedInvestingYear: number;
  stoppedInvestingYear: number;
  yearOfTotalAmount: number;
  investments: {
    year: number;
    monthlyInvestment: number;
  }[];
}

export interface Stock {
  date: Date;
  price: number;
}
export const emptyStock: Stock = {
  date: new Date(),
  price: 0
};
export interface Box1Props {
  item: string;
  setItem: (s: string) => void;
  stocks: Stock[];
  setStocks: (s: Stock[]) => void;
  investmentData: InvestmentData;
}

export interface Box3Props {
  stocks: Stock[];
}

export interface Box2Props {
  investmentData: InvestmentData;
  setInvestmentData: (investmentData: InvestmentData) => void;
}
