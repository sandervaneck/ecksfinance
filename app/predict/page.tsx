'use client';

import React, { use, useState } from 'react';
import { Card } from '@tremor/react';
import { Box, Grid, Stack } from '@mui/material';
import { HeadBox } from '../sharedComponents/headbox';
import { Box1 } from './components/box1';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StockData, emptyStock } from '../stocks/types';
import { Box3 } from '../stocks/components/box3';
import { parseDefaultData } from '../stocks/components/box1/components/TotalInvestmentCard';
import { Chart, DoubleChart } from '../stocks/components/box3/components/Chart';

const PredictPage = () => {
  const title = 'Predict Stocks';
  const subtitle =
    'Can you beat a Machine Learning predictor, that only bases its prediction on passed prices?';
  const [item, setItem] = useState('IBM');
  const [date, setDate] = React.useState<Dayjs>(dayjs('2025-01-01'));
  const [stocks, setStocks] = useState([emptyStock]);
  const [ml, setml] = useState([emptyStock]);
  const [prediction, setPrediction] = useState<StockData[]>(ml);
  const [predict, setPredict] = useState(false);
  const [predictedPrice, setPredictedPrice] = useState<number>(
    Number(stocks[stocks.length - 1].price.toFixed(2))
  );

  if (stocks.length === 1) parseDefaultData(setStocks);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ mt: 5, ml: 3, mr: 5 }}>
          <Card>
            <Grid container xs={12} spacing={2}>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <HeadBox title={title} subtitle={subtitle} />
                </Grid>
                <Grid item xs={12}>
                  <Box1
                    setPredict={() => setPredict(true)}
                    stocks={stocks}
                    setStocks={setStocks}
                    item={item}
                    setItem={setItem}
                    date={date}
                    setDate={setDate}
                    setMl={setml}
                    ml={ml}
                    prediction={prediction}
                    setPrediction={(s) => {
                      setPrediction(s);
                    }}
                    predictedPrice={predictedPrice}
                    setPredictedPrice={setPredictedPrice}
                  />
                </Grid>
                <Stack direction="row" spacing={1}>
                  <Chart data={stocks} title="Historic Stock Prices" />
                  {prediction !== ml && predictedPrice !== 0 ? (
                    <DoubleChart
                      data={ml
                        .map((s, i) => {
                          const found = prediction.find(
                            (p) =>
                              p.date.getDate() === s.date.getDate() &&
                              p.date.getMonth() === s.date.getMonth() &&
                              p.date.getFullYear() === s.date.getFullYear()
                          );
                          return {
                            date: s.date,
                            prediction: found?.price || 0, // Assign a default value of 0 if 'prediction' is undefined
                            ml: s.price
                          };
                        })
                        .filter((i) => i.prediction !== 0)}
                      title={'Predicted vs ML Predicted Stock Prices'}
                    />
                  ) : (
                    <Chart data={ml} title="ML Predicted Stock Prices" />
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </LocalizationProvider>
    </>
  );
};
export default PredictPage;
