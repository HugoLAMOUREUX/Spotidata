const SpotifyWebApi = require("spotify-web-api-node");
const dotenv = require("dotenv").config({ path: "../config/.env" });

const getUserTopArtists = async (spotifyApi) =>{
  let artists= [];
  let artistCount = 0;
  await spotifyApi.getMyTopArtists()
      .then(function(data) {
        //topArtists = data.body.items;
        data.body.items.forEach(artist => {
          artistCount++;
          artists.push(
            {
              rank: artistCount,
              name: artist.name,
              artistId: artist.id,
              img: artist.images,
              genres : artist.genres
            }
          )
        });
      }, function(err) {
        console.log('Something went wrong!', err);
      });
  return artists;
}

const getUserTopTracksAndAlbums = async (spotifyApi, time_rangee, nbrTracks) =>{
  let topTracks = {
    Tracks: [],
    Albums: []
  };

  await spotifyApi.getMyTopTracks({time_range:time_rangee, limit: nbrTracks})
  .then(async function(data) {    
    let trackCount = 0;
    let albumCount = 0;
    let artistCoef = nbrTracks;

    //for each track in the top tracks
    data.body.items.forEach(track => {

      trackCount++;
      let trackArtists = [];
      //for each artist in the track
      track.artists.forEach(artist => {
        trackArtists.push({
            name: artist.name,
            artistId: artist.id
          });
      });

      topTracks.Tracks.push(
        {
          rank: trackCount,
          title: track.name,
          titleId: track.id,
          img: track.images,
          artist: trackArtists
        }
      );

      //if the track is in an album
      if (track.album.album_type === "ALBUM") {
        //if the album already exists in the list (if there is an higher track from the same album)
        topTracks.Albums.forEach(album => {
          if (track.album.name === album.title)
          album.artistCoef = album.artistCoef + artistCoef;
        });



        let albumArtists = [];
        track.album.artists.forEach(artist => {
          albumArtists.push({
              name: artist.name,
              artistId: artist.id
            });
        });

        albumCount++;
        topTracks.Albums.push(
          {
            rank: albumCount,
            title: track.album.name,
            albumId: track.album.id,
            img: track.album.images,
            artist: albumArtists,
            artistCoef: artistCoef
          }
        );
      }
      artistCoef--;
    });
  }, function(err) {

    console.log("error", err)
    throw new Error("Something went wrong");

  });

  //order the albums by artistCoef
  topTracks.Albums.sort((a, b) => (a.artistCoef < b.artistCoef) ? 1 : -1);
  //delete the artistCoef
  topTracks.Albums.forEach(album => {
    delete album.artistCoef;
  });

  return topTracks;
}

const getUserTop = async (req,res) => {
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.body.access_token,
  });


  let topTracks = {
    Tracks: [],
    Albums: [],
    Artists: []
  };

  let tracksAndAlubm = await getUserTopTracksAndAlbums(spotifyApi, req.body.time_period, 50);
  if(!tracksAndAlubm || !tracksAndAlubm.Tracks || !tracksAndAlubm.Albums){
    res.status(400);
    throw new Error("Something went wrong");
  }

  topTracks.Tracks = tracksAndAlubm.Tracks;
  topTracks.Albums = tracksAndAlubm.Albums;

  topTracks.Artists = await getUserTopArtists(spotifyApi);

  //delete the genres from the artists
  topTracks.Artists.forEach(artist => {
    delete artist.genres;
  });

  res.status(200).json(topTracks);
  
};

const getAnalysis = async (req, res) => {

  const spotifyApi = new SpotifyWebApi({
    accessToken: req.query.access_token,
  });

  let artists = await getUserTopArtists(spotifyApi);
  let score = artists.length, rank = 1;
  let topGenre = [];

  artists.forEach(artist => {
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

//get the user's resume : 
// - average of all the features of all the tracks of his most listened tracks
//in construction
const getResume = async (req, res) => {
  const spotifyApi = new SpotifyWebApi({
    accessToken: req.body.access_token
  });

  let tracksAndAlubm = await getUserTopTracksAndAlbums(spotifyApi, req.body.time_period, 50);
  delete tracksAndAlubm.Albums;

  

  //res.status(200).json(tracksAndAlubm.Tracks);
};

module.exports = { getUserTop, getAnalysis, getUserPlaylists, getResume };