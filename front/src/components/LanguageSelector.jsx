import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const lngs = {
    fr: { nativeName: "Français" },
    en: { nativeName: "English" },
    es: { nativeName: "Español" },
  };
  const { i18n } = useTranslation();

  return (
    <div className="flex ">
      {Object.keys(lngs).map((lng) => (
        <div key={lng}>
          <button
            type="submit"
            className=" "
            onClick={() => i18n.changeLanguage(lng)}
            disabled={i18n.resolvedLanguage === lng}
          >
            <img
              src={
                location.pathname.startsWith("/public")
                  ? "/" + lng + ".png"
                  : "../../../" + lng + ".png"
              }
              alt={lng}
              className="h-10 mx-3 cursor-pointer"
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default LanguageSelector;
