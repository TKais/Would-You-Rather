import { combineReducers } from 'redux';
import { currentUser } from './currentUser';
import { loadingBarReducer } from 'react-redux-loading';

export default combineReducers({
	currentUser,
	loader: loadingBarReducer
});