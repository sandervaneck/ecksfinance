'use client';

import React from 'react';
import { Card } from '@tremor/react';
import { Box, Grid } from '@mui/material';
import { Box1 } from './components/box1';
import { HeadBox } from '../sharedComponents/headbox';
import { Box2 } from './components/box2';

const LearnPage = () => {
  const title = 'Learn more about stocks!';
  const subtitle = 'What is your score on the daily stock-questions of today?';
  return (
    <>
      <Box sx={{ mt: 5, ml: 3, mr: 5 }}>
        <Card>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <HeadBox title={title} subtitle={subtitle} />
            </Grid>
            <Grid item xs={12}>
              <Box1 />
            </Grid>
            <Grid item xs={12}>
              <Box2 />
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
};
export default LearnPage;
