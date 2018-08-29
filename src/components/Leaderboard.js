import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Leaderboard extends React.Component {
	render() {
		if (  this.props.currentUser === null ) {
	      return <Redirect to='/' />
	    }

		return (
			<div>Leaderboard</div>
		);
	}
}

function mapStateToProps({ currentUser }) {
	return {
		currentUser: currentUser ? Object.values(currentUser).join('') : null
	}
}

export default connect(mapStateToProps)(Leaderboard);