import React from "react";
import { NavLink } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const { t } = useTranslation();
  return (
    <div className="flex mb-4 bg-green w-full justify-center items-center flex-wrap">
      <div className="flex justify-center align-center flex-wrap">
        {[
          [t("trends"), "/trends"],
          [t("summary"), "/resume"],
          [t("tops"), "/tops"],
          [t("analysis"), "/analysis"],
          [t("playlists"), "/playlists"],
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
      <div className="px-3 justify-self-end self-center lg:absolute lg:top-0 lg:right-0 mr-10 pt-1 lg:pt-3 ">
        <LanguageSelector></LanguageSelector>
      </div>
    </div>
  );
};

export default NavBar;
