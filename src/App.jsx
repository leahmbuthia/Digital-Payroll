import { useState } from "react";
import "./App.scss";
import Login from "./Layout/Login";
import MainContent from "./Layout/MainContent/MainContent";
import { Route, Routes } from "react-router-dom";
import Admin from "./Route/Admin";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/*" element={<MainContent />} />
      </Routes>
    </>
  );
}

export default App;
