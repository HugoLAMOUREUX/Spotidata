import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Home from "./pages/Home";
import Summary from "./pages/Summary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserContextProvider from "./components/UserContextProvider";
import Trends from "./pages/Trends";
import Tops from "./pages/tops";
import Analysis from "./pages/Analysis";
import Playlists from "./pages/Playlists";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <UserContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home></Home>} exact></Route>
            <Route path="/callback" element={<Summary></Summary>} exact></Route>
            <Route path="/trends" element={<Trends></Trends>} exact></Route>
            <Route path="/tops" element={<Tops></Tops>} exact></Route>
            <Route
              path="/analysis"
              element={<Analysis></Analysis>}
              exact
            ></Route>
            <Route
              path="/playlists"
              element={<Playlists></Playlists>}
              exact
            ></Route>

            <Route path="/*" element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
