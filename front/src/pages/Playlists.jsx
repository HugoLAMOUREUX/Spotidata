import React, { useEffect } from "react";
import TopTrends from "../components/TopTrends";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import useUserData from "../hooks/useUserData";
import NavBar from "../components/NavBar";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import PlaylistCard from "../components/cards/PlaylistCard";

const Playlists = () => {
  const { accessToken } = useContext(UserContext);
  const { updateToken } = useUserData();
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
    updateToken();
  }, []);

  if (isLoading)
    return (
      <div className="bg-black min-h-screen m-0 p-0 flex items-center flex-col ">
        <NavBar></NavBar>

        <h1 className="text-white mt-10">Loading...</h1>
      </div>
    );
  return (
    <div className="bg-black min-h-screen m-0 p-0 flex items-center flex-col">
      <NavBar></NavBar>

      <div className=" w-1/2">
        {playlists.items.map((playlist) => (
          <PlaylistCard playlist={playlist}></PlaylistCard>
        ))}
      </div>
    </div>
  );
};

export default Playlists;
