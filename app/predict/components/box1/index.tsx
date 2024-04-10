import { Grid, Card } from '@mui/material';
import React from 'react';
import { SelectTicker } from '../../../stocks/components/box1/components/SelectTicker';
import { Box1Props } from '../../types';
import { SelectPredictionDate } from './components/SelectPredictionDate';

export const Box1: React.FC<Box1Props> = ({
  item,
  setItem,
  setChanged,
  date,
  setDate
}) => {
  return (
    <Card>
      <Grid container xs={12}>
        <Grid item xs={4}>
          <SelectTicker
            item={item}
            setItem={(e) => {
              setChanged(true);
              setItem(e);
            }}
          />
        </Grid>
        <Grid item xs={8}>
          <SelectPredictionDate date={date} setDate={setDate} />
        </Grid>
      </Grid>
    </Card>
  );
};
