import React from "react";
import TopTrends from "../components/TopTrends";
import Login from "../components/Login";
import LanguageSelector from "../components/LanguageSelector";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-black min-h-screen m-0 p-0 flex items-center flex-col ">
      <div className="px-3 align-self-end ml-auto mr-10 pt-5">
        <LanguageSelector></LanguageSelector>
      </div>
      <h1 className="text-green text-3xl font-bold ">Spotidata</h1>
      <Login className="bg-green"></Login>

      <h2 className="mt-8 text-white font-bold align-self-start text-2xl">
        {t("worldTrends")}
      </h2>
      <TopTrends></TopTrends>
    </div>
  );
};

export default Home;
