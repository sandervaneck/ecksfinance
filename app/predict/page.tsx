'use client';

import React, { useState } from 'react';
import { Card } from '@tremor/react';
import { Box, Grid } from '@mui/material';
import { HeadBox } from '../sharedComponents/headbox';
import { Box1 } from './components/box1';
import dayjs, { Dayjs } from 'dayjs';

const PredictPage = () => {
  const title="Predict Stocks"
  const subtitle="Can you beat a Machine Learning predictor, that only bases its prediction on passed prices?"
  const [item, setItem] = useState('IBM');
  const [changed, setChanged] = useState(false)
  const [date, setDate] = React.useState<Dayjs | null>(dayjs('2025-01-01'));

  return (
    <>
      <Box sx={{ mt: 5, ml: 3, mr: 5 }}>
        <Card>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <Grid item xs={12}>
              <HeadBox title={title} subtitle={subtitle}/>
            </Grid>
            <Grid item xs={12}>
              <Box1 item={item} setItem={setItem} setChanged={setChanged} date={date} setDate={setDate}/>
            </Grid>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
};
export default PredictPage;