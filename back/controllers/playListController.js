const SpotifyWebApi = require("spotify-web-api-node");
const dotenv = require("dotenv").config({ path: "../config/.env" });



const getPlaylistTracks = async (req,res) => {
    // Get tracks in an album

    const spotifyApi = new SpotifyWebApi({
        accessToken: req.body.access_token
    });
    spotifyApi.getPlaylistTracks(req.body.playlist_id, { limit : 50, offset : 1 })
    .then(function(data) {
        //All this is to clean the data and make it easier to use on the front end
        if(data.body.href){
            delete data.body.href;
        }
        if(data.body.items){
            let count = 1;
            data.body.items.forEach((item) => {
                item.rank=count;
                if(item.added_by){
                    delete item.added_by;
                }
                if(item.track && item.track.album && item.track.album.available_markets){
                    delete item.track.album.available_markets;
                }
                if(item.track && item.track.available_markets){
                    delete item.track.available_markets;
                }
                if(item.track && item.track.name){
                    item.track_name = item.track.name;
                }
                if(item.track && item.track.id){
                    item.track_id = item.track.id;
                }
                if(item.track && item.track.images){
                    item.images = item.track.images;
                }
                
                
                if(item.added_at){
                    delete item.added_at;
                }
                if(item.is_local){
                    delete item.is_local;
                }
                if(item.primary_color){
                    delete item.primary_color;
                }
                if(item.video_thumbnail){
                    delete item.video_thumbnail;
                }

                if(item.track && item.track.artists){
                    //create a new array of artists with the name and id in item.track.artists
                    item.artists = item.track.artists.map((artist) => {
                        return {name: artist.name, id: artist.id};
                    });
                }

                if(item.track && item.track.album && item.track.album.images){
                    item.img = item.track.album.images;
                }
                

                delete item.track;

                count++;
            });
        }
        res.status(200).json(data.body);
    }, function(err) {
        res.status(400);
        console.log(err);
        throw new Error("An error occurred when retrieving the playlist tracks");
    });
}

const getTopTrends = async (req, res) => {  
    //get the tracks from the top 50 songs on spotify
    const topSongSpotifyPlaylistId = "37i9dQZEVXbMDoHDwVN2tF";
    req.body.playlist_id = topSongSpotifyPlaylistId;
    getPlaylistTracks(req, res);
}

const getUserPlaylists = async (req, res) => {
    const spotifyApi = new SpotifyWebApi({
        accessToken: req.body.access_token
    });
    
    // Get the 50 first playlists of the user
    spotifyApi.getUserPlaylists({ limit : 50, offset : 1 })
    .then(function(data) {
        if(data.body.href){
            delete data.body.href;
        }
        if(data.body.items){
            let count = 1;
            data.body.items.forEach((item) => {
                item.rank=count;
                if(item.href){
                    delete item.href;
                }
                if(item.snapshot_id){
                    delete item.snapshot_id;
                }
                if(item.uri){
                    delete item.uri;
                }
                if(item.owner && item.owner.display_name){
                    item.owner_name = item.owner.display_name;
                }
                if(item.owner && item.owner.id){
                    item.owner_id = item.owner.id;
                }

                delete item.owner;



                count++;
            });
        }
        res.status(200).json(data.body);
    }, function(err) {
        res.status(400);
        console.log(err);
        throw new Error("An error occurred when retrieving the user playlists");
    });
}


module.exports = { getTopTrends, getPlaylistTracks, getUserPlaylists };