import { Button } from "@mui/material";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import { margin, padding } from "@mui/system";

const provider = new GithubAuthProvider();

export const Login = () => {
  const { user, setUser } = useContext(UserContext);
  let navigate = useNavigate();
  const handleLogin = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;

        // The signed-in user info.
        const user = result.user;
        setUser(result.user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
  };
  useEffect(() => {
    console.log(user);
    if (user) {
      navigate("/courseprogress");
    }
  }, [, user]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#272262",
      }}
    >
      <Card
        style={{
          width: "560px",
          height: "160px",
          backgroundColor: "white",
          margin: "25% auto",
          borderRadius: "16px",
        }}
      >
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color="#202020"
            style={{ textAlign: "center" }}
          >
            Students Welcome to Perfect Practice
          </Typography>
        </CardContent>
        <CardActions
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogin}
            style={{ borderRadius: "8px" }}
          >
            <GitHubIcon style={{ marginRight: "10px" }} /> Sign in with Github
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
