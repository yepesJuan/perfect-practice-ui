import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { Login } from "./pages/Login";
import CodeChallenge from "./pages/CodeChallenge";
import "./App.css";
import { UserContextProvider } from "./context/UserContext";
import { CourseProgress } from "./pages/CourseProgress";

const firebaseConfig = {
  apiKey: "AIzaSyBvMe4gWfCMokPrEcrUuAogC3Lvkfea3zg",
  authDomain: "perfect-practice-ui.firebaseapp.com",
  projectId: "perfect-practice-ui",
  storageBucket: "perfect-practice-ui.appspot.com",
  messagingSenderId: "172218651110",
  appId: "1:172218651110:web:b9545c762b7737e4d24627",
  measurementId: "G-CT52S924JS",
};

const app = initializeApp(firebaseConfig);

function App() {
  const theme = createTheme({
    palette: { primary: { main: "#272262" }, secondary: { main: "#ff216e" } },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <UserContextProvider>
          <Routes>
            {/* TODO: we should use real private routes for unauthenticated & authenticated routes */}
            <Route path="/login" element={<Login />} />
            <Route
              path="/code-challenge/:questionId"
              element={<CodeChallenge />}
            />
            <Route path="/" element={<CourseProgress />} />
          </Routes>
        </UserContextProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
