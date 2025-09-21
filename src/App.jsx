import { useState } from "react";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import TrendingPage from "./pages/TrendingPage";
import BrowsePage from "./pages/BrowsePage";
import RandomPage from "./pages/RandomPage";
import AboutPage from "./pages/AboutPage";
import { Box } from "@mui/material";

function App() {
  return (
    <>
      <NavBar />
      {/* Spacer to offset fixed NavBar */}
      <Box sx={{ height: 120 }} />

      <Routes>
        <Route path="/" element={<TrendingPage />} />
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/random" element={<RandomPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default App;
