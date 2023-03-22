import React, { useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const UserContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState("");
  const [state, setState] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    //obtain what is returned by the spotify api after the connexion
    let params = getHashParams();
    let access_token = params.access_token,
      state = params.state,
      storedState = localStorage.getItem("spotify_auth_state");

    if (access_token && (state == null || state !== storedState)) {
    } else {
      localStorage.removeItem("spotify_auth_state");
      if (access_token) {
        //keep the access token in the state
        setAccessToken(access_token);
        setExpiresIn(params.expires_in);
        setRefreshToken("TO DO");
        setState(state);
        console.log("test");
        console.log(access_token);
      } else {
        //if the user has refused the connexion, redirect to the home page
        alert("There was an error during the authentication");
        navigate("/");
      }
    }
  }, [accessToken]);

  return (
    <UserContext.Provider
      value={{
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        expiresIn,
        setExpiresIn,
        state,
        setState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
