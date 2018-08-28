import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../assets/css/newquestion.css';

class NewQuestion extends React.Component {
	state = {
		optionOneValue: '',
		optionTwoValue: '',
	}

	handleSubmit (event) {
		console.log('EVENT--->', event);
	}

	render() {
		return (
			<div className="new-question">
			    <h2>Create New Question</h2>
				<form className="new-question__form" onSubmit={ this.handleSubmit }>
					<label for="option-one">Option One</label>
					<input id="option-one" type="text" value={ this.state.optionOneValue } />
					<label for="option-two">Option Two</label>
					<input id="option-two" type="text" value={ this.state.optionTwoValue } />
				</form>
			</div>
		)
	}
}

export default connect()(NewQuestion);