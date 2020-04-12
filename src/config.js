export const authEndPoint = "https://accounts.spotify.com/authorize"

export const clientID = "e4cea7caa08242babef9202eda8e472f"
export const redirectUri = "https://derrick-aung.github.io/mellowdies"
export const scopes = ['user-read-recently-played', 'user-top-read', 'user-library-modify', 'user-library-read', 'playlist-modify-public']

export const baseUri = "https://api.spotify.com/v1/"

export const checkUserLibUri = (track_id) =>  `https://api.spotify.com/v1/me/tracks/contains?ids=${track_id}`
export const saveTrackToLibUri = (track_id) => `https://api.spotify.com/v1/me/tracks?ids=${track_id}`
export const saveTrackToPlaylistUri = (playlist_id, track_id) => `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=${track_id}`
export const userPlaylistsUri = (user_id) => `https://api.spotify.com/v1/users/${user_id}/playlists`
export const artistTopTracksUri = (id) => {return `https://api.spotify.com/v1/artists/${id}/top-tracks?country=from_token`}
export const artistUri = (artist_id) => {return `https://api.spotify.com/v1/artists/${artist_id}`}
