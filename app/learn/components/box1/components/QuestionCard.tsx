import { Grid, Card, Typography, Checkbox, Button } from '@mui/material';
import { Question, QuestionForm } from './Questions';
import React, { useState } from 'react';

interface QuestionFormProps {
  questions: QuestionForm;
  setQuestions: (q: QuestionForm) => void;
}
interface QuestionProps {
  question: Question;
  questions: QuestionForm;
  setQuestions: (q: QuestionForm) => void;
  index: number;
}
export const QuestionCard: React.FC<QuestionFormProps> = ({
  questions,
  setQuestions
}) => {
  return (
    <Card>
      <Typography variant="h6" align="center">
        {questions.title}
      </Typography>
      <QuestionsStepper questions={questions} setQuestions={setQuestions} />
    </Card>
  );
};

const QuestionsStepper: React.FC<QuestionFormProps> = ({
  questions,
  setQuestions
}) => {
  const [index, setindex] = useState(0);
  const [openAnswer, setOpenAnswer] = useState(false);

  if (index === questions.questions.length)
    return (
      <>
        <Typography variant="subtitle1" align="center">
          <b>
            Questions Done. <br /> Your final Score:
            {(
              (questions.questions.filter(
                (q) =>
                  q.answer ===
                  q.correctAnswer.substring(0, q.correctAnswer.indexOf('.'))
              ).length /
                6) *
              100
            ).toFixed(0)}
            %
          </b>
        </Typography>
      </>
    );
  const correctAnswer = questions.questions[index].correctAnswer;
  const periodIndex = correctAnswer.indexOf('.');
  const sentenceUntilPeriod =
    periodIndex !== -1
      ? correctAnswer.substring(0, periodIndex)
      : correctAnswer;
  return (
    <>
      <QuestionAsked
        question={questions.questions[index]}
        questions={questions}
        setQuestions={setQuestions}
        index={index}
      />
      <Grid container xs={12}>
        <Grid item xs={12}>
          {!openAnswer ? (
            <Button
              disabled={questions.questions[index].answer === null}
              variant="outlined"
              onClick={() => setOpenAnswer(!openAnswer)}
            >
              See answer
            </Button>
          ) : (
            <Typography variant="subtitle1" align="left">
              <b>
                {`${questions.questions[index].answer === sentenceUntilPeriod ? 'Great!' : 'Nope.'}`}{' '}
                <br />
                Correct Answer: <br />
                {`(${index + 1}) ${questions.questions[index].correctAnswer}`}
              </b>
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button
            disabled={!openAnswer}
            variant="outlined"
            onClick={() => {
              setOpenAnswer(!openAnswer);
              setindex(index + 1);
            }}
          >
            Next Question
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

const QuestionAsked: React.FC<QuestionProps> = ({
  question,
  questions,
  index,
  setQuestions
}) => {
  return (
    <Grid container xs={12} key={index}>
      <Grid item xs={12}>
        <Typography
          variant="subtitle1"
          align="left"
        >{`(${index + 1}) ${question.question}`}</Typography>
      </Grid>
      {question.options.map((option, i) => (
        <Grid container xs={12} key={i}>
          <Grid item xs={1}>
            <Checkbox
              checked={questions.questions[index].answer === option}
              onChange={() => {
                const old = [...questions.questions];
                old[index] = {
                  ...old[index],
                  answer: option
                };
                setQuestions({
                  ...questions,
                  questions: old
                });
              }}
            />
          </Grid>
          <Grid item xs={11}>
            {option}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};
