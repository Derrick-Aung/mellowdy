import {SET_TOKEN} from './types'

export function setToken(token){
    return ({
        type: SET_TOKEN,
        token
    })
}