import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { initializeApp } from 'firebase/app'
import "./App.css";

const firebaseConfig = {
  apiKey: "AIzaSyBvMe4gWfCMokPrEcrUuAogC3Lvkfea3zg",
  authDomain: "perfect-practice-ui.firebaseapp.com",
  projectId: "perfect-practice-ui",
  storageBucket: "perfect-practice-ui.appspot.com",
  messagingSenderId: "172218651110",
  appId: "1:172218651110:web:b9545c762b7737e4d24627",
  measurementId: "G-CT52S924JS"
}

const app = initializeApp(firebaseConfig)

function App() {
  const theme = createTheme({
    palette: { primary: { main: "#272262" }, secondary:{main:"#ff216e"} },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    </ThemeProvider>
  )
}

export default App;
