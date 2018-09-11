import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createAnswer } from '../actions/shared';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import Badge from '@material-ui/core/Badge';
import '../assets/css/questionpage.css';

class QuestionPage extends React.Component {
	state = {
		currentValue: '',
		isAnswered: false,
		optionOnePercentage: 0,
		optionTwoPercentage: 0,
	}

	componentDidMount() {
		const currentQuestion = this.props.currentQuestion;
		const currentUser = this.props.currentUser;

		if( currentQuestion && 
			(currentQuestion.optionOne.votes.indexOf( currentUser ) !== -1 ||
		    currentQuestion.optionTwo.votes.indexOf( currentUser ) !== -1)
		) {
			const result = this.calculatePercentage();

			this.setState({ 
				isAnswered: true,
				optionOnePercentage: result.optOnePercentage,
				optionTwoPercentage: result.optTwoPercentage,
			});
		}
	}

	calculatePercentage = ( currentValue ) => {
		const optionOneVotes = currentValue === 'optionOne' ? this.props.currentQuestion.optionOne.votes.length + 1 : this.props.currentQuestion.optionOne.votes.length;
		const optionTwoVotes = currentValue === 'optionTwo' ? this.props.currentQuestion.optionTwo.votes.length + 1 : this.props.currentQuestion.optionTwo.votes.length;
		const totalUsers = Object.keys(this.props.users).length;
		const voteDecimalOne = (optionOneVotes / totalUsers) * 100;
		const voteDecimalTwo = (optionTwoVotes / totalUsers) * 100;

		return {
			optOnePercentage: parseInt(voteDecimalOne.toFixed(1)),
			optOneNumOfVotes: optionOneVotes,
			optTwoPercentage: parseInt(voteDecimalTwo.toFixed(1)),
			optTwoNumOfVotes: optionTwoVotes,
		}
	}

	handleSubmit = ( event ) => {
		event.preventDefault();
		const { currentValue } = this.state;
		const { id } = this.props.currentQuestion;
		const { currentUser } = this.props;
		const answer = { authedUser: currentUser, qid: id, answer: currentValue };
		if( currentValue ) {
			const result = this.calculatePercentage( currentValue );
			this.props.dispatch(createAnswer(answer));
			this.setState( () => ({
				currentValue: '',
				isAnswered: true,
				optionOnePercentage: result.optOnePercentage,
				optionTwoPercentage: result.optTwoPercentage,
			}));
		}
	}

	handleChange = ( event ) => {
		const value = event.target.value;

		this.setState({ currentValue: value });
	}

	render() {
		if ( this.props.currentUser === null ) {
	      return <Redirect to={{
                pathname: '/error',
                state: { errorType: '401' }
            }} />
	    } else if( !this.props.currentQuestion ) {
	    	return <Redirect to={{
                pathname: '/error',
                state: { errorType: '404' }
            }} />
	    }

		return (
			<div className="single-question">
			    { this.state.isAnswered ? 
			    	<div>
			    	    <Card>
						  <CardContent>
						      <h3 className="single-question__author--answered">{ `Asked by ${this.props.users[this.props.currentQuestion.author].name}` }</h3>
							  <h4 className="single-question__title--answered">Results:</h4>
							  { this.props.currentQuestion.optionOne.votes.indexOf( this.props.currentUser ) !== -1 ?
							  	    <div className="single-question__block--answered">
									    <Badge badgeContent="Your vote">
									        <label className="single-question__block-label--answered" htmlFor="optionOneProgress">{ this.props.currentQuestion.optionOne.text }</label>
									    </Badge>
									    <LinearProgress id="optionOneProgress" variant="determinate" value={ this.state.optionOnePercentage } />
									    <p>
									        <span>{ this.state.optionOnePercentage }%</span>
									        <span>{ `${this.calculatePercentage().optOneNumOfVotes} out of ${Object.keys(this.props.users).length} votes` }</span>
									    </p>
								    </div>
								  :
								  <div className="single-question__block--answered">
									  <label className="single-question__block-label--answered" htmlFor="optionOneProgress">{ this.props.currentQuestion.optionOne.text }</label>
									  <LinearProgress id="optionOneProgress" variant="determinate" value={ this.state.optionOnePercentage } />
									  <p>
									      <span>{ this.state.optionOnePercentage }%</span>
									      <span>{ `${this.calculatePercentage().optOneNumOfVotes} out of ${Object.keys(this.props.users).length} votes` }</span>
									  </p>
								  </div>
							  }
							  { this.props.currentQuestion.optionTwo.votes.indexOf( this.props.currentUser ) !== -1 ?
							  	    <div className="single-question__block--answered">
									    <Badge badgeContent="Your vote">
									        <label className="single-question__block-label--answered" htmlFor="optionTwoProgress">{ this.props.currentQuestion.optionTwo.text }</label>
									    </Badge>
									    <LinearProgress id="optionTwoProgress" variant="determinate" color="secondary" value={ this.state.optionTwoPercentage } />
									    <p>
									      <span>{ this.state.optionTwoPercentage }%</span>
									      <span>{ `${this.calculatePercentage().optTwoNumOfVotes} out of ${Object.keys(this.props.users).length} votes` }</span>
									  </p>
								    </div>
								  :
								  <div className="single-question__block--answered">
									  <label className="single-question__block-label--answered" htmlFor="optionTwoProgress">{ this.props.currentQuestion.optionTwo.text }</label>
									  <LinearProgress id="optionTwoProgress" color="secondary" variant="determinate" value={ this.state.optionTwoPercentage } />
									  <p>
									      <span>{ this.state.optionTwoPercentage }%</span>
									      <span>{ `${this.calculatePercentage().optTwoNumOfVotes} out of ${Object.keys(this.props.users).length} votes` }</span>
									  </p>
								  </div>
							  }
						  </CardContent>
						</Card>
			    	</div>
			    	:
			    	<div>
					    <h3 className="single-question__author--unanswered">{ `${this.props.users[this.props.currentQuestion.author].name} asks...` }</h3>
					    <img className="single-question__image--unanswered" src={this.props.users[this.props.currentQuestion.author].avatarURL} alt={this.props.users[this.props.currentQuestion.author].name} />
					    <h4 className="single-question__title--unanswered">Would You Rather:</h4>
					    <form className="single-question__form--unanswered" onSubmit={ this.handleSubmit } onChange={this.handleChange}>
						    <input id="question1" type="radio" name="whichQuestion" value={this.state.currentValue || 'optionOne'} />
						    <label htmlFor="question1">{this.props.currentQuestion.optionOne.text}</label>
						    <p className="single-question__OR--unanswered">OR</p>
						    <input id="question2" type="radio" name="whichQuestion" value={this.state.currentValue || 'optionTwo'} />
						    <label htmlFor="question2">{this.props.currentQuestion.optionTwo.text}</label>
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
}

function mapStateToProps({ currentUser, users, questions }, props) {
	const { id } = props.match.params;

	return {
		currentUser: currentUser ? Object.values(currentUser).join('') : null,
		users,
		currentQuestion: questions[id],
	}
}

export default connect(mapStateToProps)(QuestionPage);