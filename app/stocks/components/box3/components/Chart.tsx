import { Title, Card, Text, LineChart } from '@tremor/react';
import { StockData } from '../../../types';

export const Chart = ({ data }: { data: StockData[] }) => {
  return (
    <Card className="mt-8">
      <Title>Stock Price Trends</Title>
      <Text>Daily Closing Prices</Text>
      <LineChart
        className="mt-4 h-80"
        data={data.map((p) => ({
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
      />
    </Card>
  );
};
