import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import '../assets/css/question.css';

function Question(props) {
	function getRoute(question) {
	  const id = props.questions[props.question].id;
	  return `questions/${id}`;
	}

	function formatName(question) {
	  const author = question.author;
	  const formattedAuthor = props.users[author] && props.users[author].name;

	  return formattedAuthor;
	}

	return (
		<li className="questionlist__menu-item" key={props.questions[props.question].id}>
			<h3 className="questionlist__menu-item-author">{ `${formatName(props.questions[props.question])} asks...` }</h3>
			<p className="questionlist__menu-item-title">Would You Rather:</p>
			<p className="questionlist__menu-item-option">{props.questions[props.question].optionOne.text}</p>
			<p className="questionlist__menu-item-OR">OR</p>
			<p className="questionlist__menu-item-option">{props.questions[props.question].optionTwo.text}</p>
				<NavLink to={getRoute(props.question)} exact className='questionlist__menu-item-anchor'><span>View Poll</span></NavLink>
		</li>
	);
}

function mapStateToProps({ users, questions }) {
  return {
    users,
    questions,
  };
}

export default connect(mapStateToProps)(Question);
