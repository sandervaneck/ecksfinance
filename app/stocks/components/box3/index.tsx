import { Card, Grid } from '@mui/material';
import { Box3Props } from '../../types';
import { Chart } from './components/Chart';

export const Box3: React.FC<Box3Props> = ({ stocks }) => {
  return (
    <Card>
      <Grid item xs={12}>
        <Chart data={stocks} title="Historic Stock Prices" />
      </Grid>
    </Card>
  );
};
