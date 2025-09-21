import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import { CssBaseline } from "@mui/material";
const darkTheme = createTheme({
  palette: {
    mode: "dark", // ensures dark theme
    primary: {
      main: purple[500], // or a hex like "#9c27b0"
    },
  },
});

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);
