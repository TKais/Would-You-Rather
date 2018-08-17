import { SET_CURRENT_USER } from '../actions/currentUser';

export function currentUser(state = null, action) {
	switch(action.type) {
		case SET_CURRENT_USER:
		    return {
		    	...state,
		    	...action.id
		    }
		default:
		    return state
	}
}