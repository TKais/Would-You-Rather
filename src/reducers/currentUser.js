import { SET_CURRENT_USER } from '../actions/currentUser';

export function currentUser(state = null, action) {
  switch(action.type) {
  case SET_CURRENT_USER:
		if( action.id !== null ) {
			return {
				...state,
				...action.id
			}
		} else {
			return null;
		}
  default:
		return state;
  }
}
