import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { WeeklyProgress } from "./WeeklyProgress";
import { margin } from "@mui/system";

export const CourseProgress = () => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#272262",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1 style={{ display: "flex", justifyContent: "center", color: "white" }}>
        Course Progress
      </h1>
      <div>
        <Card style={{ maxWidth: 500 }}>
          <CardActionArea>
            <CardContent
              style={{
                margin: "10px",
                padding: "10px",
                justifyContent: "space-around",
              }}
            >
              <Typography gutterBottom variant="h5" component="div">
                Week 1
              </Typography>
              <WeeklyProgress />
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
};
