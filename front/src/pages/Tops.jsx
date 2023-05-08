import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { useTranslation } from "react-i18next";
import UserTops from "../components/UserTops";
import TimeSelector from "../components/TimeSelector";
import useUserData from "../hooks/useUserData";

const Tops = () => {
  const { t } = useTranslation();
  const { checkAuthentication } = useUserData();

  useEffect(() => {
    checkAuthentication();
  }, []);
  return (
    <div className="bg-black min-h-screen m-0 p-0 flex items-center flex-col ">
      <NavBar></NavBar>
      <TimeSelector></TimeSelector>
      <UserTops></UserTops>
    </div>
  );
};

export default Tops;
