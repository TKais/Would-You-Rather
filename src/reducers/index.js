import { combineReducers } from 'redux';
import { currentUser } from './currentUser';
import { allUsers } from './users';
import { loadingBarReducer } from 'react-redux-loading';

export default combineReducers({
	currentUser,
	allUsers,
	loader: loadingBarReducer
});