import React from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import NavBar from "../components/NavBar";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import TimeSelector from "../components/TimeSelector";

const Analysis = () => {
  const { t } = useTranslation();
  const { accessToken, time_range } = useContext(UserContext);
  const {
    data: analysis,
    isLoading,
    isError,
  } = useQuery(["userAnalysis", time_range], () => {
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
  });

  if (isLoading)
    return (
      <div className="w-full max-w-screen-lg px-2 py-8 ">
        <h1 className="text-white mt-10 text-center">Loading...</h1>
      </div>
    );

  return (
    <div className="bg-black min-h-screen m-0 p-0 flex items-center flex-col ">
      <NavBar></NavBar>

      <TimeSelector></TimeSelector>
      <div className="mt-5">
        {analysis.map((genre) => {
          return (
            <div
              key={genre.rank}
              className="bg-gray p-5 flex items-center justify-start w-5/6"
            >
              <div className="text-white px-4">{genre.rank}</div>
              <div className="text-white px-4">{genre.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Analysis;
