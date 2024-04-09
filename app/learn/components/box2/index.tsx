import { Grid, Card} from '@mui/material';
import { QuestionCard } from './components/QuestionCard';
import { questions1 } from './components/Questions';
import React, { useState } from 'react';

export const Box2 = () => {
    const [questions, setQuestions] = useState(questions1)
    return (<Card>
        <Grid container>
            <Grid item xs={12}>
                <QuestionCard questions={questions} setQuestions={setQuestions}/>
            </Grid>
            </Grid>
            </Card>)
}