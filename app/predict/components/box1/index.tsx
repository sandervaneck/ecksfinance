import { Grid, Card, Checkbox, Box } from '@mui/material';
import React from 'react';
import { SelectTicker } from '../../../stocks/components/box1/components/SelectTicker';
import { Box1Props } from '../../types';
import { SelectPredictionDate } from './components/SelectPredictionDate';
import { mlCalc } from '../box2/functions';
import { StockData} from '../../../stocks/types';
import * as XLSX from 'xlsx';
import { getData } from '../../../stocks/components/box1/components/TotalInvestmentCard';
import { PredictButton } from './components/PredictButton';
import { OwnPrediction } from './components/OwnPrediction';
import { extrapolatePrediction } from '../box2/functions';

export const Box1: React.FC<Box1Props> = ({
  predictors, 
  setPredictors,
  item,
  setItem,
  stocks,
  date,
  setDate,
  setStocks,
  setPrediction,
  predictedPrice,
  setPredictedPrice
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
  
  return (
    <Card>
      <Grid container xs={12} spacing={2}>
        <Grid item xs={6}>
          <Grid item xs={12}>
            <SelectTicker
              item={item}
              setItem={(e) => {
                // setChanged(true);
                setItem(e);
                parseData();
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectPredictionDate date={date} setDate={setDate} />
          </Grid>
          <Grid item xs={12}>
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
          <Grid item xs={0.5}></Grid>
          <Grid item xs={11.5}>
            {date !== null && (
              <PredictButton
                onClick={() => {
                 const toShow = predictors.filter(p => p.show).map(p => ({...p, results: mlCalc(p, stocks, date)}))
                  const preds = predictors.map(p => ({
                    ...p, results: p.show ? toShow.filter(z=> z.pred === p.pred)[0] : p.pred
                  }))
                  setPredictors(preds)
                }}/>
            )}
          </Grid>
        </Grid>
        <Grid xs={6} item>
          Show the following ML predictors:
          {predictors.map((pred, index) => (
            <Box sx={{ml:1, mt: 1}}>
            <Grid xs={2}><Checkbox checked={pred.show} onCheck={(e) => {
              const old = [...predictors]
              old[index] = {
                ...old[index],
                show: e.target.checked
              }
              setPredictors(old)
            }}/></Grid>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Card>
  );
};
