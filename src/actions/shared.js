import { _getUsers } from '../data/_DATA';
import { showLoading, hideLoading } from 'react-redux-loading';
import * as UserActions from './users';

// Uses Thunk pattern for async data
export function getUserData() {
	return (dispatch) => {
		dispatch(showLoading())
		return _getUsers()
		    .then( (users) => {
		    	dispatch( UserActions.getUsers(users) );
			  	dispatch(hideLoading());
		    });
	} 
}