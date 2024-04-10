import { Box, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export interface SelectPredictionDateProps {
  date: Dayjs | null;
  setDate: (e: Dayjs | null) => void;
}

export const SelectPredictionDate: React.FC<SelectPredictionDateProps> = ({
  date,
  setDate
}) => {
  return (
    <Box sx={{ mt: 2, ml: 2 }}>
      <DatePicker
        label="Prediction Date"
        value={date}
        onChange={(date) => setDate(date)}
      />
    </Box>
  );
};
