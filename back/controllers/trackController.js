const SpotifyWebApi = require("spotify-web-api-node");
const dotenv = require("dotenv").config({ path: "../config/.env" });

const getTrackDetails = async (spotifyApi, track_id) => {
  let return_value;
  await spotifyApi.getAudioFeaturesForTrack(track_id).then(
    function (data) {
      //delete the data that we don't need
      if (data.body.type) {
        delete data.body.type;
      }
      if (data.body.uri) {
        delete data.body.uri;
      }
      if (data.body.track_href) {
        delete data.body.track_href;
      }
      if (data.body.analysis_url) {
        delete data.body.analysis_url;
      }
      if (data.body.id) {
        delete data.body.id;
      }

      return_value = data.body;
    },
    function (err) {
      console.log(err);
      return -1;
    }
  );

  await spotifyApi.getTrack(track_id).then(
    function (data_more_info) {
      //add the data that we need
      if (data_more_info.body.album && data_more_info.body.album.genres) {
        return_value.genres = data_more_info.body.album.genres;
      }
      if (data_more_info.body.popularity) {
        return_value.popularity = data_more_info.body.popularity;
      }
      if (data_more_info.body.artists) {
        return_value.artists = data_more_info.body.artists.map((artist) => {
          return { name: artist.name, id: artist.id };
        });
      }
    },
    function (err) {
      console.log("Something went wrong when retrieving the tracks", err);
    }
  );

  return return_value;
};

const getTracksDetails = async (spotifyApi, tracks_id, return_value) => {
  let count_audio_ft_tracks = 0;
  let count_normal_tracks = 0;

  //allow to truly wait for the functions to finish
  const wait_for_everything = new Promise(async (resolve, reject) => {
    await spotifyApi.getAudioFeaturesForTracks(tracks_id).then(function (data) {
      //get all the tracks features
      data.body["audio_features"].forEach((track) => {
        //for some reason, sometimes the api return null tracks, so we need to check for that
        if (track) {
          count_audio_ft_tracks++;
          return_value.mean_danceability += track.danceability;
          return_value.mean_energy += track.energy;
          return_value.mean_loudness += track.loudness;
          return_value.mean_speechiness += track.speechiness;
          return_value.mean_acousticness += track.acousticness;
          return_value.mean_instrumentalness += track.instrumentalness;
          return_value.mean_liveness += track.liveness;
          return_value.mean_valence += track.valence;
          return_value.mean_tempo += track.tempo;
          return_value.mean_time_signature += track.time_signature;
          return_value.mean_key += track.key;
          return_value.mean_mode += track.mode;
          return_value.mean_duration_ms += track.duration_ms;
        }
      });
    });

    let count = 0;

    //get the popularity, (genres) and artists of the tracks
    await spotifyApi.getTracks(tracks_id).then(
      async function (data_more_info) {
        await data_more_info.body["tracks"].forEach(async (track) => {
          //because sometimes the api return null tracks, we need to check for that
          if (track) {
            count_normal_tracks++;
            return_value.mean_popularity += track.popularity;

            //it's commented for 2 reasons :
            //1) the api seems broken for now, i can't get the genres of the album neither
            //  by getting the track or the album; in the track there is just no genres,
            //  and in the album it's just an empty array
            //2) it add to many requests to the api, and so it crashes the app

            /*
            await spotifyApi.getAlbum(track.album.id).then(
              async function (data_album) {
                //res.status(200).json(data_album.body);
                if(data_album.body.genres){
                  
                  data_album.body.genres.forEach(genre => {
                    if(return_value.genres[genre]){
                      return_value.genres[genre] += 1;
                    }else{
                      return_value.genres[genre] = 1;
                    }
                  });
                }
              });
              */

            //add the data for the artists
            if (track.artists) {
              track.artists.forEach((artist) => {
                if (return_value.artists[artist.id]) {
                  return_value.artists[artist.id].nbr += 1;
                } else {
                  return_value.artists[artist.id] = {
                    name: artist.name,
                    nbr: 1,
                  };
                }
              });
            }
          }

          count++;
          if (count === data_more_info.body["tracks"].length) {
            resolve();
          }
        });
      },
      function (err) {
        console.log("Something went wrong when retrieving the tracks", err);
      }
    );
  });

  await wait_for_everything.then(() => {
    //it need to be here so that the function wait for the end of the loop
    //otherwise it will return undefined before the loop is finished, even with the await
  });

  //add the nbr of tracks that were actually used for the stats
  return_value.nbr_tracks_audio_ft += count_audio_ft_tracks;
  return_value.nbr_tracks_get_norm += count_normal_tracks;

  return return_value;
};

module.exports = { getTrackDetails, getTracksDetails };
