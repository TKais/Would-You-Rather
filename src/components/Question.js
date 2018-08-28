import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import '../assets/css/question.css';

class Question extends React.Component {
	getRoute = (question) => {
		return `questions/${question.id}`;
	}

	formatName = (question) => {
		console.log('?????', question);
		const author = question.author;
		const formattedAuthor = this.props.users[author] && this.props.users[author].name;

		return formattedAuthor;
	}

	render() {
		return (
			<li className="questionlist__menu-item" key={this.props.listKey}>
			    <h3 className="questionlist__menu-item-author">{ `${this.formatName(this.props.question)} asks...` }</h3>
    	        <NavLink to={this.getRoute(this.props.question)} exact className='questionlist__menu-item-anchor'>View Poll</NavLink>
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