import React, { useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import useUserData from "../hooks/useUserData";
import TopTrends from "../components/TopTrends";
import NavBar from "../components/NavBar";

const Trends = () => {
  const { accessToken } = useContext(UserContext);
  const { checkAuthentication } = useUserData();

  useEffect(() => {
    console.log(accessToken);
    checkAuthentication();
  }, []);
  return (
    <div className="bg-black min-h-screen m-0 p-0 flex items-center flex-col ">
      <NavBar></NavBar>
      <TopTrends></TopTrends>
    </div>
  );
};

export default Trends;
