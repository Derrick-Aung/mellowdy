import Axios from 'axios'
import {baseUri} from '../config'
import {SET_USER_ID} from './types'

export function getUserProfileId(token){
    return function(dispatch){
        const url = `${baseUri}me`
        Axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then( res => {
                let id = res.data.id
                dispatch({
                    type: SET_USER_ID,
                    user_id: id
                })
            }
        )
    }
} 