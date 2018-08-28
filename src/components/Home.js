import React from 'react';
import { connect } from 'react-redux';
import QuestionList from './QuestionList';
import '../assets/css/home.css';

class Home extends React.Component {
	state = {
		unanswered: {},
		answered: {},
	}

	componentDidMount() {
		const user = this.props.users[this.props.currentUser];
		const answered = Object.keys(user.answers).map( (answer) => {
			return this.props.questions[answer];
		});
		const unanswered = Object.keys(this.props.questions).map( (question) => {
			if( !(user.answers.hasOwnProperty(question)) ) {
				return this.props.questions[question];
			} else {
				return null;
			}
		});
		this.setState({
			answered,
			unanswered
		});
	}

	render() {
		return (
			<div>
			    <div>
				    <h3>Unanswered Questions</h3>
					<QuestionList questions={this.state.unanswered} />
				</div>
				<div>
					<h3>Answered Questions</h3>
					<QuestionList questions={this.state.answered} />
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