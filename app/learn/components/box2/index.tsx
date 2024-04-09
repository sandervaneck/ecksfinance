import { Grid, Card} from '@mui/material';
import { QuestionCard } from './components/QuestionCard';
import { questions1 } from './components/Questions';



export const Box2 = () => {
    return (<Card>
        <Grid container>
            <Grid item xs={12}>
                <QuestionCard questions={questions1} />
            </Grid>
            </Grid>
            </Card>)
}