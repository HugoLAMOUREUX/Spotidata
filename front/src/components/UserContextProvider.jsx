import React, { useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const UserContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState("");
  const [state, setState] = useState("");

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
