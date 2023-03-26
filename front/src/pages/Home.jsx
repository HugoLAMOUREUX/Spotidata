import React from "react";
import TopTabs from "../components/TopTabs";
import Login from "../components/Login";

const Home = () => {
  return (
    <div>
      <div className="bg-black min-h-screen m-0 p-0 flex items-center flex-col pt-10">
        <h1 className="text-green text-3xl font-bold ">Spotidata</h1>
        <Login className="bg-green"></Login>

        <h2 className="mt-8 text-white font-bold align-self-start text-2xl">
          Latest world trends
        </h2>
        <TopTabs></TopTabs>
      </div>
    </div>
  );
};

export default Home;
