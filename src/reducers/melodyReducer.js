import {FETCH_RECENTLY_PLAYED, FETCH_USER_TOP_TRACKS, FETCH_CHARTS} from '../actions/types'

const initialState = {
    recently_played_songs : [],
}

export default function(state = initialState, action){
    switch(action.type){
        case FETCH_RECENTLY_PLAYED:
            return {
                ...state,
                recently_played_songs: action.recentlyPlayedSongs
            }
        case FETCH_USER_TOP_TRACKS:
            return {
                ...state,
                user_top_tracks: action.userTopTracks
            }
        case FETCH_CHARTS:
            return {
                ...state,
                charts: action.charts
            }
        default:
            return state;    
    }
}