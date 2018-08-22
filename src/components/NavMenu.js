import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setCurrentUser } from '../actions/currentUser';


class NavMenu extends React.Component {
	constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
	}

	generateLogOutLink() {
		if( this.props.currentUser !== null ) {
			return <li><NavLink to='/' exact activeClassName='active logout'>Logout</NavLink></li>;
		}
	}

	currentUserIsDefined( route ) {
		if( this.props.currentUser !== null ) {
			return route;
		} else {
			return '/';
		}
	}

	handleClick( event ) {
		const classes = Array.from(event.target.classList);
		if(classes.indexOf('logout') > -1) {
			this.props.dispatch(setCurrentUser(null));
		}
	}

	render() {
		return (
			<nav className="navmenu">
			    <ul className="navmenu__list" onClick={this.handleClick}>
			        <li><NavLink to={this.currentUserIsDefined('/')} exact activeClassName='active home'>Home</NavLink></li>
			        <li><NavLink to={this.currentUserIsDefined('/new')} activeClassName='active new'>New Question</NavLink></li>
			        <li><NavLink to={this.currentUserIsDefined('/leaderboard')} activeClassName='active leaderboard'>Leaderboard</NavLink></li>
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