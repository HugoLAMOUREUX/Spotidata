import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useTranslation } from "react-i18next";

const useUserData = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    accessToken,
    setAccessToken,
    expiresIn,
    setExpiresIn,
    refreshToken,
    setRefreshToken,
    state,
    setState,
  } = useContext(UserContext);
  /**
   * Obtains parameters from the hash of the URL
   * @return Object
   */
  function getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  const updateToken = () => {
    //obtain what is returned by the spotify api after the connexion
    let params = getHashParams();
    let access_token = params.access_token,
      state = params.state;

    if (access_token) {
      //keep the access token in the state
      setAccessToken(access_token);
      setExpiresIn(params.expires_in);
      setRefreshToken("TO DO");
      setState(state);
    } else {
      //if the user has refused the connexion, redirect to the home page
      if (accessToken === "") {
        alert(t("errorAuthentication"));
        navigate("/");
      }
    }
  };
  return { updateToken };
};

export default useUserData;
