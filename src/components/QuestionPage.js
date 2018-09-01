import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createAnswer } from '../actions/questions';
import Button from '@material-ui/core/Button';
import '../assets/css/questionpage.css';

class QuestionPage extends React.Component {
	state = {
		redirect: false,
		currentValue: '',
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const { currentValue } = this.state;
		const { id } = this.props.currentQuestion;
		const { currentUser } = this.props;
		const answer = { authedUser: currentUser, qid: id, answer: currentValue };
		if( currentValue ) {
			this.props.dispatch(createAnswer(answer));
			this.setState( () => ({
				currentValue: '',
				redirect: true,
			}));
		}
	}

	handleChange = (event) => {
		const value = event.target.value;

		this.setState({ currentValue: value });
	}

	render() {
		const { redirect } = this.state;
		if ( redirect || this.props.currentUser === null ) {
	      return <Redirect to='/' />
	    }

		return (
			<div className="single-question">
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