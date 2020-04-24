export const authEndPoint = "https://accounts.spotify.com/authorize"
export const scopes = ['user-read-recently-played', 'user-top-read', 'user-library-modify', 'user-library-read', 'playlist-modify-public']
export const baseUri = "https://api.spotify.com/v1/"

export const checkUserLibUri = (track_id) =>  `https://api.spotify.com/v1/me/tracks/contains?ids=${track_id}`
export const saveTrackToLibUri = (track_id) => `https://api.spotify.com/v1/me/tracks?ids=${track_id}`
export const saveTrackToPlaylistUri = (playlist_id, track_id) => `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=${track_id}`
export const userPlaylistsUri = (user_id) => `https://api.spotify.com/v1/users/${user_id}/playlists`
export const artistTopTracksUri = (id) => {return `https://api.spotify.com/v1/artists/${id}/top-tracks?country=from_token`}
export const artistAblumsUri = (artist_id) => {return `https://api.spotify.com/v1/artists/${artist_id}/albums?include_groups=album,single&limit=20`}
export const artistUri = (artist_id) => {return `https://api.spotify.com/v1/artists/${artist_id}`}
export const albumUri = (album_id) => {return `https://api.spotify.com/v1/albums/${album_id}`}
export const convertTrackIdToUri = (track_id) => {return `spotify:track:${track_id}`}
export const genreTracksUri = (genre) => {
    const genre_string = escape(`genre:"${genre}"`)
    return `https://api.spotify.com/v1/search?query=${genre_string}&type=track&limit=50`
}
export const trackUri = (track_id) => {return `https://api.spotify.com/v1/tracks/${track_id}`}

export const multiTracksUri = (track_list) => {
    const tracks_string = escape(track_list.map(track => track).join(','))
    return `https://api.spotify.com/v1/tracks/${tracks_string}`
}


// dev config
export const clientID = "408248c6530e45e7a4975fbfa6ce0948"
export const redirectUri = "http://localhost:3000"

// prod config
// export const clientID = "e4cea7caa08242babef9202eda8e472f"
// export const redirectUri = "https://derrick-aung.github.io/mellowdy"

// browse by genre
//"https://api.spotify.com/v1/search?query=genre%3A%22burmese+pop%22&type=track&offset=0&limit=20"