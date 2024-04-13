import { Grid, Card } from '@mui/material';
import { QuestionCard } from './components/QuestionCard';
import { QuestionForm, questions1 } from './components/Questions';
import React, { useState } from 'react';

export const Box1 = () => {
  const [questions, setQuestions] = useState<QuestionForm>(questions1);
  return (
    <Card>
      <Grid container>
        <Grid item xs={12}>
          <QuestionCard questions={questions} setQuestions={setQuestions} />
        </Grid>
      </Grid>
    </Card>
  );
};
