import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Home from "./pages/Home";
import Connected from "./pages/Connected";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContextProvider from "./components/UserContextProvider";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>} exact></Route>
          <Route
            path="/callback"
            element={<Connected></Connected>}
            exact
          ></Route>

          <Route path="/*" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
