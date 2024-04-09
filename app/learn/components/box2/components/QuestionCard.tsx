import { Grid, Card, Typography, Checkbox, Button} from '@mui/material';
import { Question, Questions } from './Questions';
import React, { useState } from 'react';

export const QuestionCard = ({questions}: {questions: Questions}) => {

    return (
        <Card>
                    <Typography variant="h6" align="center">{questions.title}</Typography>
                    <QuestionsStepper questions={questions.questions}/>
        </Card>
    )
}

const QuestionsStepper = ({questions}: {questions: Question[]}) => {
const [index, setindex] = useState(0)
    return (
        <>
        <QuestionAsked question={questions[index]} index={index}/>
        <Button variant="outlined" onClick={() => {
            if (index - 1 >= 0) setindex(index + 1)}
        }>Back</Button>
        <Button variant="outlined" onClick={() => {
            if (index + 1 <= questions.length -1) setindex(index + 1)}
        }>Next</Button>    
        </>
    )
}
const QuestionAsked = ({question, index}: {question: Question, index: number}) => {
    return (    
    <Grid container xs={12} key={index}>
                            <Grid item xs={12}>{question.question}</Grid>
                            {question.options.map((option, i) => (
                                <Grid container xs={12} key={i}>
                                <Grid item xs={1}><Checkbox checked={false} onChange={() => {}}/></Grid>
                                <Grid item xs={11}>{option}</Grid>
                                    </Grid>
                            ))}
                            </Grid>
    )
}