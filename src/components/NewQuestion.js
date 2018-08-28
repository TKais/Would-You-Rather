import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class NewQuestion extends React.Component {
	render() {
		return (
			<div>New Question</div>
		)
	}
}

export default connect()(NewQuestion);