import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class Question extends React.Component {
	getRoute = (question) => {
		return `questions/${question.id}`;
	}

	formatName = (question) => {
		const author = question.author;
		const formattedAuthor = this.props.users[author].name;

		return formattedAuthor;
	}

	render() {
		return (
			<li className="questionlist__menu-item" key={this.props.listKey}>
			    <p>{ `${this.formatName(this.props.question)} asks...` }</p>
    	        <NavLink to={this.getRoute(this.props.question)} exact className='questionlist__menu-item-anchor'>{this.props.question.id}</NavLink>
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