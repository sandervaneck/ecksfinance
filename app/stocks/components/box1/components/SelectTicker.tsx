import {
  MenuItem,
  Select,
  Box,
  Stack,
  FormHelperText,
  FormControl
} from '@mui/material';

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
        <FormControl required error={item === ''} size="small" sx={{ mt: 1 }}>
          <Select
            value={item}
            onChange={(e: any) => setItem(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select a ticker
            </MenuItem>
            <MenuItem key="S&P" value="S&P">
              S&P500
            </MenuItem>
            <MenuItem key="ACWI" value="ACWI">
              All Country World Index
            </MenuItem>
            <MenuItem key="AEX" value="AEX">
              AEX
            </MenuItem>
          </Select>
          {item === '' && (
            <FormHelperText>
              Cannot calculate before you have selected a ticker
            </FormHelperText>
          )}
        </FormControl>
      </Stack>
    </Box>
  );
};
