import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import '../assets/css/questionpage.css';

class QuestionPage extends React.Component {
	state = {
		redirect: false,
		currentValue: '',
	}

	componentDidMount() {
		console.log('PROPS---?', this.props);
	}

	handleSubmit = (event) => {
		event.preventDefault();
		// const { optionOneText, optionTwoText } = this.state;
		// const question = { optionOneText, optionTwoText, author: this.props.currentUser };
		// if( optionOneText && optionTwoText ) {
		// 	this.props.dispatch(createQuestion(question));
		// 	this.setState( () => ({
		// 		optionOneText: '',
		// 		optionTwoText: '',
		// 		redirect: true,
		// 	}));
		// }
	}

	handleChange(event) {
		const currentValue = event.target.value;

		this.setState({ currentValue });
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
				    <input id="question1" type="radio" name="whichQuestion" value={ `${this.props.currentQuestion.optionOne.text}` } />
				    <label htmlFor="question1">{this.props.currentQuestion.optionOne.text}</label>
				    <p className="single-question__OR">OR</p>
				    <input id="question2" type="radio" name="whichQuestion" value={ `${this.props.currentQuestion.optionTwo.text}` } />
				    <label htmlFor="question2">{this.props.currentQuestion.optionTwo.text}</label>
	    	        <Button
				        variant="contained"
				        color="primary"
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