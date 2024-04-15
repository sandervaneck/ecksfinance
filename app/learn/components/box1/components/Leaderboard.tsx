import {
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  Typography
} from '@mui/material';
import { TableHead, TableRow } from '@tremor/react';
import React from 'react';
import { Score } from '../types';

interface LeaderBoardProps {
  submitted: boolean;
  scores: Score[];
}

export const LeaderBoard: React.FC<LeaderBoardProps> = ({
  submitted,
  scores
}) => {
  return (
    <Card>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            See how you compare with others:
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Prediction</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortScores(scores).map((score, index) => (
                <TableRow key={index}>
                  <TableCell>{score.username}</TableCell>
                  <TableCell>{score.score}</TableCell>
                  <TableCell>{submitted && score.prediction}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Card>
  );
};

const sortScores = (scores: Score[]) => {
  // Custom sorting logic
  return scores.sort((a, b) => {
    // First, check if either username is "Machine Learning"
    if (
      a.username === 'Machine Learning' &&
      b.username !== 'Machine Learning'
    ) {
      return -1; // "Machine Learning" comes first
    } else if (
      a.username !== 'Machine Learning' &&
      b.username === 'Machine Learning'
    ) {
      return 1; // "Machine Learning" comes first
    }

    // If both or neither are "Machine Learning", sort by score
    const scoreA = parseFloat(a.score); // Parse the score string to get the numeric value
    const scoreB = parseFloat(b.score);

    // Compare scores numerically
    if (scoreA > scoreB) {
      return -1; // Higher score comes first
    } else if (scoreA < scoreB) {
      return 1; // Higher score comes first
    } else {
      return 0; // Scores are equal
    }
  });
};
