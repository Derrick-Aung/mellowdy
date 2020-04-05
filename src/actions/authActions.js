import {SET_TOKEN} from './types'

export function setToken(token){
    console.log('setting token to ',token)
    return ({
        type: SET_TOKEN,
        token
    })
}