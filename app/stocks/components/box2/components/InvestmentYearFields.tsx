import { Autocomplete, TextField, Grid } from '@mui/material';
import { Box2Props } from '../../../types';
import { createRange } from '../../functions';
import React from 'react';

export const InvestmentYearFields: React.FC<Box2Props> = ({
  setInvestmentData,
  investmentData
}) => {
  const years = createRange(1960, 2024);
  const [inputValue, setInputValue] = React.useState('');
  const [inputValue1, setInputValue1] = React.useState('');

  return (
    <Grid container xs={12}>
      <Grid item xs={5}>
        <Autocomplete
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          value={investmentData.startedInvestingYear}
          options={years}
          getOptionLabel={(option) => String(option)}
          onChange={(e, newInputValue) =>
            newInputValue &&
            setInvestmentData({
              ...investmentData,
              startedInvestingYear: Number(newInputValue)
            })
          }
          loading={years.length === 0}
          renderInput={(params) => (
            <TextField {...params} label="Year started investing" />
          )}
        />
      </Grid>
      <Grid item xs={0.5}></Grid>
      <Grid item xs={5}>
        <Autocomplete
          inputValue={inputValue1}
          onInputChange={(event, newInputValue) => {
            setInputValue1(newInputValue);
          }}
          value={investmentData.stoppedInvestingYear}
          getOptionLabel={(option) => String(option)}
          onChange={(e, newInputValue) =>
            newInputValue &&
            setInvestmentData({
              ...investmentData,
              stoppedInvestingYear: Number(newInputValue)
            })
          }
          options={years.filter(
            (y) => y >= investmentData.startedInvestingYear
          )}
          loading={years.length === 0}
          renderInput={(params) => (
            <TextField {...params} label="Invested until:" />
          )}
        />
      </Grid>
    </Grid>
  );
};
