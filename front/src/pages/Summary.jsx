import React, { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import useUserData from "../hooks/useUserData";
import NavBar from "../components/NavBar";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import TimeSelector from "../components/TimeSelector";

const Summary = () => {
  const { t } = useTranslation();
  const { accessToken, time_range } = useContext(UserContext);
  const { updateToken } = useUserData();
  const { data: resume, isLoading: isLoadingResume } = useQuery(
    ["userResume", time_range],
    () => {
      return Axios.request({
        method: "GET",
        url: "http://localhost:5000/api/spotify/getResume",
        params: {
          access_token: accessToken,
          time_period: time_range,
        },
      }).then((res) => {
        return res.data;
      });
    }
  );

  const { data: categories, isLoading: isLoadingCategories } = useQuery(
    ["userTops", time_range],
    () => {
      return Axios.request({
        method: "GET",
        url: "http://localhost:5000/api/spotify/getUserTop",
        params: {
          access_token: accessToken,
          time_period: time_range,
        },
      }).then((res) => {
        return res.data;
      });
    }
  );
  const { data: analysis, isLoading: isLoadingAnalysis } = useQuery(
    ["userAnalysis", time_range],
    () => {
      return Axios.request({
        method: "GET",
        url: "http://localhost:5000/api/spotify/getAnalysis",
        params: {
          access_token: accessToken,
          time_period: time_range,
        },
      }).then((res) => {
        return res.data;
      });
    }
  );

  useEffect(() => {
    updateToken();
    console.log(accessToken);
  }, [accessToken]);

  if (isLoadingCategories || isLoadingResume || isLoadingAnalysis)
    return (
      <div className="w-full max-w-screen-lg px-2 py-8 ">
        <h1 className="text-white mt-10 text-center">Loading...</h1>
      </div>
    );

  return (
    <div className="bg-black min-h-screen m-0 p-0 flex items-center flex-col ">
      <NavBar></NavBar>
      <TimeSelector></TimeSelector>

      <h2 className="m-5 text-xl text-white">{t("summary")}</h2>
    </div>
  );
};

export default Summary;
