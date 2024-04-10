import { Card, Grid, Typography } from '@mui/material';

interface HeadBoxProps {
    title: string,
    subtitle: string
}
export const HeadBox: React.FC<HeadBoxProps> = ({
    title,
    subtitle
  }) => {
    
    return (
      <Card>
        <Grid container xs={12}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">{title}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" align="center">{subtitle}</Typography>
          </Grid>
        </Grid>
      </Card>
    );
  };
  