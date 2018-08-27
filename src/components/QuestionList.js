import React from 'react';
import Question from './Question';

function QuestionList(props){
	console.log('PROPS--------------->>>', props);
	return (
		<div className="questionlist">
		    <ul className="questionlist__menu">
		        { props.questions ? 
		            Object.keys(props.questions).map( (question) => (
		        	<Question question={props.questions[question]} listKey={props.questions[question].id} />
		          )) :
		          null
		        }
		    </ul>
		</div>
	)
}

export default QuestionList;