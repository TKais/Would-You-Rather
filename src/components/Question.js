import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import '../assets/css/question.css';

class Question extends React.Component {
	getRoute = (question) => {
		return `questions/${question.id}`;
	}

	formatName = (question) => {
		const author = question.author;
		const formattedAuthor = this.props.users[author] && this.props.users[author].name;

		return formattedAuthor;
	}

	render() {
		return (
			<li className="questionlist__menu-item" key={this.props.key}>
			    <h3 className="questionlist__menu-item-author">{ `${this.formatName(this.props.question)} asks...` }</h3>
			    <h4 className="questionlist__menu-item-title">Would You Rather:</h4>
			    <p className="questionlist__menu-item-option">{this.props.question.optionOne.text}</p>
			    <p className="questionlist__menu-item-OR">OR</p>
			    <p className="questionlist__menu-item-option">{this.props.question.optionTwo.text}</p>
    	        <NavLink to={this.getRoute(this.props.question)} exact className='questionlist__menu-item-anchor'><span>View Poll</span></NavLink>
        	</li>
		);
	}
}

function mapStateToProps({ users, questions }) {
	return {
		users,
		questions,
	}
}

export default connect(mapStateToProps)(Question)