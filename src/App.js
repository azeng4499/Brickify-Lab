import "./App.css";
import ImageSettings from "./Pages/ImageSettings";
import CleanUp from "./Pages/CleanUp";
import ChoosePalette from "./Pages/ChoosePalette";
import Instructions from "./Pages/Instructions";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setWindowHeight, setWindowWidth } from "./Store/Actions";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";

function App() {
  const dispatch = useDispatch();

  const updateSize = () => {
    dispatch(setWindowHeight(window.innerHeight));
    dispatch(setWindowWidth(window.innerWidth));
  };

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} exact />
        <Route path="/image-settings" element={<ImageSettings />} exact />
        <Route path="/choose-palette" element={<ChoosePalette />} exact />
        <Route path="/clean-up" element={<CleanUp />} exact />
        <Route path="/instructions" element={<Instructions />} exact />
      </Routes>
    </Router>
  );
}

export default App;
