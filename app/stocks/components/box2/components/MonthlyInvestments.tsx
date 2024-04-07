import { Autocomplete, Table, TableCell, TextField } from '@mui/material';
import { Box2Props, InvestmentData } from '../../../types';
import { TableBody, TableHead, TableRow } from '@tremor/react';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { createRange } from '../../functions';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';

const TableRows = ({
  filteredInvestments,
  setInvestmentData,
  investmentData
}: {
  setInvestmentData: (i: InvestmentData) => void;
  investmentData: InvestmentData;
  filteredInvestments: {
    year: number;
    monthlyInvestment: number;
  }[];
}) => {
  const [edit, setEdit] = useState<null | number>(null);
  const amounts = createRange(0, 10000, 50);
  return (
    <>
      <TableRow>
        {filteredInvestments.map((investment, index) => (
          <Row
            key={index}
            setInvestmentData={setInvestmentData}
            edit={edit}
            amounts={amounts}
            investmentData={investmentData}
            index={index}
            investment={investment}
            setEdit={setEdit}
          />
        ))}
      </TableRow>
    </>
  );
};

interface RowsProps {
  investmentData: InvestmentData;
  edit: number | null;
  index: number;
  investment: {
    year: number;
    monthlyInvestment: number;
  };
  setEdit: (n: number | null) => void;
  setInvestmentData: (i: InvestmentData) => void;
  amounts: number[];
}
const Row: React.FC<RowsProps> = ({
  edit,
  setInvestmentData,
  setEdit,
  index,
  investment,
  amounts,
  investmentData
}) => {
  const [inputValue, setInputValue] = React.useState('');

  if (edit === index)
    return (
      <TableCell key={index} style={{ cursor: 'pointer' }}>
        {investment.year}:
        <Autocomplete
          options={amounts.map((a) => String(a))}
          getOptionLabel={(option) => `${String(option)}`}
          loading={amounts.length === 0}
          inputValue={inputValue}
          value={String(investment.monthlyInvestment)}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          onChange={(event: any, newValue: string | null) => {
            const num = newValue ? String(newValue.replace('€', '')) : '';
            const old = [...investmentData.investments];
            old[index] = {
              ...old[index],
              monthlyInvestment: Number(num)
            };
            newValue &&
              setInvestmentData({
                ...investmentData,
                investments: old
              });
          }}
          renderInput={(params) => (
            <TextField {...params} label="Monthly investment (€)" />
          )}
        />
        <CheckIcon onClick={() => setEdit(null)} />
      </TableCell>
    );
  return (
    <TableCell key={index} style={{ cursor: 'pointer' }}>
      {investment.year}: €{investment.monthlyInvestment}
      <EditIcon onClick={() => setEdit(index)} />
    </TableCell>
  );
};

export const MonthlyInvestments: React.FC<Box2Props> = ({
  setInvestmentData,
  investmentData
}) => {
  const filteredInvestments = investmentData.investments.filter(
    (inv) =>
      inv.year >= investmentData.startedInvestingYear &&
      inv.year <= investmentData.stoppedInvestingYear
  );
  const filteredInvestments1 = filteredInvestments.filter(
    (inv, index) =>
      inv.year >= investmentData.startedInvestingYear &&
      inv.year <= investmentData.stoppedInvestingYear &&
      index <= 9
  );
  const filteredInvestments2 = filteredInvestments.filter(
    (inv, index) =>
      inv.year >= investmentData.startedInvestingYear &&
      inv.year <= investmentData.stoppedInvestingYear &&
      index > 9 &&
      index <= 19
  );
  const filteredInvestments3 = filteredInvestments.filter(
    (inv, index) =>
      inv.year >= investmentData.startedInvestingYear &&
      inv.year <= investmentData.stoppedInvestingYear &&
      index > 19 &&
      index <= 29
  );
  const filteredInvestments4 = filteredInvestments.filter(
    (inv, index) =>
      inv.year >= investmentData.startedInvestingYear &&
      inv.year <= investmentData.stoppedInvestingYear &&
      index > 29 &&
      index <= 39
  );
  const filteredInvestments5 = filteredInvestments.filter(
    (inv, index) =>
      inv.year >= investmentData.startedInvestingYear &&
      inv.year <= investmentData.stoppedInvestingYear &&
      index > 39 &&
      index <= 49
  );
  const filteredInvestments6 = filteredInvestments.filter(
    (inv, index) =>
      inv.year >= investmentData.startedInvestingYear &&
      inv.year <= investmentData.stoppedInvestingYear &&
      index > 49 &&
      index <= 59
  );
  const filteredInvestments7 = filteredInvestments.filter(
    (inv, index) =>
      inv.year >= investmentData.startedInvestingYear &&
      inv.year <= investmentData.stoppedInvestingYear &&
      index > 59 &&
      index <= 69
  );

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell colSpan={10}>Monthly Investment Amounts:</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRows
          key={0}
          filteredInvestments={filteredInvestments1}
          setInvestmentData={setInvestmentData}
          investmentData={investmentData}
        />
        <TableRows
          key={1}
          filteredInvestments={filteredInvestments2}
          setInvestmentData={setInvestmentData}
          investmentData={investmentData}
        />
        <TableRows
          key={2}
          filteredInvestments={filteredInvestments3}
          setInvestmentData={setInvestmentData}
          investmentData={investmentData}
        />
        <TableRows
          key={3}
          filteredInvestments={filteredInvestments4}
          setInvestmentData={setInvestmentData}
          investmentData={investmentData}
        />
        <TableRows
          key={4}
          filteredInvestments={filteredInvestments5}
          setInvestmentData={setInvestmentData}
          investmentData={investmentData}
        />
        <TableRows
          key={5}
          filteredInvestments={filteredInvestments6}
          setInvestmentData={setInvestmentData}
          investmentData={investmentData}
        />
        <TableRows
          key={6}
          filteredInvestments={filteredInvestments7}
          setInvestmentData={setInvestmentData}
          investmentData={investmentData}
        />
      </TableBody>
    </Table>
  );
};
