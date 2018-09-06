import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ScoreCard from './ScoreCard';
import '../assets/css/leaderboard.css';

class Leaderboard extends React.Component {
	render() {
		if (  this.props.currentUser === null ) {
	      return <Redirect to={{
                pathname: '/error',
                state: { errorType: '401' }
            }} />
	    }

		return (
			<div className="leaderboard">
			    { this.props.sortedUsers.map( (user) => ( 
				    <ScoreCard user={this.props.users[user]} key={this.props.users[user].id} />
			    ))}
			</div>
		);
	}
}

function mapStateToProps({ currentUser, questions, users }) {
	return {
		currentUser: currentUser ? Object.values(currentUser).join('') : null,
		questions,
		sortedUsers: Object.keys(users).sort( (a,b) => (users[b].questions.length + Object.keys(users[b].answers).length) - (users[a].questions.length + Object.keys(users[a].answers).length)),
		users,
	}
}

export default connect(mapStateToProps)(Leaderboard);