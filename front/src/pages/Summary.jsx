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
  }, [resume]);

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
      <h3 className="m-5 text-xl text-white text-center">
        {t("average_hapiness")}{" "}
        <span className="text-green font-bold ">{resume.mean_valence}</span>
      </h3>
      <h3 className="m-5 text-xl text-white text-center">
        {t("obscurity_score")}
        <span className="text-green font-bold">{resume.mean_popularity}</span>
      </h3>
      <h3 className="m-5 text-xl text-white text-center">
        {t("average_danceability")}
        <span className="text-green font-bold">{resume.mean_danceability}</span>
      </h3>
      <h3 className="m-5 text-xl text-white text-center">
        {t("top_genre")}
        <span className="text-green font-bold">{analysis[0].name}</span>
      </h3>

      <div className="flex justify-center flex-row flex-wrap items-stretch">
        {/* Top Track */}
        <div className="bg-gray py-2 px-5 rounded flex flex-col items-center justify-center m-5 flex-1">
          <h3 className="text-white text-center">{t("top_track")}</h3>
          <img
            src={categories.Tracks[0]["img"][0].url}
            width="80"
            height="80"
            alt=""
            className="my-2"
          />
          <h3 className="text-white text-center">
            {categories.Tracks[0].title}
          </h3>
          <h3 className="text-lightgray text-center">
            {categories.Tracks[0].artist
              .map((artist) => artist.name)
              .join(", ")}
          </h3>
        </div>
        {/* Top Artist */}
        <div className="bg-gray py-2 px-5 rounded flex flex-col justify-center items-center m-5 flex-1">
          <h3 className="text-white text-center">{t("top_artist")}</h3>
          <img
            src={categories.Artists[0]["img"][0].url}
            width="80"
            height="80"
            alt=""
            className="my-2"
          />
          <h3 className="text-white text-center">
            {categories.Artists[0].name}
          </h3>
        </div>
        {/* Top Album */}
        <div className="bg-gray py-2 px-5 rounded flex flex-col items-center justify-center m-5 flex-1">
          <h3 className="text-white text-center">{t("top_album")}</h3>
          <img
            src={categories.Albums[0]["img"][0].url}
            width="80"
            height="80"
            alt=""
            className="my-2"
          />
          <h3 className="text-white text-center">
            {categories.Albums[0].title}
          </h3>
          <h3 className="text-lightgray text-center">
            {categories.Albums[0].artist
              .map((artist) => artist.name)
              .join(", ")}
          </h3>
        </div>
      </div>
      <h3 className="m-5 text-xl text-white text-center">
        {t("average_duration")}
        <span className="text-green font-bold">{resume.mean_duration_s}</span>
      </h3>
      <h3 className="m-5 text-xl text-white text-center">
        {t("average_speechiness")}
        <span className="text-green font-bold">{resume.mean_speechiness}</span>
      </h3>
      <h3 className="m-5 text-xl text-white text-center">
        {t("average_acousticness")}
        <span className="text-green font-bold">{resume.mean_acousticness}</span>
      </h3>
      <h3 className="m-5 text-xl text-white text-center">
        {t("average_instrumentalness")}
        <span className="text-green font-bold">
          {resume.mean_instrumentalness}
        </span>
      </h3>
      <h3 className="m-5 text-xl text-white text-center">
        {t("average_liveness")}
        <span className="text-green font-bold">{resume.mean_liveness}</span>
      </h3>
      <h3 className="m-5 text-xl text-white text-center">
        {t("average_loudness")}
        <span className="text-green font-bold">{resume.mean_loudness}</span>
      </h3>
    </div>
  );
};

export default Summary;
