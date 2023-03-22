import React from "react";
import TopTabs from "../components/TopTabs";
import UserContextProvider from "../components/UserContextProvider";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Connected = () => {
  const data = useContext(UserContext);
  const handleClick = () => {
    console.log(data);
  };
  return (
    <UserContextProvider>
      <div className="bg-black min-h-screen m-0 p-0 flex items-center flex-col pt-10">
        <h1 className="text-green text-3xl font-bold ">Spotidata</h1>
        <h2
          onClick={handleClick}
          className="bg-green text-white text-1xl font-bold py-5 px-10 mt-5 rounded cursor-pointer"
        >
          Make a request
        </h2>
        <TopTabs></TopTabs>
      </div>
    </UserContextProvider>
  );
};

export default Connected;
