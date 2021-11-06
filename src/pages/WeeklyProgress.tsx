import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
export const WeeklyProgress = () => {
  return (
    <>
      <Card sx={{ maxWidth: 200 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Day 1
            </Typography>
            <Typography variant="body2" color="text.secondary">
              two sum !
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};
