import React from "react";

const PlaylistCard = ({ playlist }) => {
  return (
    <div className="bg-gray p-5 my-1 rounded flex items-center w-full ">
      {playlist.images.length === 0 ? (
        ""
      ) : (
        <img
          src={"url" in playlist.images[0] ? playlist.images[0].url : ""}
          width="60"
          height="60"
          alt=""
        />
      )}

      <div className="trackInfo px-4">
        <h3 className="text-white">{playlist.name}</h3>
        <h3 className="text-lightgray">{playlist.owner_name}</h3>
      </div>
      <h3 className="text-lightgray ml-auto">{playlist.tracks.total} tracks</h3>
    </div>
  );
};

export default PlaylistCard;
