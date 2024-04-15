import { Grid, Card } from '@mui/material';
import { QuestionCard } from './components/QuestionCard';
import {
  BonusQuestion,
  QuestionForm,
  bonusQuestion,
  questions1
} from './components/Questions';
import React, { useState } from 'react';
import { LeaderBoard } from './components/Leaderboard';
import { calculateScore } from './components/functions';
import { Score } from './types';

export const Box1 = () => {
  const [questions, setQuestions] = useState<QuestionForm>(questions1);
  const [bonusQ, setBonusQ] = useState<BonusQuestion>(bonusQuestion);
  const [scoreForm, setScores] = useState<Score[]>(scores);
  console.log(bonusQ);
  return (
    <Card>
      <Grid container>
        <Grid item xs={12}>
          <QuestionCard
            submit={() => {
              const old = [...scores];
              const index = scores.findIndex((s) => s.username === 'eckie');
              old[index] = {
                ...old[index],
                prediction: bonusQ.answer !== null ? bonusQ.answer : 0,
                score: `${calculateScore(questions).toFixed(2)}%`
              };
              setScores(old);
            }}
            questions={questions}
            setQuestions={setQuestions}
            bonusQuestion={bonusQ}
            setBonusQuestion={setBonusQ}
          />
        </Grid>
        <Grid item xs={12}>
          <LeaderBoard submitted={bonusQ.answer !== null} scores={scoreForm} />
        </Grid>
      </Grid>
    </Card>
  );
};

const scores: Score[] = [
  {
    username: 'eckie',
    score: '80%',
    prediction: 31.31
  },
  {
    username: 'hermans',
    score: '75%',
    prediction: 34.01
  },
  {
    username: 'stocker',
    score: '95%',
    prediction: 26.84
  },
  {
    username: 'stockpicker',
    score: '55%',
    prediction: 28.99
  },
  {
    username: 'Machine Learning',
    score: '100%',
    prediction: 30.0
  }
];
