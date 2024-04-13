import { Box, InputAdornment, TextField } from '@mui/material';

interface OwnPredictionProps {
  prediction: number;
  setPrediction: (s: number) => void;
}

export const OwnPrediction: React.FC<OwnPredictionProps> = ({
  prediction,
  setPrediction
}) => {
  return (
    <Box sx={{ ml: 2, mt: 2 }}>
      <TextField
        label="My prediction:"
        type="number"
        value={prediction}
        onChange={(e) => setPrediction(Number(e.target.value))}
        InputProps={{
          startAdornment: <InputAdornment position="start">€</InputAdornment>
        }}
      />
    </Box>
  );
};
