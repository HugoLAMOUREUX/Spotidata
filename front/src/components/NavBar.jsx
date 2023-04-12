import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="flex mb-4 bg-green w-full justify-center ">
      {[
        ["Trends", "/trends"],
        ["Summary", "/callback"],
        ["Tops", "/tops"],
        ["Analysis", "/analysis"],
        ["Playlists", "/playlists"],
      ].map(([title, url]) => {
        return (
          <NavLink
            to={url}
            key={title}
            className={({ isActive }) =>
              isActive
                ? `p-5 text-lightgray text-l font-bold`
                : `p-5 text-white text-l font-bold`
            }
          >
            {title}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavBar;
