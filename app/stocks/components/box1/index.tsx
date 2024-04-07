import { Card, Grid } from '@mui/material';
import { Box1Props, Stock } from '../../types';
import { SelectTicker } from './components/SelectTicket';
import { TotalCard } from './components/TotalInvestmentCard';

export const Box1: React.FC<Box1Props> = ({
  item,
  setItem,
  stocks,
  setStocks,
  investmentData
}) => {
  return (
    <Card>
      <Grid container xs={12}>
        <Grid item xs={4}>
          <SelectTicker
            item={item}
            setItem={setItem}
            stocks={stocks}
            setStocks={setStocks}
            investmentData={investmentData}
          />
        </Grid>
        <Grid item xs={8}>
          <TotalCard
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
