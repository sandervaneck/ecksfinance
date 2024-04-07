import { MenuItem, Select, Grid, Card, Box, Stack } from '@mui/material';
import { Box1Props } from '../../../types';

export const SelectTicker: React.FC<Box1Props> = ({ item, setItem }) => {
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
        </Select>
      </Stack>
    </Box>
  );
};
