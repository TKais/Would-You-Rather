import React from 'react';
import { NavLink } from 'react-router-dom';

class Question extends React.Component {
	getRoute = (question) => {
		return `questions/${question.id}`;
	}

	render() {
		return (
			<li className="questionlist__menu-item" key={this.props.listKey}>
    	        <NavLink to={this.getRoute(this.props.question)} exact activeClassName='active'>{this.props.question.id}</NavLink>
        	</li>
		);
	}
}

export default Question;