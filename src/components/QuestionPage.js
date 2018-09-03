import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createAnswer } from '../actions/shared';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import '../assets/css/questionpage.css';

class QuestionPage extends React.Component {
	state = {
		currentValue: '',
		isAnswered: false,
		percentage: 0,
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
				percentage: result,
			});
		}
	}

	calculatePercentage = ( submitMode ) => {
		const optionOneVotes = this.props.currentQuestion.optionOne.votes.length;
		const optionTwoVotes = this.props.currentQuestion.optionTwo.votes.length;
		const totalVotes = submitMode ? optionOneVotes + optionTwoVotes + 1 : optionOneVotes + optionTwoVotes;
		const totalUsers = Object.keys(this.props.users).length;
		const voteDecimal = (totalVotes / totalUsers) * 100;

		return parseInt(voteDecimal.toFixed(1));
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const { currentValue } = this.state;
		const { id } = this.props.currentQuestion;
		const { currentUser } = this.props;
		const answer = { authedUser: currentUser, qid: id, answer: currentValue };
		if( currentValue ) {
			const result = this.calculatePercentage( true );
			this.props.dispatch(createAnswer(answer));
			this.setState( () => ({
				currentValue: '',
				isAnswered: true,
				percentage: result,
			}));
		}
	}

	handleChange = (event) => {
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
						      <h3 className="single-question__author">{ `Asked by ${this.props.currentQuestion.author}` }</h3>
							  <h4 className="single-question__title">Results:</h4>
							  <LinearProgress variant="determinate" value={this.state.percentage} />
						  </CardContent>
						</Card>
			    	</div>
			    	:
			    	<div>
					    <h3 className="single-question__author">{ `${this.props.currentQuestion.author} asks...` }</h3>
					    <h4 className="single-question__title">Would You Rather:</h4>
					    <form className="single-question__form" onSubmit={ this.handleSubmit } onChange={this.handleChange}>
						    <input id="question1" type="radio" name="whichQuestion" value={this.state.currentValue || 'optionOne'} />
						    <label htmlFor="question1">{this.props.currentQuestion.optionOne.text}</label>
						    <p className="single-question__OR">OR</p>
						    <input id="question2" type="radio" name="whichQuestion" value={this.state.currentValue || 'optionTwo'} />
						    <label htmlFor="question2">{this.props.currentQuestion.optionTwo.text}</label>
			    	        <Button
						        variant="contained"
						        color="primary"
						        type="submit"
						        className="single-question__button"
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