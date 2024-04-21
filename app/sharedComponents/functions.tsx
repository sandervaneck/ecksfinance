// dataParser.js
import { getData } from '../stocks/components/box1/components/TotalInvestmentCard';
import { StockData } from '../stocks/types';
import * as XLSX from 'xlsx';

export const parseData = async (
  item: string,
  setStocks: (s: StockData[]) => void
) => {
  try {
    const path = getData(item);
    const response = await fetch(path);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.onload = (event) => {
      const data =
        event.target && event.target.result
          ? new Uint8Array(
              event.target.result instanceof ArrayBuffer
                ? event.target.result
                : new ArrayBuffer(0)
            )
          : null;
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const rows: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const uniqueDates = new Set(); // Set to store unique dates
      const parsedStocks: StockData[] = [];
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const dateParts = row[2].split('-').map(Number);
        const year = dateParts[0];
        const month = dateParts[1] - 1;
        const day = dateParts[2];

        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
          const date = new Date(year, month, day);
          if (!isNaN(date.getTime()) && !uniqueDates.has(date.getTime())) {
            const price = Number(row[1]);
            parsedStocks.push({ date, price });
            uniqueDates.add(date.getTime()); // Add date to set
          }
        }
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
