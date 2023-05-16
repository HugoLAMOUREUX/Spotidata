import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReturnNavBar from "../components/ReturnNavBar";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "../contexts/UserContext";
import Axios from "axios";
import { useContext } from "react";
import FeatureCard from "../components/cards/FeatureCard";
import { useTranslation } from "react-i18next";
import useUserData from "../hooks/useUserData";

const Playlist = () => {
  const { t } = useTranslation();
  const params = useParams();
  const { accessToken } = useContext(UserContext);
  const { checkAuthentication } = useUserData();
  const id = params.id;
  const name = decodeURIComponent(params.name);
  const owner_name = decodeURIComponent(params.owner_name);
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
    checkAuthentication();
  }, []);

  if (isLoading)
    return (
      <div className="bg-black min-h-screen m-0 p-0 flex items-center flex-col ">
        <ReturnNavBar></ReturnNavBar>

        <h1 className="text-white mt-10">{t("loading")}...</h1>
      </div>
    );

  return (
    <div className="bg-black min-h-screen m-0 p-0 ">
      <ReturnNavBar></ReturnNavBar>
      <div className=" px-4 flex flex-col justify-center items-center ">
        <h1 className="text-white text-3xl mb-3">{name}</h1>
        <h3 className="text-lightgray">{owner_name}</h3>
        <h3 className="text-lightgray">
          {playlist.nbr_tracks} {t("tracks")}
        </h3>
      </div>
      <div className="flex justify-center flex-wrap p-4">
        <FeatureCard
          feature={{
            name: t("meanAccousticness"),
            value: playlist.mean_acousticness,
          }}
        ></FeatureCard>
        <FeatureCard
          feature={{
            name: t("meanDanceability"),
            value: playlist.mean_danceability,
          }}
        ></FeatureCard>
        <FeatureCard
          feature={{
            name: t("meanDuration") + " (s)",
            value: playlist.mean_duration_s,
          }}
        ></FeatureCard>
        <FeatureCard
          feature={{
            name: t("meanEnergy"),
            value: playlist.mean_energy,
          }}
        ></FeatureCard>
        <FeatureCard
          feature={{
            name: t("meanInstrumentalness"),
            value: playlist.mean_instrumentalness,
          }}
        ></FeatureCard>
        <FeatureCard
          feature={{ name: t("Most Common Key"), value: playlist.keys }}
        ></FeatureCard>
        <FeatureCard
          feature={{ name: t("meanLiveness"), value: playlist.mean_liveness }}
        ></FeatureCard>
        <FeatureCard
          feature={{ name: t("meanLoudness"), value: playlist.mean_loudness }}
        ></FeatureCard>
        <FeatureCard
          feature={{ name: t("meanMode"), value: playlist.mean_mode }}
        ></FeatureCard>
        <FeatureCard
          feature={{
            name: t("meanPopularity"),
            value: playlist.mean_popularity,
          }}
        ></FeatureCard>
        <FeatureCard
          feature={{
            name: t("meanSpeechiness"),
            value: playlist.mean_speechiness,
          }}
        ></FeatureCard>
        <FeatureCard
          feature={{
            name: t("meanTempo") + " (BPM)",
            value: playlist.mean_tempo,
          }}
        ></FeatureCard>
        <FeatureCard
          feature={{ name: t("meanValence"), value: playlist.mean_valence }}
        ></FeatureCard>
      </div>
      <div className="flex justify-center ">
        <div className="bg-gray flex flex-col items-start justify-center rounded mx-10 sm:w-1/2">
          <h3 className="text-white text-xl p-4 self-center">
            {t("topArtistsInPlaylist")}
          </h3>
          {playlist.common_artists.map((artist) => {
            return (
              <div className="bg-gray p-5 rounded flex items-center ">
                <h3 className="text-white px-4">{artist.id}</h3>
                <div className="trackInfo px-4">
                  <h3 className="text-white">{artist.name}</h3>
                  <h3 className="text-lightgray">
                    {artist.nbr + " " + t("tracks")}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
