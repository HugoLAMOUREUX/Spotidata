import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";

const ReturnNavBar = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex mb-4 bg-green w-full justify-start px-5 ">
      <BsArrowLeft
        onClick={goBack}
        className="h-10 fill-white cursor-pointer pt-2"
      />
      <div className="px-3 justify-self-end self-end mr-10 ml-auto pt-2">
        <LanguageSelector></LanguageSelector>
      </div>
    </div>
  );
};

export default ReturnNavBar;
