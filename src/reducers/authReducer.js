import {SET_TOKEN} from '../actions/types'

const initialState = {
    token : null,
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_TOKEN:
            return{
                ...state,
                token: action.token                
            }
        default:
            return state;    
    }
}