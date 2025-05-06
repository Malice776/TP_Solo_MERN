import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publications from "./pages/Publications";
import './App.css'; // N'oubliez pas d'importer le fichier CSS

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Mon Application Multi-Service</h1>
          <nav className="app-nav">
            <Link to="/signup">Inscription</Link>
            <Link to="/login">Connexion</Link>
            <Link to="/publications">Publications</Link>
          </nav>
        </header>

        <div className="content">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/publications/*" element={<Publications />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
