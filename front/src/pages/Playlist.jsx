import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReturnNavBar from "../components/ReturnNavBar";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "../contexts/UserContext";
import Axios from "axios";
import { useContext } from "react";

const Playlist = () => {
  const params = useParams();
  const { accessToken } = useContext(UserContext);
  const id = params.id;
  const {
    data: playlist,
    isLoading,
    isError,
  } = useQuery(["playlist"], () => {
    return Axios.request({
      method: "GET",
      url: "http://localhost:5000/api/spotify/getPlaylistDetails",
      params: {
        access_token: accessToken,
        playlist_id: id,
      },
    }).then((res) => {
      return res.data;
    });
  });

  useEffect(() => {
    console.log(playlist);
  }, [playlist]);

  if (isLoading)
    return (
      <div className="bg-black min-h-screen m-0 p-0 flex items-center flex-col ">
        <ReturnNavBar></ReturnNavBar>

        <h1 className="text-white mt-10">Loading...</h1>
      </div>
    );

  return (
    <div className="bg-black min-h-screen m-0 p-0">
      <ReturnNavBar></ReturnNavBar>
    </div>
  );
};

export default Playlist;
