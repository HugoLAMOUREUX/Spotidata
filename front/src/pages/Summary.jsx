import React, { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import useUserData from "../hooks/useUserData";
import NavBar from "../components/NavBar";

const Summary = () => {
  const { accessToken } = useContext(UserContext);
  const { updateToken } = useUserData();
  const handleClick = () => {
    console.log(accessToken);
  };

  useEffect(() => {
    updateToken();
  }, []);
  return (
    <div className="bg-black min-h-screen m-0 p-0 flex items-center flex-col ">
      <NavBar></NavBar>

      <h2
        onClick={handleClick}
        className="bg-green text-white text-1xl font-bold py-5 px-10 mt-5 rounded cursor-pointer"
      >
        Make a request
      </h2>
      <h2 className="m-5 text-xl text-white">Summary</h2>
    </div>
  );
};

export default Summary;
