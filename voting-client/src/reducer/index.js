import { combineReducers} from 'redux';
import loggedIn from './loggedIn';
import questions from './questions';
import poll from './poll';
import makePoll from './makePoll';
import register from './register';
import {routerReducer} from 'react-router-redux';


//outline of how I want my initial state to look








export default combineReducers({
  loggedIn,
  questions,
  poll,
  makePoll,
  register,
  router: routerReducer
})
