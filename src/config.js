export const authEndPoint = "https://accounts.spotify.com/authorize"

export const clientID = "e4cea7caa08242babef9202eda8e472f"
export const redirectUri = "http://localhost:3000/"
export const scopes = ['user-read-recently-played', 'user-top-read',]

export const baseUri = "https://api.spotify.com/v1/"

export const artistTopTracksUri = (id) => {return `https://api.spotify.com/v1/artists/${id}/top-tracks?country=from_token`}