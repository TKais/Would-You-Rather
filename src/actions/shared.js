import { _getUsers } from '../data/_DATA';
import { showLoading, hideLoading } from 'react-redux-loading';
import * as UserActions from './currentUser';

// Uses Thunk pattern for async data
export function getUserData() {
	return (dispatch) => {
		dispatch(showLoading())
		return _getUsers()
		    .then( ({users}) => {
		    	console.log(users);
		    	dispatch( UserActions.setCurrentUser() );
			  	dispatch(hideLoading());
		    });
	} 
}