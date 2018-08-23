import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class QuestionList extends React.Component {
	getRoute = (question) => {
		return `questions/${question}`;
	}

	render() {
		return (
			<div className="questionlist">
			    <ul className="questionlist__menu">
			        { Object.keys(this.props.questions).map( (question) => (
			        	<li className="questionlist__menu-item" key={this.props.questions[question].id}>
			        	    <NavLink to={this.getRoute(question)} exact activeClassName='active'>{this.props.questions[question].id}</NavLink>
			        	</li>
			        ))}
			    </ul>
			</div>
		)
	}
}

function mapStateToProps({ questions }) {
	return {
		questions
	}
}

export default connect(mapStateToProps)(QuestionList)