import { Autocomplete, TableCell, TextField } from '@mui/material';
import { Box2Props, InvestmentData } from '../../../types';
import { TableBody, TableRow } from '@tremor/react';
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
        {filteredInvestments.map((investment, index) => {
          const i = investmentData.investments
            .map((i) => i.year)
            .indexOf(investment.year);
          return (
            <Row
              key={i}
              i={i}
              setInvestmentData={setInvestmentData}
              edit={edit}
              amounts={amounts}
              investmentData={investmentData}
              index={index}
              investment={investment}
              setEdit={setEdit}
            />
          );
        })}
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
  i: number;
}
const Row: React.FC<RowsProps> = ({
  i,
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
          key={index}
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
            const range = createRange(i, investmentData.investments.length - 1);
            range.forEach((r) => {
              old[r] = {
                ...old[r],
                monthlyInvestment: Number(num)
              };
            });

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
const width = 5;
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
      index <= width - 1
  );
  const filteredInvestments2 = filteredInvestments.filter(
    (inv, index) =>
      inv.year >= investmentData.startedInvestingYear &&
      inv.year <= investmentData.stoppedInvestingYear &&
      index > width - 1 &&
      index <= 2 * width - 1
  );
  const filteredInvestments3 = filteredInvestments.filter(
    (inv, index) =>
      inv.year >= investmentData.startedInvestingYear &&
      inv.year <= investmentData.stoppedInvestingYear &&
      index > 2 * width - 1 &&
      index <= 3 * width - 1
  );
  const filteredInvestments4 = filteredInvestments.filter(
    (inv, index) =>
      inv.year >= investmentData.startedInvestingYear &&
      inv.year <= investmentData.stoppedInvestingYear &&
      index > 3 * width - 1 &&
      index <= 4 * width - 1
  );
  const filteredInvestments5 = filteredInvestments.filter(
    (inv, index) =>
      inv.year >= investmentData.startedInvestingYear &&
      inv.year <= investmentData.stoppedInvestingYear &&
      index > 4 * width - 1 &&
      index <= 5 * width - 1
  );
  const filteredInvestments6 = filteredInvestments.filter(
    (inv, index) =>
      inv.year >= investmentData.startedInvestingYear &&
      inv.year <= investmentData.stoppedInvestingYear &&
      index > 5 * width - 1 &&
      index <= 6 * width - 1
  );
  const filteredInvestments7 = filteredInvestments.filter(
    (inv, index) =>
      inv.year >= investmentData.startedInvestingYear &&
      inv.year <= investmentData.stoppedInvestingYear &&
      index > 6 * width - 1 &&
      index <= 7 * width - 1
  );
  const filteredInvestments8 = filteredInvestments.filter(
    (inv, index) =>
      inv.year >= investmentData.startedInvestingYear &&
      inv.year <= investmentData.stoppedInvestingYear &&
      index > 7 * width - 1 &&
      index <= 8 * width - 1
  );
  const filteredInvestments9 = filteredInvestments.filter(
    (inv, index) =>
      inv.year >= investmentData.startedInvestingYear &&
      inv.year <= investmentData.stoppedInvestingYear &&
      index > 8 * width - 1 &&
      index <= 9 * width - 1
  );
  const filteredInvestments10 = filteredInvestments.filter(
    (inv, index) =>
      inv.year >= investmentData.startedInvestingYear &&
      inv.year <= investmentData.stoppedInvestingYear &&
      index > 9 * width - 1 &&
      index <= 10 * width - 1
  );
  const allLists = [
    filteredInvestments1,
    filteredInvestments2,
    filteredInvestments3,
    filteredInvestments4,
    filteredInvestments5,
    filteredInvestments6,
    filteredInvestments7,
    filteredInvestments8,
    filteredInvestments9,
    filteredInvestments10
  ];
  return (
    <TableBody>
      {allLists.map((list, j) => (
        <TableRows
          key={j}
          filteredInvestments={list}
          setInvestmentData={setInvestmentData}
          investmentData={investmentData}
        />
      ))}
    </TableBody>
  );
};
