import React, { useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const UserContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState("");
  const [state, setState] = useState("");
  const [time_range, setTime_range] = useState("medium_term");

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
        time_range,
        setTime_range,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
