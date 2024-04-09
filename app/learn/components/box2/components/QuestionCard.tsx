import { Grid, Card, Typography, Checkbox, Button} from '@mui/material';
import { Question, Questions } from './Questions';
import React, { useState } from 'react';

interface QuestionsCardProps {
    questions: Questions;
    setQuestions: (q: Questions) => void;
}
interface QuestionProps {
    question: Question;
    questions: Questions;
    setQuestions: (q: Questions) => void;
    index: number;
}
export const QuestionCard: React.FC<QuestionsCardProps> = ({questions, setQuestions}) => {

    return (
        <Card>
                    <Typography variant="h6" align="center">{questions.title}</Typography>
                    <QuestionsStepper questions={questions.questions} setQuestions={setQuestions}/>
        </Card>
    )
}

const QuestionsStepper: React.FC<QuestionsCardProps> = ({questions, setQuestions}) => {
const [index, setindex] = useState(0)
    return (
        <>
        <QuestionAsked question={questions[index]} questions={questions} setQuestions={setQuestions} index={index}/>
        <Button variant="outlined" onClick={() => {
            if (index - 1 >= 0) setindex(index + 1)}
        }>Back</Button>
        <Button variant="outlined" onClick={() => {
            if (index + 1 <= questions.length -1) setindex(index + 1)}
        }>Next</Button>    
        </>
    )
}

const QuestionAsked: React.FC<QuestionProps> = ({question, questions, index, setQuestions}) => {
    return (    
    <Grid container xs={12} key={index}>
                            <Grid item xs={12}><Typography variant="subtitle" align="left">{`(${index + 1}) ${question.question}`}</Typography></Grid>
                            {question.options.map((option, i) => (
                                <Grid container xs={12} key={i}>
                                <Grid item xs={1}><Checkbox checked={false} onChange={() => {
                                    const old = [...questions]
                                    old[index] = {
                                        ...old[index],
                                        answer: option
                                    }
                                    setQuestions(old)
                                }}/></Grid>
                                <Grid item xs={11}>{option}</Grid>
                                    </Grid>
                            ))}
                            </Grid>
    )
}