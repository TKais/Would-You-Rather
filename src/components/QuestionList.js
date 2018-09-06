import React from 'react';
import Question from './Question';
import '../assets/css/questionlist.css';

function QuestionList(props){
	return (
		<div className="questionlist">
		    <ul className="questionlist__menu">
		        { props.questions ? 
		            props.questions.map( (question) => {
		            	if( question !== null ) {
				        	return (
				        		<Question question={question} key={question} />
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