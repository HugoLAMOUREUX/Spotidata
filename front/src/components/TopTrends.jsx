import React from "react";
import { useEffect } from "react";
import TrackCard from "./cards/TrackCard";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TopTrends = () => {
  const {
    data: trends,
    isLoading,
    isError,
  } = useQuery(["trends"], () => {
    return Axios.request({
      method: "GET",
      url: "http://localhost:5000/api/spotify/getTopTrends",
    }).then((res) => {
      console.log(res.data)
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
    <div className="w-full max-w-screen-lg px-2 py-8">
      <div className="flex justify-center">
        <div className="bg-gray flex flex-col items-start justify-center">
          {trends.map((track) => {
            return (
              <TrackCard
                key={track.rank}
                track={{
                  rank: track.rank,
                  img: track.img.length === 0 ? "" : track.img[2].url,
                  title: track.track_name,
                  artist:
                    track.artists.length === 0
                      ? ""
                      : track.artists.map((artist) => artist.name).join(", "),
                  artist_id:
                    track.artists.length === 0 ? "" : track.artists[0].id,
                  track_id: track.track_id,
                }}
              ></TrackCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopTrends;
