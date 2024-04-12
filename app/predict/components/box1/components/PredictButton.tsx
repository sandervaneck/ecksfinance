import { Box, Button } from '@mui/material';

export const PredictButton = ({ onClick }: { onClick: () => void }) => (
  <Box sx={{ mt: 2, ml: 2 }}>
    <Button variant="contained" onClick={onClick}>
      Predict
    </Button>
  </Box>
);
