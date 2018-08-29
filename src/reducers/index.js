import { combineReducers } from 'redux';
import { currentUser } from './currentUser';
import { users } from './users';
import { questions } from './questions';

export default combineReducers({
	currentUser,
	users,
	questions,
});