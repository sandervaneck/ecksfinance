import { Title, Card, Text, LineChart } from '@tremor/react';
import { Stock, StockData } from '../../../types';
import { CircularProgress } from '@mui/material';

interface ChartProps {
  data: StockData[];
  title: string;
}
export const Chart: React.FC<ChartProps> = ({ data, title }) => {
  return (
    <Card className="mt-8">
      <Title>{title}</Title>
      <Text>Daily Closing Prices</Text>
      {/* {secondData === undefined || secondData?.length > 1 ? ( */}
      <LineChart
        className="mt-4 h-80"
        data={data
          .filter((p) => p.date.toString() !== 'Invalid Date')
          .map((p) => ({
            price: p.price,
            date: p.date.toLocaleString('default', {
              month: 'short',
              // day: 'numeric',
              year: 'numeric' // Include year in the date format
            })
          }))}
        index="date"
        categories={['price']}
        colors={['green']}
        yAxisWidth={60}
        autoMinValue={true}
        startEndOnly={true}
      />
    </Card>
  );
};

type DoubleStockData = {
  prediction: number;
  ml: number;
  date: Date;
};
export const DoubleChart = ({
  data,
  title
}: {
  data: DoubleStockData[];
  title: string;
}) => {
  return (
    <Card className="mt-8">
      <Title>{title}</Title>
      <Text>Daily Closing Prices</Text>
      {!(data.map((p) => p.ml).length > 1) ? (
        <CircularProgress />
      ) : (
        <LineChart
          className="mt-4 h-80"
          data={data.map((p) => ({
            prediction: p.prediction,
            ml: p.ml,
            date: p.date.toLocaleString('default', {
              month: 'short',
              // day: 'numeric',
              year: 'numeric' // Include year in the date format
            })
          }))}
          index="date"
          categories={['ml', 'prediction']}
          colors={['indigo', 'rose']}
          autoMinValue={true}
          startEndOnly={true}
        />
      )}
    </Card>
  );
};
