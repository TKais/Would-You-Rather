import React from 'react';
import Question from './Question';
import '../assets/css/questionlist.css';

function QuestionList(props){
	return (
		<div className="questionlist">
		    <ul className="questionlist__menu">
		        { props.questions ? 
		            Object.keys(props.questions).map( (question) => {
		            	if( props.questions[question] !== null ) {
				        	return (
				        		<Question question={props.questions[question]} listKey={props.questions[question].id} />
			        		);
				        }
		          }) :
		          null
		        }
		    </ul>
		</div>
	)
}

export default QuestionList;