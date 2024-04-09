'use client';

import React, { useState } from 'react';
import { Card } from '@tremor/react';
import { Box, Grid } from '@mui/material';
import { Box2 } from './components/box2';

const LearnPage = () => {
  
  return (
    <>
      <Box sx={{ mt: 5, ml: 3, mr: 5 }}>
        <Card>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box2
              />
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  );
};
export default LearnPage;
