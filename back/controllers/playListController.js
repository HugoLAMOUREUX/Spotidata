const SpotifyWebApi = require("spotify-web-api-node");
const dotenv = require("dotenv").config({ path: "../config/.env" });
const { getTrackDetails } = require("../controllers/trackController");


const getPlaylistTracks = async (spotifyApi, playlist_id) => {
  // Get tracks in an album

  return await spotifyApi
    .getPlaylistTracks(playlist_id, { limit: 50, offset: 1 })
    .then(
      function (data) {
        //All this is to clean the data and make it easier to use on the front end
        if (data.body.href) {
          delete data.body.href;
        }
        if (data.body.items) {
          let count = 1;
          data.body.items.forEach((item) => {
            item.rank = count;
            if (item.added_by) {
              delete item.added_by;
            }
            if (
              item.track &&
              item.track.album &&
              item.track.album.available_markets
            ) {
              delete item.track.album.available_markets;
            }
            if (item.track && item.track.available_markets) {
              delete item.track.available_markets;
            }
            if (item.track && item.track.name) {
              item.track_name = item.track.name;
            }
            if (item.track && item.track.id) {
              item.track_id = item.track.id;
            }
            if (item.track && item.track.images) {
              item.images = item.track.images;
            }
            if (item.added_at) {
              delete item.added_at;
            }
            if (item.is_local) {
              delete item.is_local;
            }
            if (item.primary_color) {
              delete item.primary_color;
            }
            if (item.video_thumbnail) {
              delete item.video_thumbnail;
            }
            if (item.track && item.track.artists) {
              item.artists = item.track.artists.map((artist) => {
                return { name: artist.name, id: artist.id };
              });
            }
            if (item.track && item.track.album && item.track.album.images) {
              item.img = item.track.album.images;
            }

            delete item.track;

            count++;
          });
        }

        return data.body;
      },
      function (err) {
        console.log(err);
        return -1;
      }
    );
};

const getTopTrends = async (req, res) => {
  //get the tracks from the top 50 songs on spotify
  const topSongSpotifyPlaylistId = "37i9dQZEVXbMDoHDwVN2tF";
  req.query.playlist_id = topSongSpotifyPlaylistId;

  //get the token of the app for doing the request for getting a public access token
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
  });

  //getting the public access token
  spotifyApi.clientCredentialsGrant().then(
    function (data) { 
      // set the access token
      spotifyApi.setAccessToken(data.body["access_token"]);  

      //get the tracks from the top 50 songs on spotify
      getPlaylistTracks(spotifyApi, req.query.playlist_id).then( 
        function (data) { 
          res.status(200).json(data);
      },
      function (err) {
        console.log("Something went wrong when retrieving the tracks", err);
      }
    );

    },
    function (err) {
      console.log("Something went wrong when retrieving an access token", err);
    }
  );
};

const getUserPlaylists = async (req, res) => {
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.query.access_token,
  });

  // Get the 50 first playlists of the user
  spotifyApi.getUserPlaylists({ limit: 50, offset: 1 }).then(
    function (data) {
      if (data.body.href) {
        delete data.body.href;
      }
      if (data.body.items) {
        let count = 1;
        data.body.items.forEach((item) => {
          item.rank = count;
          if (item.href) {
            delete item.href;
          }
          if (item.snapshot_id) {
            delete item.snapshot_id;
          }
          if (item.uri) {
            delete item.uri;
          }
          if (item.owner && item.owner.display_name) {
            item.owner_name = item.owner.display_name;
          }
          if (item.owner && item.owner.id) {
            item.owner_id = item.owner.id;
          }

          delete item.owner;

          count++;
        });
      }
      res.status(200).json(data.body);
    },
    function (err) {
      res.status(400);
      console.log(err);
    }
  );
};

const getPlaylistDetails = async (req, res) => {
  //accessToken: req.query.access_token,
  const spotifyApi = new SpotifyWebApi({
    accessToken: "BQCk3zYlGGGHVgq7r13C_JTHEsrkIkQribLLloA4JT5wU66xlbQE0dGGpwsW17JLtnbpeBTvnw76Kvt4TZDqS6gtkixjnQizkwsVDgIESx2jxs4D8BUg7jxMIzhCRFDYh-X1xVAees0E0ID4fXJ8zrlP7GArBqD6JEhAExfX3P5j1QjrSo2bTRjJ414Xh9lAzst8bXKXJckApoqFPbG3-yeLDJAdDE3exA4G5KKskP1_ezT2V09NNuEOz1trQN935DKm7TgUcj5X-st9GGJe0uoo-d5DGw",  
  });

  req.query.playlist_id="5qbWFVi6ApPvKysDdsZvdw";
  let return_value = {};
  return_value.mean_danceability = 0.0;
  return_value.mean_energy = 0.0;
  return_value.mean_loudness = 0;
  return_value.mean_speechiness = 0;
  return_value.mean_acousticness = 0;
  return_value.mean_instrumentalness = 0;
  return_value.mean_liveness = 0;
  return_value.mean_valence = 0;
  return_value.mean_tempo = 0;
  return_value.mean_time_signature = 0;
  return_value.mean_key = 0;
  return_value.mean_mode = 0;
  return_value.mean_duration_ms = 0;
  let count = 0;

  const test_wait = new Promise((resolve, reject) => {
    getPlaylistTracks(spotifyApi, req.query.playlist_id).then( 
      function (data) { 
        if (data && data.items) {
          data.items.forEach((item) => {
            if(item.track_id){
              //for each track get the details and add them to the return value
              getTrackDetails(spotifyApi, item.track_id).then(
                function (data_track) {
                  return_value.mean_danceability += data_track.danceability;
                  return_value.mean_energy += data_track.energy;
                  return_value.mean_loudness += data_track.loudness;
                  return_value.mean_speechiness += data_track.speechiness;
                  return_value.mean_acousticness += data_track.acousticness;
                  return_value.mean_instrumentalness += data_track.instrumentalness;
                  return_value.mean_liveness += data_track.liveness;
                  return_value.mean_valence += data_track.valence;
                  return_value.mean_tempo += data_track.tempo;
                  return_value.mean_time_signature += data_track.time_signature;
                  return_value.mean_key += data_track.key;
                  return_value.mean_mode += data_track.mode;
                  return_value.mean_duration_ms += data_track.duration_ms;
                  
                  count++;
                  if(count>=data.total || count>=50){
                    resolve();
                  }
                }
              );
                
            }
          });
        }
      },
      function (err) {
        console.log("Something went wrong when retrieving the tracks", err);
        reject();
      }
    );

    
  });



  test_wait.then(() => {
    //divide by count to get the mean
    return_value.mean_danceability = return_value.mean_danceability / count;
    return_value.mean_energy = return_value.mean_energy / count;
    return_value.mean_loudness = return_value.mean_loudness / count;
    return_value.mean_speechiness = return_value.mean_speechiness / count;
    return_value.mean_acousticness = return_value.mean_acousticness / count;
    return_value.mean_instrumentalness = return_value.mean_instrumentalness / count;
    return_value.mean_liveness = return_value.mean_liveness / count;
    return_value.mean_valence = return_value.mean_valence / count;
    return_value.mean_tempo = return_value.mean_tempo / count;
    return_value.mean_time_signature = return_value.mean_time_signature / count;
    return_value.mean_key = return_value.mean_key / count;
    return_value.mean_mode = return_value.mean_mode / count;
    return_value.mean_duration_ms = return_value.mean_duration_ms / count;

    res.status(200).json(return_value);
  });
};

module.exports = { getTopTrends, getUserPlaylists, getPlaylistDetails };
