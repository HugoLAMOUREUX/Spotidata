const SpotifyWebApi = require("spotify-web-api-node");
const dotenv = require("dotenv").config({ path: "../config/.env" });
const { getTracksDetails } = require("../controllers/trackController");

//get the tracks from a given playlist
const getPlaylistTracks = async (
  spotifyApi,
  playlist_id,
  size,
  offset_value
) => {
  // Get tracks in an album

  return await spotifyApi
    .getPlaylistTracks(playlist_id, { limit: size, offset: offset_value })
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

//get the tracks from the top 50 songs on spotify
const getTopTrends = async (req, res) => {
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
      getPlaylistTracks(spotifyApi, req.query.playlist_id, 50, 0).then(
        function (data) {
          res.status(200).json(data.items);
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

//get the details of a playlist (with the mean of each audio features of the tracks in the playlist)
const getPlaylistDetails = async (req, res) => {
  if (!req.query.access_token || !req.query.playlist_id) {
    res.status(400);
  }
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.query.access_token,
  });

  //set all default values to 0
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
  return_value.mean_popularity = 0;
  return_value.nbr_tracks_audio_ft = 0;
  return_value.nbr_tracks_get_norm = 0;
  return_value.nbr_tracks = 0;
  return_value.genres = {};
  return_value.artists = {};

  //is used to store the total number of tracks in the playlist
  let total;
  // is used to store temporarly the ids of the tracks that will be used to get the details of the tracks
  let tracks_ids = [];

  //get the first 50 track's ids of the playlist
  await getPlaylistTracks(spotifyApi, req.query.playlist_id, 50, 0).then(
    function (data) {
      total = data.total;
      data.items.forEach((item) => {
        tracks_ids.push(item.track_id);
      });
    }
  );

  //get the details of the tracks
  return_value = await getTracksDetails(spotifyApi, tracks_ids, return_value);

  //if there is more tracks to get, get them
  if (total > 50) {
    for (let i = 0; i < (total - 50) / 50; i++) {
      tracks_ids = [];
      await getPlaylistTracks(
        spotifyApi,
        req.query.playlist_id,
        50,
        (i + 1) * 50
      ).then(function (data) {
        data.items.forEach((item) => {
          tracks_ids.push(item.track_id);
        });
      });

      return_value = await getTracksDetails(
        spotifyApi,
        tracks_ids,
        return_value,
        res
      );
    }
  }

  //calculate the mean of each feature
  return_value = getMean(return_value, total);

  res.status(200).json(return_value);
};

//is used to get the means for each feature (used by getPlaylistDetails, and getResume)
const getMean = (return_value, total) => {
  return_value.mean_danceability =
    Math.round(
      (
        return_value.mean_danceability / return_value.nbr_tracks_audio_ft
      ).toFixed(2) * 100
    ) + " %";
  return_value.mean_energy =
    Math.round(
      (return_value.mean_energy / return_value.nbr_tracks_audio_ft).toFixed(2) *
        100
    ) + " %";
  return_value.mean_loudness =
    (return_value.mean_loudness / return_value.nbr_tracks_audio_ft).toFixed(2) +
    " dB";
  return_value.mean_speechiness =
    Math.round(
      (
        return_value.mean_speechiness / return_value.nbr_tracks_audio_ft
      ).toFixed(2) * 100
    ) + " %";
  return_value.mean_acousticness =
    Math.round(
      (
        return_value.mean_acousticness / return_value.nbr_tracks_audio_ft
      ).toFixed(2) * 100
    ) + " %";
  return_value.mean_instrumentalness =
    Math.round(
      (
        return_value.mean_instrumentalness / return_value.nbr_tracks_audio_ft
      ).toFixed(2) * 100
    ) + " %";
  return_value.mean_liveness =
    Math.round(
      (return_value.mean_liveness / return_value.nbr_tracks_audio_ft).toFixed(
        2
      ) * 100
    ) + " %";
  return_value.mean_valence =
    Math.round(
      (return_value.mean_valence / return_value.nbr_tracks_audio_ft).toFixed(
        2
      ) * 100
    ) + " %";
  return_value.mean_tempo =
    (return_value.mean_tempo / return_value.nbr_tracks_audio_ft).toFixed(2) +
    " BPM";
  return_value.mean_time_signature = (
    return_value.mean_time_signature / return_value.nbr_tracks_audio_ft
  ).toFixed(2);
  return_value.mean_key = (
    return_value.mean_key / return_value.nbr_tracks_audio_ft
  ).toFixed(2);
  return_value.mean_mode = (
    return_value.mean_mode / return_value.nbr_tracks_audio_ft
  ).toFixed(2);
  return_value.mean_duration_s =
    (
      return_value.mean_duration_ms /
      return_value.nbr_tracks_audio_ft /
      1000
    ).toFixed(2) + " s";

  return_value.mean_popularity =
    Math.round(
      return_value.mean_popularity / return_value.nbr_tracks_get_norm
    ) + " %";

  //delete for more clarity
  delete return_value.nbr_tracks_audio_ft;
  delete return_value.nbr_tracks_get_norm;
  delete return_value.mean_duration_ms;

  return_value.nbr_tracks = total;

  //if there's no artists end the function
  if (!return_value.artists) {
    return return_value;
  }

  //sort artists by number of tracks they appear in
  let sorted_artists = Object.keys(return_value.artists).sort(function (a, b) {
    return return_value.artists[b].nbr - return_value.artists[a].nbr;
  });
  //get the 10 most common artists
  return_value.common_artists = [];
  for (let i = 0; i < 10; i++) {
    if (sorted_artists[i] != undefined) {
      return_value.artists[sorted_artists[i]].id = i + 1;
      return_value.common_artists.push(return_value.artists[sorted_artists[i]]);
    }
  }
  delete return_value.artists;

  return return_value;
};

module.exports = { getTopTrends, getPlaylistDetails, getMean };
