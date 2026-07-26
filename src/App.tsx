import { useState } from "react";
import Loader from "./components/Loader/Loader";
import CursorGlow from "./components/CursorGlow/CursorGlow";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress";
import DigitalDust from "./components/DigitalDust/DigitalDust";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import ProjectDetails from "./pages/ProjectDetails";
import TeamDetails from "./pages/TeamDetails";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Cinematic Preloader */}
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      {/* Main Luxury Experience */}
      {!isLoading && (
        <>
          {/* Custom Mouse follower and glow track */}
          <CursorGlow /><DigitalDust />

          {/* Top Edge scroll percent bar */}
          <ScrollProgress />

          {/* Fixed Floating Theme Toggle Pill */}
          <ThemeToggle />

          {/* Master Landing Structure */}
          <Routes><Route path="/" element={<Home />} /><Route path="/project/:id" element={<ProjectDetails />} /><Route path="/team/:id" element={<TeamDetails />} /></Routes>
        </>
      )}
    </>
  );
}
