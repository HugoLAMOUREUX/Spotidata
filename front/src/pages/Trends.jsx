import React from "react";
import TopTrends from "../components/TopTrends";
import NavBar from "../components/NavBar";

const Trends = () => {
  return (
    <div className="bg-black min-h-screen m-0 p-0 flex items-center flex-col ">
      <NavBar></NavBar>
      <TopTrends></TopTrends>
    </div>
  );
};

export default Trends;
