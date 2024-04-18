import { Box} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

export interface SelectPredictionDateProps {
  date: Dayjs;
  setDate: (e: Dayjs) => void;
}

export const SelectPredictionDate: React.FC<SelectPredictionDateProps> = ({
  date,
  setDate
}) => {
  return (
    <Box sx={{ mt: 2, ml: 2 }}>
      <DatePicker
        label="Predict price for date:"
        value={date}
        onChange={(date) => {
          if (date !== null) setDate(date);
        }}
      />
    </Box>
  );
};
