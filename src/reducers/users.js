import { GET_USERS, ADD_USER_ANSWER } from '../actions/users';

export function users(state = {}, action) {
  switch(action.type) {
  case GET_USERS:
		    return {
		    	...state,
		    	...action.users,
		    };
  case ADD_USER_ANSWER:
		    const { answer } = action;
		    const answerObject = state[answer.authedUser].answers;
		    const newAnswer = { [answer.qid]: answer.answer };
		    let newAnswerState = {};
		    if(!answerObject.hasOwnProperty(action.qid)) {
		    	newAnswerState = {
			    	[answer.authedUser]: {
			    		...state[answer.authedUser],
			    		answers: Object.assign({}, answerObject, newAnswer ),
			    	}
			    };
		    }
		    return {
		    	...state,
		    	...newAnswerState,
		    };
  default:
		    return state;
  }
}