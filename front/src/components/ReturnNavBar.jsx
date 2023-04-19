import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ReturnNavBar = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex mb-4 bg-green w-full justify-start px-5">
      <BsArrowLeft
        onClick={goBack}
        className="h-10 fill-white cursor-pointer"
      />
    </div>
  );
};

export default ReturnNavBar;
