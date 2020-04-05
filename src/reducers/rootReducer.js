import {combineReducers} from 'redux'
import melodyReducer from './melodyReducer'
import authReducer from './authReducer'

export default combineReducers({
    auth: authReducer,
    melodies: melodyReducer
})
