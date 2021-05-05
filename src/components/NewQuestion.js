import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../assets/css/newquestion.css';
import Button from '@material-ui/core/Button';
import { createQuestion } from '../actions/questions';

function NewQuestion(props) {
	const [optionOneText, setOptionOneText] = useState('');
	const [optionTwoText, setOptionTwoText] = useState('');
	const [redirect, shouldRedirect] = useState(false);

	useEffect(() => {
		if ( redirect || props.currentUser === null ) {
			return <Redirect to='/' />;
		}
	});

	function handleSubmit(event) {
	  event.preventDefault();
	  const question = { optionOneText, optionTwoText, author: props.currentUser };
	  if( optionOneText && optionTwoText ) {
	    props.dispatch(createQuestion(question));
			setOptionOneText('');
			setOptionTwoText('');
			shouldRedirect(true);
	  }
	}

	function handleChange(event) {
	  const value = event.target.value;
	  const id = event.target.id;
	  id === 'option-one' ? setOptionOneText(value) : setOptionTwoText(value);
	}

	return (
		<div className="new-question">
			<h2>Create New Question</h2>
			<p>Would You Rather...</p>
			<form className="new-question__form" onSubmit={ handleSubmit }>
				<label htmlFor="option-one">Option One</label>
				<input id="option-one" type="text" value={ optionOneText } onChange={ handleChange } />
				<label htmlFor="option-two">Option Two</label>
				<input id="option-two" type="text" value={ optionTwoText } onChange={ handleChange } />
				<Button
					variant="contained"
					type="submit"
					color="primary"
					className="new-question__form-button"
				>Submit</Button>
			</form>
		</div>
	);
}

function mapStateToProps({ currentUser }) {
  return {
    currentUser: currentUser ? Object.values(currentUser).join('') : null
  };
}

export default connect(mapStateToProps)(NewQuestion);
