import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Chats from "./Chats";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/chats" element={<Chats />}></Route>
    </Routes>
  );
}
