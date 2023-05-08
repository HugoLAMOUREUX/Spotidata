import React, { useEffect } from "react";
import LanguageSelector from "../components/LanguageSelector";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import useUserData from "../hooks/useUserData";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const { updateToken } = useUserData();
  const { accessToken } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    updateToken();
    console.log(accessToken);
    navigate("/trends");
  }, [accessToken]);
  return (
    <div className="bg-black min-h-screen m-0 p-0 flex items-center flex-col ">
      <div className="px-3 align-self-end ml-auto mr-10 pt-5">
        <LanguageSelector></LanguageSelector>
      </div>
      <h1 className="text-green text-3xl font-bold ">Spotidata</h1>
    </div>
  );
};

export default Callback;
