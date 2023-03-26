import React from "react";

const TrackCard = ({ post }) => {
  return (
    <div className="bg-gray p-5 rounded flex items-center ">
      <h3 className="text-white px-4">{post.id}</h3>
      <img src={post.img} alt="" />
      <div className="trackInfo px-4">
        <h3 className="text-white">{post.title}</h3>
        <h3 className="text-lightgray">{post.artist}</h3>
      </div>
    </div>
  );
};

export default TrackCard;
