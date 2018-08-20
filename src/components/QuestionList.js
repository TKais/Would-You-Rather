import React from 'react';
import { connect } from 'react-redux';

class QuestionList extends React.Component {
	render() {
		return (
			<div>Question</div>
		)
	}
}

export default connect()(QuestionList)