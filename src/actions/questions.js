import { _saveQuestion } from '../data/_DATA';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const CREATE_QUESTION = 'CREATE_QUESTION';

export function getQuestions(questions) {
	return {
		type: GET_QUESTIONS,
		questions,
	}
}

export function submitQuestion(question) {
	return {
		type: CREATE_QUESTION,
		question
	}
}

export function createQuestion(question) {
	return (dispatch) => {
		return _saveQuestion(question)
		    .then( (data) => dispatch(submitQuestion(data)))
	}
}