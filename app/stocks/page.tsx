'use client';

import React, { useState } from 'react';
import { Card } from '@tremor/react';
import { Box, Grid } from '@mui/material';
import { InvestmentData, Stock, emptyStock } from './types';
import { Box1 } from './components/box1';
import { Box3 } from './components/box3';
import { Box2 } from './components/box2';
import { HeadBox } from '../sharedComponents/headbox';

const hundredPerYear = (): { year: number; monthlyInvestment: number }[] => {
  const currentYear = new Date().getFullYear();
  const startYear = 1960;
  const investments = [];

  for (let year = startYear; year <= currentYear; year++) {
    investments.push({ year, monthlyInvestment: 100 });
  }

  return investments;
};

const startInvestmentData: InvestmentData = {
  startedInvestingYear: 2000,
  stoppedInvestingYear: 2020,
  yearOfTotalAmount: 2024,
  investments: hundredPerYear()
};

const StocksPage = () => {
  const title="Compound investing returns (dollar average investing)"
  const subtitle="What would your returns have been in case you did dollar average investing in the followin tickers?"
  const [item, setItem] = useState('IBM');
  const [investmentData, setInvestmentData] =
    useState<InvestmentData>(startInvestmentData);
  const [stocks, setStocks] = useState<Stock[]>([emptyStock]);
  return (
    <>
      <Box sx={{ mt: 5, ml: 3, mr: 5 }}>
        <Card>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <HeadBox title={title} subtitle={subtitle}/>
            </Grid>
            <Grid item xs={12}>
              <Box1
                stocks={stocks}
                setStocks={setStocks}
                item={item}
                setItem={setItem}
                investmentData={investmentData}
              />
            </Grid>
            <Grid item xs={12}>
              <Box2
                investmentData={investmentData}
                setInvestmentData={setInvestmentData}
              />
            </Grid>
            <Grid item xs={12}>
              <Box3 stocks={stocks} />
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
};
export default StocksPage;
