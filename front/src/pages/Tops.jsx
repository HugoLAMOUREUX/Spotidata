import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useTranslation } from "react-i18next";
import UserTops from "../components/UserTops";
import { RadioGroup } from "@headlessui/react";
import TimeSelector from "../components/TimeSelector";

const times = ["short_term", "medium_term", "long_term"];

const Tops = () => {
  const { t } = useTranslation();
  const [time, setTime] = useState(times[1]);

  return (
    <div className="bg-black min-h-screen m-0 p-0 flex items-center flex-col ">
      <NavBar></NavBar>
      <TimeSelector></TimeSelector>
      <UserTops></UserTops>
    </div>
  );
};

export default Tops;
