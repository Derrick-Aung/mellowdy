import {FETCH_RECENTLY_PLAYED,FETCH_USER_TOP_TRACKS, FETCH_CHARTS} from './types'
import Axios from 'axios'
import {baseUri} from '../config'

export function fetchRecentlyPlayed(token){
    return function(dispatch){
        const url = `${baseUri}me/player/recently-played?limit=50`
        Axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then( recentlyPlayedSongs => {
                // The data we want are in the 'track' value
                let tracks = recentlyPlayedSongs.data.items.map(
                    (song) => {return song.track}
                )
                console.log("tracks",tracks)
                dispatch({
                    type: FETCH_RECENTLY_PLAYED,
                    recentlyPlayedSongs: tracks
                })
            }
        )
    }
} 

export function fetchUserTopTracks(token){
    return function(dispatch){
        const url = `${baseUri}me/top/tracks?limit=50`
        Axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then( userTopTracks => {
                console.log('userTopTracks',userTopTracks.data.items)
                dispatch({
                    type: FETCH_USER_TOP_TRACKS,
                    userTopTracks: userTopTracks.data.items
                })
            }
        )
    }
} 

//https://api.spotify.com/v1/me??&offset=0&market=AU
//"https://api.spotify.com/v1/playlists/37i9dQZEVXbLiRSasKsNU9"
//api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF?type=track%2Cepisode&market=from_token
export function fetchCharts(token){
    return function(dispatch){
        const url = `${baseUri}playlists/37i9dQZEVXbMDoHDwVN2tF`
        Axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then( charts => {
                console.log('charts',charts.data.tracks.items)
                let tracks = charts.data.tracks.items.map(
                    (song) => {return song.track}
                )
                console.log("tracks",tracks)
                dispatch({
                    type: FETCH_CHARTS,
                    charts: tracks
                })
            }
        )
    }
} 

export function fetchPlaylists(token){
    return function(dispatch){
        const url = `${baseUri}browse/categories/toplists/playlists?limit=50&country=AU&offset=0`
        Axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then( charts => {
                console.log('charts',charts.data.playlists.items)
                dispatch({
                    type: FETCH_CHARTS,
                    charts: charts.data.playlists.items
                })
            }
        )
    }
} 