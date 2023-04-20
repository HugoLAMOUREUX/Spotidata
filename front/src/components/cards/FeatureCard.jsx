import React from "react";

const FeatureCard = ({ feature }) => {
  return (
    <div className="bg-gray p-5 rounded flex items-center flex-col m-2">
      <h3 className="text-white px-4">{feature.name}</h3>
      <h3 className="text-lightgray">{feature.value}</h3>
    </div>
  );
};

export default FeatureCard;
