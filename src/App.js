// src/App.js
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home/Home";
import FormLanche from "./components/FormLanche/FormLanche";
import ListLanche from "./components/ListLanche/ListLanche";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Header
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form-lanche" element={<FormLanche />} />
            <Route path="/list-lanche" element={<ListLanche />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />{" "}
            {}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
