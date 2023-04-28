const SpotifyWebApi = require("spotify-web-api-node");
const dotenv = require("dotenv").config({ path: "../config/.env" });

const getUserTop = async (req,res) => {

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    accessToken: req.query.access_token
});


spotifyApi.getMyTopTracks({time_range:req.query.time_period, limit: 25})
  .then(async function(data) {    
    let trackCount = 0;
    let albumCount = 0;
    let artistCount = 0;

    let topTracks = {
      Tracks: [],
      Albums: [],
      Artists: []
    };

    console.log(data.body.items);
    
    await spotifyApi.getMyTopArtists()
      .then(function(data) {
        //topArtists = data.body.items;
        data.body.items.forEach(artist => {
          artistCount++;
          topTracks.Artists.push({
            rank: artistCount,
            name: artist.name,
            artistId: artist.id,
            img: artist.images
          })
        });
      }, function(err) {
        console.log('Something went wrong!', err);
      });

    data.body.items.forEach(array => {

      trackCount++;
      let trackArtists = [];
      array.artists.forEach(artist => {
        trackArtists.push({
          name: artist.name,
          artistId: artist.id
        });
      });

      topTracks.Tracks.push({
        rank: trackCount,
        title: array.name,
        titleId: array.id,
        img: array.images,
        artist: trackArtists
      });

      if (array.album.album_type === "ALBUM") {
        exists = false;
        topTracks.Albums.forEach(album => {
        if (array.album.name === album.title)
          exists = true;
        });

        if (exists)
          return;

        let albumArtists = [];
        array.album.artists.forEach(artist => {
          albumArtists.push({
            name: artist.name,
            artistId: artist.id
          });
        });

        albumCount++;
        topTracks.Albums.push({
          rank: albumCount,
          title: array.album.name,
          albumId: array.album.id,
          img: array.album.images,
          artist: albumArtists
        });
      }
    });

    res.status(200).json(topTracks);
  }, function(err) {

    console.log("error", err)
    res.status(400);
    throw new Error("Something went wrong");

  });
}

const getAnalysis = async (req, res) => {
  var spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    accessToken: req.query.access_token
  });

  spotifyApi.getMyTopArtists()
    .then(function(data) {
    let score = data.body.items.length, rank = 1;
    let topGenre = [];
    data.body.items.forEach(artist => {
      artist.genres.forEach(genre => {
        exists = false;
        topGenre.forEach(g => {
          if (g.name === genre) {
            exists = true
            g.score += score;
          }
        });

        if (exists) return;

        topGenre.push({
          name: genre,
          score: score
        });
      });
      score--;
    });

    topGenre.sort(function(a,b) {
        return b.score - a.score;
    });

    topGenre.forEach(genre => {
        genre.rank = rank;
        delete genre.score;
        rank++;
    });

    res.status(200).json(topGenre);

    }, function(err) {
        console.log('Something went wrong!', err);
    });
};

const getUserPlaylists = async (req, res) => {
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.query.access_token,
  });

  // Get the 50 first playlists of the user
  spotifyApi.getUserPlaylists({ limit: 50, offset: 0 }).then(
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

module.exports = { getUserTop, getAnalysis, getUserPlaylists };