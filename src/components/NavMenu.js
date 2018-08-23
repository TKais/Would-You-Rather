import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setCurrentUser } from '../actions/currentUser';
import Snackbar from '@material-ui/core/Snackbar';


class NavMenu extends React.Component {
	state = {
		showError : false
	}

	constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
		this.handleState = this.handleState.bind(this);
		this.handleErrorMessageClose = this.handleErrorMessageClose.bind(this);
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

		this.handleState();
	}

	handleState() {
		const userState = this.props.currentUser === null;
		this.setState({ showError : userState });
	}

	handleErrorMessageClose(event, reason) {
	    if (reason === 'clickaway') {
	      return;
	    }

	    this.setState({ showError: false });
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
			    <Snackbar
		          anchorOrigin={{
		            vertical: 'top',
		            horizontal: 'center',
		          }}
		          open={this.state.showError}
		          autoHideDuration={3000}
		          onClose={this.handleErrorMessageClose}
		          ContentProps={{
		            'aria-describedby': 'message-id',
		          }}
		          message={<span id="message-id">Please sign in before continuing</span>}
		        />
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