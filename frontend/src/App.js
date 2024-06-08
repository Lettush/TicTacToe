// Libraries
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Components
import "./App.css";
import Navbar from "./components/Navbar";
import Game from "./components/Game";
import Home from "./components/Home";
import GameList from "./components/GameList";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<GameList />} />
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
