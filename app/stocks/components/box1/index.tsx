import { Card, Grid } from '@mui/material';
import { Box1Props, Stock } from '../../types';
import { SelectTicker } from './components/SelectTicker';
import { TotalCard } from './components/TotalInvestmentCard';
import { useState } from 'react';

export const Box1: React.FC<Box1Props> = ({
  item,
  setItem,
  stocks,
  setStocks,
  investmentData
}) => {
  const [changed, setChanged] = useState(false);

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
          <TotalCard
            setChanged={setChanged}
            changed={changed}
            stocks={stocks}
            setStocks={setStocks}
            investmentData={investmentData}
            item={item}
          />
        </Grid>
      </Grid>
    </Card>
  );
};
