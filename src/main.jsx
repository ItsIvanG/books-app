import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// Theme with Instrument Serif as primary, Inter as secondary fallback
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#CCCCFF", // your main color
    },
  },
  typography: {
    fontFamily: `"Instrument Serif", "Inter", "Arial", sans-serif`,
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
