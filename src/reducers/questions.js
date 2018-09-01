import { GET_QUESTIONS, CREATE_QUESTION, CREATE_ANSWER } from '../actions/questions';

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
		case CREATE_ANSWER:
			console.log('ACTION--->', action);
		    return {
		    	...state,
		    	[action.answer.qid]: action.answer,
		    }
		default:
		    return state
	}
}