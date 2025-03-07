
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateMemory from "./pages/CreateMemory";
import ViewMemory from "./pages/ViewMemory";
import Signup from "./pages/Signup";
import React from 'react'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-memory" element={<CreateMemory />} />
        <Route path="/view-memory" element={<ViewMemory />} />
        <Route path="/register" element={<Signup />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
