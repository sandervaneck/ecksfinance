import { MenuItem, Select, Box, Stack } from '@mui/material';

export interface TickerProps {
  item: string;
  setItem: (e: string) => void;
}

export const SelectTicker: React.FC<TickerProps> = ({ item, setItem }) => {
  return (
    <Box sx={{ mt: 2, ml: 2 }}>
      <Stack direction="row" spacing={1}>
        <Box sx={{ mt: 4 }}>
          <Box sx={{ mt: 1 }}>Select ticker to invest in:</Box>
        </Box>
        <Select
          size="small"
          value={item}
          onChange={(e: any) => setItem(e.target.value)}
        >
          <MenuItem key="IBM" value="IBM">
            IBM
          </MenuItem>
          <MenuItem key="BTC" value="BTC">
            Bitcoin
          </MenuItem>
          <MenuItem key="GSP" value="GSP">
            S&P 500
          </MenuItem>
        </Select>
      </Stack>
    </Box>
  );
};
