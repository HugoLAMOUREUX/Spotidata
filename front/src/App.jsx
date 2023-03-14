import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import TopTabs from "./components/TopTabs";
import TrackCard from "./components/cards/TrackCard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-black min-h-screen m-0 p-0 flex items-center flex-col pt-10">
      <h1 className="text-green text-3xl font-bold ">Spotidata</h1>
      <TopTabs></TopTabs>
    </div>
  );
}

export default App;
