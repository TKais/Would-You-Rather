import React from 'react';
import { connect } from 'react-redux';
import QuestionList from './QuestionList';
import '../assets/css/home.css';

class Home extends React.Component {
	generateAnsweredQuestions = () => {
		const user = this.props.users[this.props.currentUser];
		const answered = Object.keys(user.answers).map( (answer) => {
			return this.props.questions[answer];
		});

		return answered;
	}

	generateUnansweredQuestions = () => {
		const user = this.props.users[this.props.currentUser];
		const unanswered = Object.keys(this.props.questions).map( (question) => {
			if( !(user.answers.hasOwnProperty(question)) ) {
				return this.props.questions[question];
			} else {
				return null;
			}
		});

		return unanswered;
	}

	render() {
		return (
			<div>
			    <div>
				    <h3>Unanswered Questions</h3>
					<QuestionList questions={ this.generateUnansweredQuestions() } />
				</div>
				<div>
					<h3>Answered Questions</h3>
					<QuestionList questions={ this.generateAnsweredQuestions() } />
				</div>
			</div>
		);
	}
}

function mapStateToProps({ questions, currentUser, users }) {
	return {
		currentUser: Object.values(currentUser).join(''),
		questions,
		users,
	}
}

export default connect(mapStateToProps)(Home);