import React from 'react';
import { connect } from 'react-redux';
import '../assets/css/currentuser.css';

class CurrentUser extends React.Component {
	getCurrentUser() {
		const user = this.props.currentUser;
		const loggedInUser = user !== null && Object.values(user).join('');
		const name = loggedInUser && this.props.users[loggedInUser].name;

		if( name ) {
			return `Welcome, ${name}!`;
		} else {
			return '';
		}
	}

	render() {
		return (
			<div className="welcome">{ this.getCurrentUser() }</div>
		);
	}
}

function mapStateToProps({ currentUser, users }) {
	return {
		currentUser,
		users,
	}
}

export default connect(mapStateToProps)(CurrentUser)