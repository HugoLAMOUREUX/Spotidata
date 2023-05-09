import React, { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import useUserData from "../hooks/useUserData";
import NavBar from "../components/NavBar";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import PlaylistCard from "../components/cards/PlaylistCard";
import { useTranslation } from "react-i18next";

const Playlists = () => {
  const { t } = useTranslation();
  const { accessToken } = useContext(UserContext);
  const { checkAuthentication } = useUserData();
  const {
    data: playlists,
    isLoading,
    isError,
  } = useQuery(["playlists"], () => {
    return Axios.request({
      method: "GET",
      url: "http://localhost:5000/api/spotify/getUserPlaylists",
      params: {
        access_token: accessToken,
      },
    }).then((res) => {
      return res.data;
    });
  });

  useEffect(() => {
    checkAuthentication();
  }, []);

  if (isLoading)
    return (
      <div className="bg-black min-h-screen m-0 p-0 flex items-center flex-col ">
        <NavBar></NavBar>

        <h1 className="text-white mt-10">{t("loading")}...</h1>
      </div>
    );
  return (
    <div className="bg-black min-h-screen m-0 p-0 flex items-center flex-col">
      <NavBar></NavBar>

      <div className=" p-4 w-full sm:w-2/3 lg:w-1/2">
        {playlists.items.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist}></PlaylistCard>
        ))}
      </div>
    </div>
  );
};

export default Playlists;
