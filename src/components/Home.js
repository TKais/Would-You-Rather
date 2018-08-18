import React from 'react';
import { connect } from 'react-redux';

class Home extends React.Component {
	render() {
		return (
			<div>
			    Home
			</div>
		);
	}
}

function mapStateToProps({ currentUser }) {
	return {
		currentUser: Object.values(currentUser).join('')
	}
}

export default connect(mapStateToProps)(Home);