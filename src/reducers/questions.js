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
    const { answer } = action;
    const newQuestionState = {
      [answer.qid]: {
        ...state[answer.qid],
        [answer.answer]: {
          ...state[answer.qid][answer.answer],
          votes: state[answer.qid][answer.answer].votes.concat([answer.authedUser]),
        }
      }
    }
    return {
      ...state,
      ...newQuestionState,
    }
  default:
    return state;
  }
}
