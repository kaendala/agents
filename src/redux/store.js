import { combineReducers, compose, createStore } from 'redux';
import incomeReducer from '../redux/reducers/incomeReducer';

const rootReducer = combineReducers({ incomeReducer });
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default createStore(rootReducer, composeEnhancers());
