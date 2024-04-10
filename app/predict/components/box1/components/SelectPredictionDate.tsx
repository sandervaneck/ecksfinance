import { DatePicker, Box, Stack } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

export interface SelectPredictionDateProps {
  date: Dayjs| null;
  setDate: (e: Dayjs| null) => void;
}

export const SelectPredictionDate: React.FC<SelectPredictionDateProps> = ({ date, setDate }) => {
  return (
    <Box sx={{ mt: 2, ml: 2 }}>
      <Stack direction="row" spacing={1}>
      <DatePicker
          label="Prediction Date"
          value={date}
          onChange={(date) => setDate(date)}
        />
      </Stack>
    </Box>
  );
};