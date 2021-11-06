import { Button } from "@mui/material";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const provider = new GithubAuthProvider();

// provider.setCustomParameters({
//   'allow_signup': 'false'
// });

export const Login = () => {
  const { user, setUser } = useContext(UserContext);
  let navigate = useNavigate()
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
    console.log(user)
    if(user) {
      navigate("/courseprogress")
    }
  },[,user])

  return <Button onClick={handleLogin}>Go to login</Button>;
};
