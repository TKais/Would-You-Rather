import React from 'react';
import { connect } from 'react-redux';
import QuestionList from './QuestionList';

class Home extends React.Component {
	render() {
		return (
			<div>
			    <div>
				    <h3>Unanswered Questions</h3>
					<QuestionList questions={this.props.unanswered} />
				</div>
				<div>
					<h3>Answered Questions</h3>
					<QuestionList questions={this.props.answered} />
				</div>
			</div>
		);
	}
}

function mapStateToProps({ questions }) {
	return {
		answered: questions,
		unsanswered: questions,
	}
}

export default connect(mapStateToProps)(Home);