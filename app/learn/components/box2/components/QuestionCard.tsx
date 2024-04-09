import { Grid, Card, Typography} from '@mui/material';
import { Questions } from './Questions';

export const QuestionCard = ({questions}: {questions: Questions}) => {

    return (
        <Card>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h6" align="center">{questions.title}</Typography>
                    {questions.questions.map((question, index) => (
                        <div key={index}>
                            <Grid item xs={12}>{question.question}</Grid>
                            {question.options.map((option, i) => (
                                <div key={i}>
                                <Grid item xs={1}><CheckBox checked={false} onChange={() => {}}/></Grid>
                                <Grid item xs={11}>{option}</Grid>
                                    </div>
                            ))}
                            </div>
                    ))}
                </Grid>
            </Grid>
        </Card>
    )
}