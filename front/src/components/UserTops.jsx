import React from "react";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { Tab } from "@headlessui/react";
import TrackCard from "./cards/TrackCard";
import ArtistCard from "./cards/ArtistCard";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UserTops = () => {
  const { accessToken, time_range } = useContext(UserContext);

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery(["userTops", time_range], () => {
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
  });

  if (isLoading)
    return (
      <div className="w-full max-w-screen-lg px-2 py-8 ">
        <h1 className="text-white mt-10 text-center">Loading...</h1>
      </div>
    );

  return (
    <div className="w-full max-w-screen-lg px-2 py-8">
      <Tab.Group>
        <Tab.List className="flex space-x-0.1 rounded bg-gray">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-sm font-medium leading-5 text-white",
                  selected
                    ? "bg-lightgray shadow rounded"
                    : "hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                " bg-gray p-3",
                "ring-white ring-opacity-60 "
              )}
            >
              <ul>
                {posts.map((post) =>
                  idx == 2 ? (
                    //artist
                    <ArtistCard key={post.rank} post={post}></ArtistCard>
                  ) : idx === 0 ? (
                    //Track
                    <TrackCard
                      key={post.rank}
                      track={{
                        rank: post.rank,
                        img: post.img.length === 0 ? "" : post.img[2].url,
                        title: post.title,
                        artist:
                          post.artist.length === 0
                            ? ""
                            : post.artist
                                .map((artist) => artist.name)
                                .join(", "),
                        artist_id:
                          post.artist.length === 0 ? "" : post.artist[0].id,
                        track_id: post.track_id,
                      }}
                    ></TrackCard>
                  ) : (
                    //album
                    <TrackCard
                      key={post.rank}
                      track={{
                        rank: post.rank,
                        img: post.img.length === 0 ? "" : post.img[2].url,
                        title: post.title,
                        artist:
                          post.artist.length === 0
                            ? ""
                            : post.artist
                                .map((artist) => artist.name)
                                .join(", "),
                        artist_id:
                          post.artist.length === 0 ? "" : post.artist[0].id,
                        track_id: post.id,
                      }}
                    ></TrackCard>
                  )
                )}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
export default UserTops;
