import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../assets/css/newquestion.css';
import Button from '@material-ui/core/Button';
import { createQuestion } from '../actions/questions';

class NewQuestion extends React.Component {
	state = {
		optionOneText: '',
		optionTwoText: '',
		redirect: false,
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const { optionOneText, optionTwoText } = this.state;
		const question = { optionOneText, optionTwoText, author: this.props.currentUser };
		if( optionOneText && optionTwoText ) {
			this.props.dispatch(createQuestion(question));
			this.setState( () => ({
				optionOneText: '',
				optionTwoText: '',
				redirect: true,
			}));
		}
	}

	handleChange = (event) => {
		const value = event.target.value;
		const id = event.target.id;
		const inputToUpdate = id === 'option-one' ? 'optionOneText' : 'optionTwoText';

		this.setState({ [inputToUpdate]: value });
	}

	render() {
		const { redirect } = this.state;
		if ( redirect || this.props.currentUser === null ) {
	      return <Redirect to='/' />
	    }

		return (
			<div className="new-question">
			    <h2>Create New Question</h2>
			    <h4>Would You Rather...</h4>
				<form className="new-question__form" onSubmit={ this.handleSubmit }>
					<label htmlFor="option-one">Option One</label>
					<input id="option-one" type="text" value={ this.state.optionOneText } onChange={ this.handleChange } />
					<label htmlFor="option-two">Option Two</label>
					<input id="option-two" type="text" value={ this.state.optionTwoText } onChange={ this.handleChange } />
					<Button
				        variant="contained"
				        type="submit"
				        color="primary"
				        className="new-question__form-button"
				        onClick={this.handleClick}
				    >Submit</Button>
				</form>
			</div>
		)
	}
}

function mapStateToProps({ currentUser }) {
	return {
		currentUser: currentUser ? Object.values(currentUser).join('') : null
	}
}

export default connect(mapStateToProps)(NewQuestion);