import React, { useContext } from "react";
import { RadioGroup } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { UserContext } from "../contexts/UserContext";

const times = ["short_term", "medium_term", "long_term"];

const TimeSelector = () => {
  const { t } = useTranslation();
  const { time_range, setTime_range } = useContext(UserContext);

  return (
    <div>
      <RadioGroup
        value={time_range}
        onChange={setTime_range}
        className="flex justify-center w-full items-stretch"
      >
        {times.map((plan) => (
          /* Use the `checked` state to conditionally style the checked option. */
          <RadioGroup.Option key={plan} value={plan}>
            {({ checked }) => (
              <div
                className={`mx-2 rounded py-2 px-10 cursor-pointer font-medium ${
                  checked
                    ? "bg-lightgray shadow text-white"
                    : "bg-gray text-white hover:bg-white/[0.4] "
                }`}
              >
                {t(plan)}
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </div>
  );
};

export default TimeSelector;
