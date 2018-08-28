import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../assets/css/newquestion.css';
import Button from '@material-ui/core/Button';
import { createQuestion } from '../actions/questions';

class NewQuestion extends React.Component {
	state = {
		optionOneValue: '',
		optionTwoValue: '',
		redirect: false,
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const { optionOneValue, optionTwoValue } = this.state;
		const question = { optionOneValue, optionTwoValue, author: this.props.currentUser };
		this.props.dispatch(createQuestion(question));
		if( optionOneValue && optionTwoValue ) {
			this.setState({ redirect: true });
		}
	}

	handleChange = (event) => {
		const value = event.target.value;
		const id = event.target.id;
		const inputToUpdate = id === 'option-one' ? 'optionOneValue' : 'optionTwoValue';

		this.setState({ [inputToUpdate]: value });
	}

	render() {
		const { redirect } = this.state;
		if ( redirect ) {
	      return <Redirect to='/' />
	    }

		return (
			<div className="new-question">
			    <h2>Create New Question</h2>
				<form className="new-question__form" onSubmit={ this.handleSubmit }>
					<label htmlFor="option-one">Option One</label>
					<input id="option-one" type="text" value={ this.state.optionOneValue } onChange={ this.handleChange } />
					<label htmlFor="option-two">Option Two</label>
					<input id="option-two" type="text" value={ this.state.optionTwoValue } onChange={ this.handleChange } />
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
		currentUser: Object.values(currentUser).join('')
	}
}

export default connect(mapStateToProps)(NewQuestion);