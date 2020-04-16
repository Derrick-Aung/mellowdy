import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

const initialState = {}
const middleware = [thunk, ]

// dev config
// const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

// prod config
const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware)))

export default store