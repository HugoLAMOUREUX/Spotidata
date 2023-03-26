import React, { useEffect } from "react";
import TopTabs from "../components/TopTabs";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import useUserData from "../hooks/useUserData";

const Connected = () => {
  const { accessToken } = useContext(UserContext);
  const { updateToken } = useUserData();
  const handleClick = () => {
    console.log(accessToken);
  };

  useEffect(() => {
    updateToken();
  }, []);
  return (
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
  );
};

export default Connected;
