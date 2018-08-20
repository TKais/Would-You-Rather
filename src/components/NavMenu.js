import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';


class NavMenu extends React.Component {
	generateLogOutLink() {
		if( this.props.currentUser !== null ) {
			return <li><NavLink to='/' exact activeClassName='active'>Logout</NavLink></li>;
		}
	}

	render() {
		return (
			<nav className="navmenu">
			    <ul className="navmenu__list">
			        <li><NavLink to='/' exact activeClassName='active'>Home</NavLink></li>
			        <li><NavLink to='/new' activeClassName='active'>New Question</NavLink></li>
			        <li><NavLink to='/leaderboard' activeClassName='active'>Leaderboard</NavLink></li>
			        { this.generateLogOutLink() }
			    </ul>
			</nav>
		);
	}
}

function mapStateToProps({ currentUser }) {
	return {
		currentUser
	}
}

export default connect(mapStateToProps)(NavMenu);