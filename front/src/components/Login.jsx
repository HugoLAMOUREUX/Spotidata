import React from "react";

const Login = () => {
  function generateRandomString(length) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  // when the login to Spotify button is clicked, redirect to the spotify login page
  const handleClick = () => {
    var client_id = "871c09e08e6e47e29036704256543a4a"; // Your client id
    var redirect_uri = "http://localhost:5173/callback"; // Your redirect uri

    var state = generateRandomString(16);
    var scope = "user-read-private user-read-email user-top-read";

    var url = "https://accounts.spotify.com/authorize";
    url += "?response_type=token";
    url += "&client_id=" + encodeURIComponent(client_id);
    url += "&scope=" + encodeURIComponent(scope);
    url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
    url += "&state=" + encodeURIComponent(state);

    window.location = url;
  };

  return (
    <h2
      onClick={handleClick}
      className="bg-green text-white text-1xl font-bold py-5 px-10 mt-5 rounded cursor-pointer"
    >
      Login with Spotify
    </h2>
  );
};

export default Login;
