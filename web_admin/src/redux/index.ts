import { createStore, compose, applyMiddleware } from 'redux'
import initReducer from './reducer'
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(initReducer, composeEnhancers(applyMiddleware()))
export default store