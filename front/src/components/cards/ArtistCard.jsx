import React from "react";

const ArtistCard = ({ post }) => {
  return (
    <div className="bg-gray p-5 rounded flex items-center ">
      <h3 className="text-white px-4">{post.rank}</h3>
      {post.img.length === 0 ? (
        ""
      ) : (
        <img
          src={"url" in post.img[0] ? post.img[0].url : ""}
          width="60"
          height="60"
          alt=""
        />
      )}
      <div className="trackInfo px-4">
        <h3 className="text-white">{post.name}</h3>
      </div>
    </div>
  );
};

export default ArtistCard;
