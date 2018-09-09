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
		const answered = this.props.questions.map( (question) => {
			if( Object.keys(user.answers).indexOf(question) !== -1 ) {
				return question;
			} else {
				return null;
			}
		});

		return answered;
	}

	generateUnansweredQuestions = () => {
		const user = this.props.users[this.props.currentUser];
		const unanswered = this.props.questions.map( (question) => {
			if( !(user.answers.hasOwnProperty(question)) ) {
				return question;
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
				        className={`home-component__buttons--unanswered ${ this.state.hideUnanswered === false ? 'home-component__buttons--unanswered-active' : '' }`}
				        onClick={this.handleClick}
				    >Unanswered Qs</Button>
				    <Button
				        variant="contained"
				        type="button"
				        color="primary"
				        className={`home-component__buttons--answered ${ this.state.hideAnswered === false ? 'home-component__buttons--answered-active' : '' }`}
				        onClick={this.handleClick}
				    >Answered Qs</Button>
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
		questions: Object.keys(questions).sort( (a,b) => questions[b].timestamp - questions[a].timestamp ),
		users,
	}
}

export default connect(mapStateToProps)(Home);