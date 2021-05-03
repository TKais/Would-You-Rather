import * as UserActions from './users';
import * as QuestionActions from './questions';
import { getInitialData } from '../data/api';
import { _saveQuestionAnswer } from '../data/_DATA';
import { showLoading, hideLoading } from 'react-redux-loading';

// Uses Thunk pattern for async data
export function getAllData() {
  return (dispatch) => {
    return getInitialData()
      .then( (data) => {
        dispatch( UserActions.getUsers(data.users));
        dispatch( QuestionActions.getQuestions(data.questions));
      });
  }; 
}

export function createAnswer(answer) {
  return (dispatch) => {
    dispatch(showLoading());
    return _saveQuestionAnswer(answer)
      .then( () => dispatch(QuestionActions.submitAnswer(answer)) )
      .then( () => dispatch(UserActions.addUserAnswer(answer)) )
      .then( () => dispatch(hideLoading()) );
  };
}
