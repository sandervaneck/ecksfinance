import {
  Box,
  Card,
  Table,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Box2Props } from '../../types';
import { InvestmentYearFields } from './components/InvestmentYearFields';
import { MonthlyInvestments } from './components/MonthlyInvestments';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export const Box2: React.FC<Box2Props> = ({
  setInvestmentData,
  investmentData
}) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Card>
      <Box sx={{ mt: 2 }}>
        <InvestmentYearFields
          setInvestmentData={setInvestmentData}
          investmentData={investmentData}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell colSpan={1} style={{ cursor: 'pointer' }}>
                {collapsed ? (
                  <ArrowUpIcon
                    style={{ height: 20 }}
                    onClick={() => setCollapsed(!collapsed)}
                  />
                ) : (
                  <ArrowDownIcon
                    style={{ height: 20 }}
                    onClick={() => setCollapsed(!collapsed)}
                  />
                )}
              </TableCell>
              <TableCell colSpan={9}>Monthly Investment Amounts:</TableCell>
            </TableRow>
          </TableHead>
          {collapsed && (
            <MonthlyInvestments
              setInvestmentData={setInvestmentData}
              investmentData={investmentData}
            />
          )}
        </Table>
      </Box>
    </Card>
  );
};
