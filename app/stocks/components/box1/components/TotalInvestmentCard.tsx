import { Stack, Card, Grid, Button, Box } from '@mui/material';
import { InvestmentData, Stock, StockData } from '../../../types';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { parseData } from '../../../../sharedComponents/functions';

interface TotalCardProps {
  stocks: Stock[];
  setStocks: (s: Stock[]) => void;
  investmentData: InvestmentData;
  item: string;
  changed: boolean;
  setChanged: (b: boolean) => void;
}

export const getData = (item: string): string => {
  let result;
  switch (true) {
    case item === 'S&P':
      result = '/SP.xlsx';
      break;
    case item === 'ACWI':
      result = '/ACWI.xlsx';
      break;
    default:
      result = '/AEX.xlsx';
  }

  return result;
};
export const TotalCard: React.FC<TotalCardProps> = ({
  investmentData,
  item,
  stocks,
  setStocks,
  changed,
  setChanged
}) => {
  const [totalInvestmentValue, setTotalInvestmentValue] = useState<
    number | null
  >(null);
  const [totalInvestedValue, setTotalInvestedValue] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (stocks.length > 1) {
      calculateTotalInvestmentValue();
    }
  }, [stocks]);

  const filteredInvestments = investmentData.investments.filter(
    (inv) =>
      inv.year >= investmentData.startedInvestingYear &&
      inv.year <= investmentData.stoppedInvestingYear
  );

  const calculateTotalInvestmentValue = () => {
    let capital = 0; // Initialize capital
    let totalInvestmentValue = 0; // Initialize total investment value
    let totalInvested = 0;
    filteredInvestments.forEach((investment) => {
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
        totalInvested += investment.monthlyInvestment;
      });

      // Update the capital for the next investment year
      capital = amount;
    });

    setTotalInvestmentValue(totalInvestmentValue);
    setTotalInvestedValue(totalInvested);
  };
  return (
    <Box sx={{ mt: 2, ml: 2 }}>
      <Grid container xs={12}>
        <Grid item xs={4}>
          <Button
            disabled={item === ''}
            variant="contained"
            onClick={() => {
              if (changed || stocks.length <= 1) {
                parseData(item, setStocks);
                setChanged(!changed);
              }
              calculateTotalInvestmentValue();
            }}
            style={{ border: 5, color: 'black' }}
          >
            Calculate Total
          </Button>
        </Grid>
        <Grid item xs={8}>
          <Stack direction="column">
            <Grid>
              Total amount invested until {investmentData.stoppedInvestingYear}:{' '}
              {totalInvestedValue !== null
                ? `€${totalInvestedValue.toFixed(2)}`
                : '€'}
            </Grid>
            <Grid>
              Total Value in {investmentData.stoppedInvestingYear}:{' '}
              {totalInvestmentValue !== null
                ? `€${totalInvestmentValue.toFixed(2)}`
                : '€'}
            </Grid>
            <Grid>
              <b>
                Total profit in: {investmentData.stoppedInvestingYear}:{' '}
                {totalInvestmentValue !== null && totalInvestedValue !== null
                  ? `€${(totalInvestmentValue - totalInvestedValue).toFixed(2)}`
                  : '€'}
              </b>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export const parseDefaultData = async (setStocks: (s: StockData[]) => void) => {
  try {
    const path = '/stocks.xlsx';
    const response = await fetch(path);
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
        const dateParts = row[2].split('-').map(Number);
        const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
        const price = Number(row[1]);
        parsedStocks.push({ date, price });
      }
      const sortedData = parsedStocks
        .slice()
        .sort((a, b) => a.date.getTime() - b.date.getTime());

      setStocks(sortedData);
    };
    reader.readAsArrayBuffer(blob);
  } catch (error) {
    console.error('Error parsing stock data:', error);
  }
};
