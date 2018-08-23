import React from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class QuestionList extends React.Component {
	render() {
		return (
			<div className="questionlist">
			    <ul className="questionlist__menu">
			        { Object.keys(this.props.questions).map( (question) => (
			        	<Question question={this.props.questions[question]} allQuestions={this.props.questions} listKey={this.props.questions[question].id} />
			        ))}
			    </ul>
			</div>
		)
	}
}

function mapStateToProps({ questions }) {
	return {
		questions
	}
}

export default connect(mapStateToProps)(QuestionList)