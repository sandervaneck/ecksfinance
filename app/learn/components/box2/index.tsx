import {
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  Typography
} from '@mui/material';
import { TableHead, TableRow } from '@tremor/react';

const scores = [
  {
    username: 'eckie',
    score: '80%'
  },
  {
    username: 'hermans',
    score: '75%'
  },
  {
    username: 'stocker',
    score: '95%'
  },
  {
    username: 'stockpicker',
    score: '55%'
  }
];
export const Box2 = () => {
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
              </TableRow>
            </TableHead>
            <TableBody>
              {scores.map((score, index) => (
                <TableRow key={index}>
                  <TableCell>{score.username}</TableCell>
                  <TableCell>{score.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </Card>
  );
};
