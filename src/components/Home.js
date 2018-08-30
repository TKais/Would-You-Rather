import React from 'react';
import { connect } from 'react-redux';
import QuestionList from './QuestionList';
import Button from '@material-ui/core/Button';
import '../assets/css/home.css';

class Home extends React.Component {
	state = {
		hideAnswered: true,
		hideUnanswered: false,
	}

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

	handleClick = ( event ) => {
		const target = event.target;
		const classes = target.classList;

		if( classes.contains( 'home-component__buttons--unanswered' ) ) {
			this.setState({ hideAnswered: true, hideUnanswered: false });
		} else if ( classes.contains( 'home-component__buttons--answered' ) ) {
			this.setState({ hideAnswered: false, hideUnanswered: true });
		}
	}

	render() {
		return (
			<div className="home-component">
			    <div className="home-component__buttons">
				    <Button
				        variant="contained"
				        type="button"
				        color="primary"
				        className="home-component__buttons--unanswered"
				        onClick={this.handleClick}
				    >Unanswered Questions</Button>
				    <Button
				        variant="contained"
				        type="button"
				        color="primary"
				        className="home-component__buttons--answered"
				        onClick={this.handleClick}
				    >Answered Questions</Button>
			    </div>
			    <div className={`home-component__question-unanswered-list ${ this.state.hideUnanswered ? 'home-component__question-hide' : '' }`}>
					<QuestionList questions={ this.generateUnansweredQuestions() } />
				</div>
				<div className={`home-component__question-answered-list ${ this.state.hideAnswered ? 'home-component__question-hide' : '' }`}>
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