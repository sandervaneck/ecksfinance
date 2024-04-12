import { Grid, Card, TextField } from '@mui/material';
import React, { useState } from 'react';
import { SelectTicker } from '../../../stocks/components/box1/components/SelectTicker';
import { Box1Props } from '../../types';
import { SelectPredictionDate } from './components/SelectPredictionDate';
import { Button } from '@tremor/react';
import { extrapolatePrediction, mlCalc } from '../box2/ML';
import { StockData, emptyStock } from '../../../stocks/types';
import * as XLSX from 'xlsx';
import { getData } from '../../../stocks/components/box1/components/TotalInvestmentCard';
import { PredictButton } from './components/PredictButton';
import { Dayjs } from 'dayjs';
import { OwnPrediction } from './components/OwnPrediction';

export const Box1: React.FC<Box1Props> = ({
  item,
  setItem,
  stocks,
  setChanged,
  date,
  setDate,
  setStocks,
  ml,
  setMl,
  setPrediction,
  prediction
}) => {
  const parseData = async () => {
    try {
      const path = getData(item);
      const response = await fetch(path);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = (event) => {
        const data =
          event.target && new Uint8Array(event.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rows: any[] = XLSX.utils.sheet_to_json(worksheet, {
          header: 1
        });

        const parsedStocks: StockData[] = [];
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          const dateParts = row[0].split('-').map(Number);
          const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
          const price = Number(row[4]);
          parsedStocks.push({ date, price });
        }
        const sortedData = parsedStocks
          .slice()
          .sort((a, b) => a.date.getTime() - b.date.getTime());

        setStocks(sortedData);
      };
      reader.readAsArrayBuffer(blob);
    } catch (error) {
      console.error('Error parsing stock data:', error);
    }
  };
  const [predictedPrice, setPredictedPrice] = useState<number>(
    Number(stocks[stocks.length - 1].price.toFixed(2))
  );
  return (
    <Card>
      <Grid container xs={12} spacing={2}>
        <FirstGrid
          item={item}
          setItem={setItem}
          date={date}
          setDate={setDate}
          stocks={stocks}
          parseData={parseData}
          setMl={setMl}
          setChanged={setChanged}
          setStocks={setStocks}
          ml={ml}
        />
        <Grid item xs={6}>
          <OwnPrediction
            prediction={predictedPrice}
            setPrediction={(e: number) => {
              setPredictedPrice(e);
              const result: StockData[] = [];
              extrapolatePrediction(result, stocks, {
                date: date.toDate(),
                price: e
              });
              setPrediction(result);
            }}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

interface FirstGridProps {
  item: string;
  setItem: (e: string) => void;
  date: Dayjs;
  setDate: (e: Dayjs) => void;
  stocks: StockData[];
  setStocks: (e: StockData[]) => void;
  ml: StockData[];
  setMl: (e: StockData[]) => void;
  parseData: () => void;
  setChanged: (e: boolean) => void;
}
const FirstGrid: React.FC<FirstGridProps> = ({
  item,
  setItem,
  date,
  setDate,
  stocks,
  parseData,
  setMl,
  setChanged
}) => {
  return (
    <Grid item xs={6}>
      <Grid item xs={12}>
        <SelectTicker
          item={item}
          setItem={(e) => {
            setChanged(true);
            setItem(e);
            parseData();
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <SelectPredictionDate date={date} setDate={setDate} />
      </Grid>
      <Grid item xs={0.5}></Grid>
      <Grid item xs={11.5}>
        {date !== null && (
          <PredictButton
            onClick={() => {
              setMl(mlCalc(stocks, date));
              setChanged(true);
            }}
          />
        )}
      </Grid>
    </Grid>
  );
};
