import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createAnswer } from '../actions/shared';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import Badge from '@material-ui/core/Badge';
import '../assets/css/questionpage.css';

function QuestionPage(props) {
	const [currentValue, setValue] = useState('');
	const [isAnswered, toggleAnsweredState] = useState(false);
	const [optionOnePercentage, setOptionOnePercentage] = useState(0);
	const [optionTwoPercentage, setOptionTwoPercentage] = useState(0);

	if (props.currentUser === null) {
		return <Redirect to={{
			pathname: '/error',
			state: { errorType: '401' }
		}} />;
	} else if( !props.currentQuestion ) {
		return <Redirect to={{
			pathname: '/error',
			state: { errorType: '404' }
		}} />;
	}

	useEffect(() => {
		const currentQuestion = props.currentQuestion;
	  const currentUser = props.currentUser;

	  if( currentQuestion && 
			(currentQuestion.optionOne.votes.indexOf( currentUser ) !== -1 ||
		    currentQuestion.optionTwo.votes.indexOf( currentUser ) !== -1)
	  ) {
	    const result = calculatePercentage();

			toggleAnsweredState(true);
			setOptionOnePercentage(result.optOnePercentage);
			setOptionTwoPercentage(result.optionTwoPercentage);
	  }
	}, []);

	function calculatePercentage(currentValue) {
	  const optionOneVotes = currentValue === 'optionOne' ? props.currentQuestion.optionOne.votes.length + 1 : props.currentQuestion.optionOne.votes.length;
	  const optionTwoVotes = currentValue === 'optionTwo' ? props.currentQuestion.optionTwo.votes.length + 1 : props.currentQuestion.optionTwo.votes.length;
	  const totalUsers = Object.keys(props.users).length;
	  const voteDecimalOne = (optionOneVotes / totalUsers) * 100;
	  const voteDecimalTwo = (optionTwoVotes / totalUsers) * 100;

	  return {
	    optOnePercentage: parseInt(voteDecimalOne.toFixed(1), 10),
	    optOneNumOfVotes: optionOneVotes,
	    optTwoPercentage: parseInt(voteDecimalTwo.toFixed(1), 10),
	    optTwoNumOfVotes: optionTwoVotes,
	  };
	}

	function handleSubmit(event) {
	  event.preventDefault();
	  const { id } = props.currentQuestion;
	  const { currentUser } = props;
	  const answer = { authedUser: currentUser, qid: id, answer: currentValue };
	  if( currentValue ) {
	    const result = calculatePercentage( currentValue );
	    props.dispatch(createAnswer(answer));
	    this.setState( () => ({
	      currentValue: '',
	      isAnswered: true,
	      optionOnePercentage: result.optOnePercentage,
	      optionTwoPercentage: result.optTwoPercentage,
	    }));
	  }
	}

	function handleChange(event) {
	  const value = event.target.value;
	  setValue(value);
	}

	return (
		<div className="single-question">
			{ isAnswered ? 
				<div>
					<Card className="single-question__card">
					<CardContent>
							<h3 className="single-question__author--answered">{ `Asked by ${props.users[props.currentQuestion.author].name}` }</h3>
						<h4 className="single-question__title--answered">Results:</h4>
						{ props.currentQuestion.optionOne.votes.indexOf( props.currentUser ) !== -1 ?
									<div className="single-question__block--answered">
									<Badge badgeContent="Your vote">
											<label className="single-question__block-label--answered" htmlFor="optionOneProgress">{ props.currentQuestion.optionOne.text }</label>
									</Badge>
									<LinearProgress id="optionOneProgress" variant="determinate" value={ optionOnePercentage } />
									<p>
											<span>{ optionOnePercentage }%</span>
											<span>{ `${calculatePercentage().optOneNumOfVotes} out of ${Object.keys(props.users).length} votes` }</span>
									</p>
								</div>
							:
							<div className="single-question__block--answered">
								<label className="single-question__block-label--answered" htmlFor="optionOneProgress">{ props.currentQuestion.optionOne.text }</label>
								<LinearProgress id="optionOneProgress" variant="determinate" value={ optionOnePercentage } />
								<p>
										<span>{ optionOnePercentage }%</span>
										<span>{ `${calculatePercentage().optOneNumOfVotes} out of ${Object.keys(props.users).length} votes` }</span>
								</p>
							</div>
						}
						{ props.currentQuestion.optionTwo.votes.indexOf( props.currentUser ) !== -1 ?
									<div className="single-question__block--answered">
									<Badge badgeContent="Your vote">
											<label className="single-question__block-label--answered" htmlFor="optionTwoProgress">{ props.currentQuestion.optionTwo.text }</label>
									</Badge>
									<LinearProgress id="optionTwoProgress" variant="determinate" color="secondary" value={ optionTwoPercentage } />
									<p>
										<span>{ optionTwoPercentage }%</span>
										<span>{ `${calculatePercentage().optTwoNumOfVotes} out of ${Object.keys(props.users).length} votes` }</span>
								</p>
								</div>
							:
							<div className="single-question__block--answered">
								<label className="single-question__block-label--answered" htmlFor="optionTwoProgress">{ props.currentQuestion.optionTwo.text }</label>
								<LinearProgress id="optionTwoProgress" color="secondary" variant="determinate" value={ optionTwoPercentage } />
								<p>
										<span>{ optionTwoPercentage }%</span>
										<span>{ `${calculatePercentage().optTwoNumOfVotes} out of ${Object.keys(props.users).length} votes` }</span>
								</p>
							</div>
						}
					</CardContent>
				</Card>
				</div>
				:
				<div>
					<h3 className="single-question__author--unanswered">{ `${props.users[props.currentQuestion.author].name} asks...` }</h3>
					<img className="single-question__image--unanswered" src={props.users[props.currentQuestion.author].avatarURL} alt={props.users[props.currentQuestion.author].name} />
					<h4 className="single-question__title--unanswered">Would You Rather:</h4>
					<form className="single-question__form--unanswered" onSubmit={ handleSubmit } onChange={handleChange}>
						<input id="question1" type="radio" name="whichQuestion" value={currentValue || 'optionOne'} />
						<label htmlFor="question1">{props.currentQuestion.optionOne.text}</label>
						<p className="single-question__OR--unanswered">OR</p>
						<input id="question2" type="radio" name="whichQuestion" value={currentValue || 'optionTwo'} />
						<label htmlFor="question2">{props.currentQuestion.optionTwo.text}</label>
								<Button
								variant="contained"
								color="primary"
								type="submit"
								className="single-question__button--unanswered"
						>Submit</Button>
					</form>
				</div>
			}
		</div>
	);
}

function mapStateToProps({ currentUser, users, questions }, props) {
  const { id } = props.match.params;

  return {
    currentUser: currentUser ? Object.values(currentUser).join('') : null,
    users,
    currentQuestion: questions[id],
  };
}

export default connect(mapStateToProps)(QuestionPage);
