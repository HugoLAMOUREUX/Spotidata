import React from "react";

const TrackCard = ({ track }) => {
  return (
    <div className="bg-gray p-5 rounded flex items-center ">
      <h3 className="text-white px-4">{track.rank}</h3>
      <img src={track.img} alt="" />
      <div className="trackInfo px-4">
        <h3 className="text-white">{track.title}</h3>
        <h3 className="text-lightgray">{track.artist}</h3>
      </div>
    </div>
  );
};

export default TrackCard;
