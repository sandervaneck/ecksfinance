import { Grid, Card, Checkbox, Box } from '@mui/material';
import React from 'react';
import { SelectTicker } from '../../../stocks/components/box1/components/SelectTicker';
import { Box1Props } from '../../types';
import { SelectPredictionDate } from './components/SelectPredictionDate';
import { mlCalc } from '../box2/functions';
import { StockData } from '../../../stocks/types';
import { PredictButton } from './components/PredictButton';
import { OwnPrediction } from './components/OwnPrediction';
import { extrapolatePrediction } from '../box2/functions';
import { parseData } from '../../../sharedComponents/functions';

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
  return (
    <Card>
      <Grid container xs={12} spacing={2}>
        <Grid item xs={6}>
          <Grid item xs={12}>
            <SelectTicker
              item={item}
              setItem={(e) => {
                setItem(e);
                parseData(e, setStocks);
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
                  // const toShow = predictors
                  //   .filter((p) => p.show)
                  //   .map((p) => ({
                  //     ...p,
                  //     results: mlCalc(p.name, stocks, date)
                  //   }));
                  // console.log(toShow);
                  // const preds = predictors.map((p) => ({
                  //   ...p,
                  //   results: p.show
                  //     ? toShow.filter((z) => z.name === p.name)[0]
                  //     : p.name
                  // }));
                  // setPredictors(preds);
                  if (
                    stocks.length > 0 &&
                    stocks
                      .map((s) => s.date.toString())
                      .includes('Invalid Date')
                  )
                    console.log(
                      stocks.length > 0 &&
                        stocks
                          .map((s) => s.date.toString())
                          .includes('Invalid Date')
                    );
                  parseData(item, setStocks);
                  const result = mlCalc('Random Forest', stocks, date);
                  const old = [...predictors];
                  const index = old.map((i) => i.name).indexOf('Random Forest');
                  old[index] = {
                    ...old[index],
                    prediction:
                      result !== undefined ? result : old[index].prediction
                  };
                  setPredictors(old);
                }}
              />
            )}
          </Grid>
        </Grid>
        {/* <Grid xs={6} item>
          Show the following ML predictors:
          {predictors.map((pred, index) => (
            <Box sx={{ ml: 1, mt: 1 }}>
              <Grid container xs={12}>
                <Grid item xs={2}>
                  <Checkbox
                    checked={pred.show}
                    onChange={(e) => {
                      const old = [...predictors];
                      old[index] = {
                        ...old[index],
                        show: e.target.checked
                      };
                      setPredictors(old);
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  {pred.name}
                </Grid>
              </Grid>
            </Box>
          ))}
        </Grid> */}
      </Grid>
    </Card>
  );
};
