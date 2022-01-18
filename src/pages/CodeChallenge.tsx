import { useContext, useEffect, useRef, useState } from "react";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ReactMarkdown from "react-markdown";
import Editor from "@monaco-editor/react";
import {
  getQuestion,
  getQuestions,
  Question,
  QuestionResponse,
  submitQuestion,
} from "../services/question";
import { useNavigate, useParams } from "react-router";
import { UserContext } from "../context/UserContext";
import { Button } from "@mui/material";

interface SubmissionResponse {
  status: "passed" | "failed";
  inputs: any[];
  expected: any;
  actual: any;
}

export default function CodeChallenge() {
  const editorRef = useRef<any>(null);
  const [question, setQuestion] = useState<Question>();
  const [response, setResponse] = useState<SubmissionResponse>();
  const { user } = useContext(UserContext);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (params.questionId && user) {
      user
        .getIdToken()
        .then((jwt) => getQuestion(jwt, params.questionId!))
        .then(setQuestion);
    } else {
      navigate("/");
    }
  }, [, params]);

  const submit = () => {
    user!
      .getIdToken()
      .then((jwt) =>
        submitQuestion(jwt, params.questionId!, editorRef?.current!.getValue())
      )
      .then((questionResponse) => {
        const failure = questionResponse.testedCases.find(
          (t) => t.status === "failed"
        );
        if (!failure) {
          const success = questionResponse.testedCases.pop();
          setResponse({
            actual: success?.actual,
            expected: success?.expected,
            inputs: success?.inputs as any[],
            status: "passed",
          });
        } else {
          setResponse({
            actual: failure?.actual,
            expected: failure?.expected,
            inputs: failure?.inputs as any[],
            status: "failed",
          });
        }
      });
  };

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  if (!question) {
    return <>...loading</>;
  }
  //
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div style={{ width: "50%", borderRight: "1px solid black" }}>
        <div
          style={{ paddingLeft: "2em", paddingRight: "2em", marginTop: "1em" }}
        >
          <Typography variant="h4" noWrap component="div">
            Question {question?.title}
          </Typography>
          <Divider />
          <ReactMarkdown children={question?.description || ""} />
          <Divider />
          {response && (
            <div>
              <h3>Submitted Answer Response</h3>
              <p
                style={{
                  color: response.status === "failed" ? "red" : "green",
                  textTransform: "capitalize",
                }}
              >
                Status: {response.status}
              </p>
              <p>Inputs: {response.inputs.join(", ")}</p>
              <p>Expected: {response.expected}</p>
              <p>Actual: {response.actual || "undefined"}</p>
            </div>
          )}
        </div>
      </div>
      <div style={{ width: "50%", height: "100vh" }}>
        <div
          style={{
            height: "50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            padding: "0 25px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ width: "125px" }}
            onClick={() => submit()}
          >
            Submit
          </Button>
        </div>
        <Editor
          defaultLanguage="javascript"
          defaultValue={question?.initialCode || ""}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
}
