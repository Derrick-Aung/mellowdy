import {SET_USER_ID} from '../actions/types'

const initialState = {
    id : null,
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_USER_ID:
            return{
                ...state,
                id: action.user_id                
            }
        default:
            return state;    
    }
}