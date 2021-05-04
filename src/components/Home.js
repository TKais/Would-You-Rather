import React, { useState } from 'react';
import { connect } from 'react-redux';
import QuestionList from './QuestionList';
import Button from '@material-ui/core/Button';
import '../assets/css/home.css';

function Home(props) {
	const [hideAnswered, setHideAnswered] = useState(true);
	const [hideUnanswered, setHideUnanswered] = useState(false);

	function generateAnsweredQuestions() {
	  const user = props.users[props.currentUser];
	  const answered = props.questions.map( (question) => {
	    if( Object.keys(user.answers).indexOf(question) !== -1 ) {
	      return question;
	    } else {
	      return null;
	    }
	  });

	  return answered;
	}

	function generateUnansweredQuestions() {
	  const user = props.users[props.currentUser];
	  const unanswered = props.questions.map( (question) => {
	    if( !(user.answers.hasOwnProperty(question)) ) {
	      return question;
	    } else {
	      return null;
	    }
	  });

	  return unanswered;
	}

	function handleClick(event) {
	  const target = event.target;
	  const classes = target.classList;

	  if( classes.contains( 'home-component__buttons--unanswered' ) ) {
			setHideAnswered(true);
			setHideUnanswered(false);
	  } else if ( classes.contains( 'home-component__buttons--answered' ) ) {
			setHideAnswered(false);
			setHideUnanswered(true);
	  }
	}

	return (
		<div className="home-component">
			<div className="home-component__buttons">
				<Button
					variant="contained"
					type="button"
					color="primary"
					className={`home-component__buttons--unanswered ${ hideUnanswered === false ? 'home-component__buttons--unanswered-active' : '' }`}
					onClick={handleClick}
				>Unanswered Qs</Button>
				<Button
					variant="contained"
					type="button"
					color="primary"
					className={`home-component__buttons--answered ${ hideAnswered === false ? 'home-component__buttons--answered-active' : '' }`}
					onClick={handleClick}
				>Answered Qs</Button>
			</div>
			<div className={`home-component__question-unanswered-list ${ hideUnanswered ? 'home-component__question-hide' : '' }`}>
				<QuestionList questions={ generateUnansweredQuestions() } />
			</div>
			<div className={`home-component__question-answered-list ${ hideAnswered ? 'home-component__question-hide' : '' }`}>
				<QuestionList questions={ generateAnsweredQuestions() } />
			</div>
		</div>
	);
}

function mapStateToProps({ questions, currentUser, users }) {
  return {
    currentUser: Object.values(currentUser).join(''),
    questions: Object.keys(questions).sort( (a,b) => questions[b].timestamp - questions[a].timestamp ),
    users,
  };
}

export default connect(mapStateToProps)(Home);
