import React, { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import NavBar from "../components/NavBar";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import TimeSelector from "../components/TimeSelector";
import useUserData from "../hooks/useUserData";

const Summary = () => {
  const { t } = useTranslation();
  const { checkAuthentication } = useUserData();
  const { accessToken, time_range } = useContext(UserContext);
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
    checkAuthentication();
  }, []);

  useEffect(() => {
    console.log(resume);
    console.log(categories);
    console.log(analysis);
  }, [resume, categories, analysis]);

  if (isLoadingCategories || isLoadingResume || isLoadingAnalysis)
    return (
      <div className="bg-black min-h-screen m-0 p-0 flex items-center flex-col ">
        <NavBar></NavBar>
        <TimeSelector></TimeSelector>
        <div className="w-full max-w-screen-lg px-2 py-8 ">
          <h1 className="text-white mt-10 text-center">Loading...</h1>
        </div>
      </div>
    );

  return (
    <div className="bg-black min-h-screen m-0 p-0 flex items-center flex-col ">
      <NavBar></NavBar>
      <TimeSelector></TimeSelector>
      <h3 className="m-5 text-xl text-white">
        {t("average_hapiness")}{" "}
        <span className="text-green font-bold">{resume.mean_valence}</span>
      </h3>
      <h3 className="m-5 text-xl text-white">
        {t("obscurity_score")}
        <span className="text-green font-bold">{resume.mean_popularity}</span>
      </h3>
      <h3 className="m-5 text-xl text-white">
        {t("average_danceability")}
        <span className="text-green font-bold">{resume.mean_danceability}</span>
      </h3>
      <div className="flex items-center justify-center flex-row flex-wrap">
        <div className="bg-gray p-5 rounded flex flex-col items-center">
          <h3 className="text-white">{t("top_track")}</h3>
          {/* <img src={""} alt="top track image" /> */}
          <div className=" px-4">
            <h3 className="text-white">{categories.Tracks[0].title}</h3>
            {/* <h3 className="text-lightgray">{categories.Tracks[0].artist[0]}</h3> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
