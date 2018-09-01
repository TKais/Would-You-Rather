import { _saveQuestion, _saveQuestionAnswer } from '../data/_DATA';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const CREATE_QUESTION = 'CREATE_QUESTION';
export const CREATE_ANSWER = 'CREATE_ANSWER';

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

export function submitAnswer(answer) {
	return {
		type: CREATE_ANSWER,
		answer
	}
}

export function createQuestion(question) {
	return (dispatch) => {
		return _saveQuestion(question)
		    .then( (data) => dispatch(submitQuestion(data)) )
	}
}

export function createAnswer(answer) {
	return (dispatch) => {
		return _saveQuestionAnswer(answer)
		    .then( (data) => dispatch(submitAnswer(answer)) )
	}
}