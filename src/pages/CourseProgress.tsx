import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { WeeklyProgress } from "./WeeklyProgress";

export const CourseProgress = () => {
  return (
    <>
      <h1>Course Progres</h1>
      <div>
      <Card sx={{ maxWidth: 500}}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Week 1
            </Typography>
            <WeeklyProgress />
          </CardContent>
        </CardActionArea>
      </Card>
      </div>
    </>
  );
};
