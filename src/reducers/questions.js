import { GET_QUESTIONS, CREATE_QUESTION } from '../actions/questions';

export function questions(state = {}, action) {
	switch(action.type) {
		case GET_QUESTIONS:
		    return {
		    	...state,
		    	...action.questions,
		    }
		case CREATE_QUESTION:
		    return {
		    	...state,
		    	[action.question.id]: action.question,
		    }
		default:
		    return state
	}
}