import { Box, Card } from '@mui/material';
import { Box2Props } from '../../types';
import { InvestmentYearFields } from './components/InvestmentYearFields';
import { MonthlyInvestments } from './components/MonthlyInvestments';

export const Box2: React.FC<Box2Props> = ({
  setInvestmentData,
  investmentData
}) => {
  return (
    <Card>
      <Box sx={{ mt: 2 }}>
        <InvestmentYearFields
          setInvestmentData={setInvestmentData}
          investmentData={investmentData}
        />
        <MonthlyInvestments
          setInvestmentData={setInvestmentData}
          investmentData={investmentData}
        />
      </Box>
    </Card>
  );
};
