import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import { getQuestions, Question } from "../services/question";

export const CourseProgress = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [questions, setQuestions] = useState<{
    [week: string]: { [day: string]: Question[] };
  }>({});
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      user
        .getIdToken()
        .then(getQuestions)
        .then((questions) => {
          const ret: { [week: string]: { [day: string]: Question[] } } = {};
          for (const q of questions) {
            if (!ret[q.week]) {
              ret[q.week] = {};
            }
            if (!ret[q.week][q.day]) {
              ret[q.week][q.day] = [];
            }
            ret[q.week][q.day].push(q);
          }
          setQuestions(ret);
        });
    }
  }, [user]);

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#272262",
        flexDirection: "column",
      }}
    >
      <h1 style={{ display: "flex", justifyContent: "center", color: "white" }}>
        Course Progress
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        {Object.keys(questions).map((i) => {
          return (
            <Card style={{ margin: "25px" }}>
              <CardContent
                style={{
                  margin: "25px",
                  padding: "10px",
                  justifyContent: "space-around",
                }}
              >
                <Typography gutterBottom variant="h2" component="div">
                  Week {i}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {Object.keys(questions[i as any]).map((j) => {
                    return (
                      <div style={{ margin: "50px" }}>
                        <Typography
                          gutterBottom
                          variant="h3"
                          component="div"
                          style={{ marginTop: "30px" }}
                        >
                          Day {j}
                        </Typography>
                        {questions[i as any][j].map((question) => {
                          return (
                            <Card
                              key={question._id}
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-evenly",
                                maxWidth: "275px",
                                height: "200px",
                              }}
                            >
                              <CardContent
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Typography
                                  style={{
                                    fontSize: "18px",
                                    marginBottom: "25px",
                                  }}
                                >
                                  Question: {question.title}
                                </Typography>
                                <Button
                                  color="secondary"
                                  variant="contained"
                                  style={{ color: "white" }}
                                  onClick={() =>
                                    navigate(`/code-challenge/${question._id}`)
                                  }
                                >
                                  Start
                                </Button>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
