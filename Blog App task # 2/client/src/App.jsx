import React from "react";
import "./App.css";
import Header from "./componenets/Header";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="text-white">
      <Header />
      <main className="text-white">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
