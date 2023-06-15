import { combineReducers } from 'redux';
import pathReducer from './pathReducer';
import inProgressReducer from './inProgressReducer';

const rootReducer = combineReducers({ pathReducer, inProgressReducer });

export default rootReducer;
