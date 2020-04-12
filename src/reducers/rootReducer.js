import {combineReducers} from 'redux'
import melodyReducer from './melodyReducer'
import authReducer from './authReducer'
import actionReducer from './actionReducer'

export default combineReducers({
    auth: authReducer,
    melodies: melodyReducer,
    general: actionReducer,
})
