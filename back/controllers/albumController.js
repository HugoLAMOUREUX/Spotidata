const SpotifyWebApi = require("spotify-web-api-node");
const dotenv = require("dotenv").config({ path: "../config/.env" });
const { getTracksDetails } = require("../controllers/trackController");

//getAlbumTracks should be here


const getAlbumDetails = async (req, res) => {
    if (!req.query.access_token || !req.query.album_id) {
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
    //is used to store temporarly the ids of the tracks that will be used to get the details of the tracks
    let tracks_ids = [];
  
    //get the first 50 track's ids of the album
    await getAlbumTracks(spotifyApi, req.query.album_id, 50, 0).then(
      function (data) {
        total = data.total;
        data.items.forEach((item) => {
          tracks_ids.push(item.track_id);
        });
      }
    );
  
    //get the details of the tracks
    return_value = await getTracksDetails(spotifyApi, tracks_ids, return_value);

    //if there are more tracks to get, get them
    if (total > 50) {
        for (let i = 0; i < (total - 50) / 50; i++) {
            tracks_ids = [];
            await getAlbumTracks(
                spotifyApi,
                req.query.album_id,
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
    return_value.mean_danceability = (
        return_value.mean_danceability / return_value.nbr_tracks_audio_ft
    ).toFixed(2);

    return_value.mean_energy = (
        return_value.mean_energy / return_value.nbr_tracks_audio_ft
    ).toFixed(2);

    return_value.mean_loudness = (
        return_value.mean_loudness / return_value.nbr_tracks_audio_ft
    ).toFixed(2);

    return_value.mean_speechiness = (
        return_value.mean_speechiness / return_value.nbr_tracks_audio_ft
    ).toFixed(2);

    return_value.mean_acousticness = (
        return_value.mean_acousticness / return_value.nbr_tracks_audio_ft
    ).toFixed(2);

    return_value.mean_instrumentalness = (
        return_value.mean_instrumentalness / return_value.nbr_tracks_audio_ft
    ).toFixed(2);

    return_value.mean_liveness = (
        return_value.mean_liveness / return_value.nbr_tracks_audio_ft
    ).toFixed(2);

    return_value.mean_valence = (
        return_value.mean_valence / return_value.nbr_tracks_audio_ft
    ).toFixed(2);

    return_value.mean_tempo = (
        return_value.mean_tempo / return_value.nbr_tracks_audio_ft
    ).toFixed(2);

    return_value.mean_time_signature = (
        return_value.mean_time_signature / return_value.nbr_tracks_audio_ft
    ).toFixed(2);

    return_value.mean_key = (
        return_value.mean_key / return_value.nbr_tracks_audio_ft
    ).toFixed(2);

    return_value.mean_mode = (
        return_value.mean_mode / return_value.nbr_tracks_audio_ft
    ).toFixed(2);

    return_value.mean_duration_s = (
        return_value.mean_duration_ms /
        return_value.nbr_tracks_audio_ft /
        1000
    ).toFixed(2);

    return_value.mean_popularity = (
        return_value.mean_popularity / return_value.nbr_tracks_get_norm
    ).toFixed(2);

    //delete for more clarity
    delete return_value.nbr_tracks_audio_ft;
    delete return_value.nbr_tracks_get_norm;

    return_value.nbr_tracks = total;

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

    res.status(200).json(return_value);
};

module.exports = { getAlbumDetails };