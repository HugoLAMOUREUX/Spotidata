import React from "react";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import TrackCard from "./cards/TrackCard";
import ArtistCard from "./cards/ArtistCard";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TopTrends = () => {
  let [categories] = useState({
    Tracks: [
      {
        id: 1,
        title: "Scared to be lonely",
        img: "",
        artist: "Martin Garrix",
      },
      {
        id: 2,
        title: "Glitch",
        img: "",
        artist: "Martin Garrix",
      },
      {
        id: 3,
        title: "Scared to be lonely",
        img: "",
        artist: "Martin Garrix",
      },
      {
        id: 4,
        title: "Glitch",
        img: "",
        artist: "Martin Garrix",
      },
      {
        id: 5,
        title: "Scared to be lonely",
        img: "",
        artist: "Martin Garrix",
      },
      {
        id: 6,
        title: "Glitch",
        img: "",
        artist: "Martin Garrix",
      },
    ],
    Artists: [
      {
        id: 1,
        img: "",
        artist: "Martin Garrix",
      },
      {
        id: 2,
        img: "",
        artist: "Martin Garrix",
      },
    ],
    Albums: [
      {
        id: 1,
        title: "Montagnes Russes",
        img: "",
        artist: "Lujipeka",
      },
      {
        id: 2,
        title: "Planet Gold",
        img: "",
        artist: "Sofiane Pamart",
      },
    ],
  });
  return (
    <div className="w-full max-w-screen-lg px-2 py-8">
      <Tab.Group>
        <Tab.List className="flex space-x-0.1 rounded-xl bg-gray">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white",
                  "ring-white ring-opacity-60 ",
                  selected
                    ? "bg-lightgray shadow"
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
                "rounded-xl bg-gray p-3",
                "ring-white ring-opacity-60 "
              )}
            >
              <ul>
                {posts.map((post) =>
                  idx == 1 ? (
                    <ArtistCard key={post.id} post={post}></ArtistCard>
                  ) : (
                    <TrackCard key={post.id} post={post}></TrackCard>
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

export default TopTrends;
