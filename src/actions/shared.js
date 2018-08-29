import * as UserActions from './users';
import * as QuestionActions from './questions';
import { getInitialData } from '../data/api';

// Uses Thunk pattern for async data
export function getAllData() {
	return (dispatch) => {
		return getInitialData()
		    .then( (data) => {
		    	dispatch( UserActions.getUsers(data.users));
		    	dispatch( QuestionActions.getQuestions(data.questions));
		    });
	} 
}