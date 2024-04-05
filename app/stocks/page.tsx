'use client';

import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { Card, Title, Text, LineChart } from '@tremor/react';
import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  TextField
} from '@mui/material';

export const createRange = (start: number, end: number): number[] =>
  Array.from({ length: end - start }, (v, k) => k + start);

interface StockData {
  date: Date;
  price: number;
}

interface InvestmentData {
  startedInvestingYear: number;
  stoppedInvestingYear: number;
  yearOfTotalAmount: number;
  investments: {
    year: number;
    monthlyInvestment: number;
  }[];
}

const InvestmentCalculator = ({
  investmentData
}: {
  investmentData: InvestmentData;
}) => {
  const [totalInvestmentValue, setTotalInvestmentValue] = useState<
    number | null
  >(null);
  const [stocks, setStocks] = useState([{ date: new Date(), price: 0 }]);

  const parseData = async () => {
    try {
      const response = await fetch('/stocks.xlsx');
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = (event) => {
        const data =
          event.target && new Uint8Array(event.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rows: any[] = XLSX.utils.sheet_to_json(worksheet, {
          header: 1
        });

        const parsedStocks: StockData[] = [];
        // Assuming your data starts from the second row (index 1)
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          const dateParts = row[0].split('-').map(Number);
          const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
          const price = Number(row[4]);
          parsedStocks.push({ date, price });
        }

        setStocks(parsedStocks);
      };
      reader.readAsArrayBuffer(blob);
    } catch (error) {
      console.error('Error parsing stock data:', error);
    }
  };
  useEffect(() => {
    if (stocks.length > 1) {
      calculateTotalInvestmentValue();
    }
  }, [stocks]);
  const calculateTotalInvestmentValue = () => {
    let capital = 0; // Initialize capital
    let totalInvestmentValue = 0; // Initialize total investment value

    investmentData.investments.forEach((investment) => {
      // Calculate amount for this investment
      const amount = capital + investment.monthlyInvestment;

      // Filter stocks for the investment year
      const filteredStocks = stocks.filter(
        (s) => s.date.getFullYear() === investment.year
      );

      // Calculate the investment value for each month in the investment year
      filteredStocks.forEach((s, i) => {
        const nextPrice =
          i !== filteredStocks.length - 1 ? filteredStocks[i + 1].price : null;
        const res = nextPrice ? (nextPrice - s.price) / s.price : 0;
        const monthlyInvestmentValue = (res + 1) * investment.monthlyInvestment;

        // Add the monthly investment value to the total investment value
        totalInvestmentValue += monthlyInvestmentValue;
      });

      // Update the capital for the next investment year
      capital = amount;
    });

    setTotalInvestmentValue(totalInvestmentValue);
  };

  return (
    <div>
      <Card>
        <Grid container xs={12}>
          <Grid item xs={4}>
            <Button
              variant="contained"
              onClick={() => {
                if (stocks.length === 1) parseData();
                calculateTotalInvestmentValue();
              }}
              // calculateTotalInvestmentValue}
              style={{ border: 5, color: 'black' }}
            >
              Calculate Total Investment Value
            </Button>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={6}>
            Total Value in {investmentData.yearOfTotalAmount}:{' '}
            {totalInvestmentValue !== null
              ? `€${totalInvestmentValue.toFixed(2)}`
              : '€'}
          </Grid>
        </Grid>
      </Card>
      <Chart data={stocks} />
    </div>
  );
};

const Chart = ({ data }: { data: StockData[] }) => {
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
            day: 'numeric'
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

const StocksPage = () => {
  const [investmentData, setInvestmentData] = useState<InvestmentData>({
    startedInvestingYear: 2010,
    stoppedInvestingYear: 2015,
    yearOfTotalAmount: 2020,
    investments: [
      { year: 2010, monthlyInvestment: 100 },
      { year: 2011, monthlyInvestment: 110 },
      { year: 2012, monthlyInvestment: 120 },
      { year: 2013, monthlyInvestment: 130 },
      { year: 2014, monthlyInvestment: 140 },
      { year: 2015, monthlyInvestment: 150 }
    ]
  });

  return (
    <>
      <Box sx={{ mt: 5, ml: 3, mr: 5 }}>
        <Grid container xs={12}>
          <Grid container xs={8}>
            <Grid item xs={5}>
              <Box sx={{ mt: 2 }}>In case I started investing in:</Box>
            </Grid>
            <Grid item xs={5}>
              <TextField
                helperText="Year must be before year you stopped investing"
                sx={{ height: 1 }}
                autoComplete="on"
                error={
                  Number(investmentData.startedInvestingYear) >=
                  Number(investmentData.stoppedInvestingYear)
                }
                type="number"
                fullWidth
                onChange={(e) => {
                  setInvestmentData({
                    ...investmentData,
                    startedInvestingYear: Number(e.target.value)
                  });
                }}
                value={investmentData.startedInvestingYear}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={2}></Grid>
            <Divider />
            <Grid item xs={5}>
              <Box sx={{ mt: 2 }}>And stopped investing in:</Box>
            </Grid>
            <Grid item xs={5}>
              <TextField
                helperText="Year must be after year you started investing"
                sx={{ height: 1 }}
                autoComplete="on"
                error={
                  Number(investmentData.startedInvestingYear) >=
                  Number(investmentData.stoppedInvestingYear)
                }
                type="number"
                fullWidth
                onChange={(e) =>
                  setInvestmentData({
                    ...investmentData,
                    stoppedInvestingYear: Number(e.target.value)
                  })
                }
                value={investmentData.stoppedInvestingYear}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={2}></Grid>
            <Divider />
            <Grid item xs={5}>
              <Box sx={{ mt: 2 }}>And I want to know my total capital in:</Box>
            </Grid>
            <Grid item xs={5}>
              <TextField
                helperText="Year must be after year you started investing"
                sx={{ height: 1 }}
                autoComplete="on"
                error={
                  Number(investmentData.yearOfTotalAmount) <=
                  Number(investmentData.startedInvestingYear)
                }
                type="number"
                fullWidth
                onChange={(e) =>
                  setInvestmentData({
                    ...investmentData,
                    yearOfTotalAmount: Number(e.target.value)
                  })
                }
                value={investmentData.yearOfTotalAmount}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container xs={4}>
            <Grid item xs={12}>
              Monthly Investments:
            </Grid>
            {investmentData.investments.map((investment, index) => (
              <>
                <Grid item xs={2}>
                  <Box sx={{ mt: 2 }}>{investment.year}:</Box>
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    sx={{ height: 1 }}
                    autoComplete="on"
                    type="number"
                    fullWidth
                    onChange={(e) => {}}
                    value={investmentData.investments[index].monthlyInvestment}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">€</InputAdornment>
                      )
                    }}
                  />
                </Grid>
              </>
            ))}
          </Grid>
          <Grid item xs={12}>
            <InvestmentCalculator investmentData={investmentData} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default StocksPage;
