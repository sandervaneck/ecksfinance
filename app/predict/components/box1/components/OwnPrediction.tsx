import { Box, TextField } from '@mui/material';

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
      Your prediction:
      <TextField
        type="number"
        value={prediction}
        onChange={(e) => setPrediction(Number(e.target.value))}
      />
    </Box>
  );
};
