import * as UserActions from './users';
import * as QuestionActions from './questions';
import { getInitialData } from '../data/api';
import { _saveQuestionAnswer } from '../data/_DATA';

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

export function createAnswer(answer) {
	return (dispatch) => {
		return _saveQuestionAnswer(answer)
		    .then( () => dispatch(QuestionActions.submitAnswer(answer)) )
	}
}