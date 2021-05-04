import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import '../assets/css/navmenu.css';
import * as Logo from '../assets/images/logo.png';
import { setCurrentUser } from '../actions/currentUser';
import Snackbar from '@material-ui/core/Snackbar';


function NavMenu(props) {
	const [showError, setErrorState] = useState(false);

	function generateLogOutLink() {
	  if( props.currentUser !== null ) {
	    return <li><NavLink to='/' exact activeClassName='active logout'>Logout</NavLink></li>;
	  }
	}

	function currentUserIsDefined(route) {
	  if( props.currentUser !== null ) {
	    return route;
	  } else {
	    return '/';
	  }
	}

	function handleClick(event) {
	  const classes = Array.from(event.target.classList);
	  if(classes.indexOf('logout') > -1) {
	    props.dispatch(setCurrentUser(null));
	  }

	  handleState();
	}

	function handleState() {
	  const userState = props.currentUser === null;
	  setErrorState(userState);
	}

	function handleErrorMessageClose(event, reason) {
		if (reason === 'clickaway') {
			return;
		}

		setErrorState(false);
	}

	return (
		<nav className="navmenu">
			<ul className="navmenu__list" onClick={handleClick}>
				<li className="navmenu__list-logo"><NavLink to={currentUserIsDefined('/')} exact activeClassName='active home'><img src={ Logo } alt="Logo" /></NavLink></li>
					<li><NavLink to={currentUserIsDefined('/')} exact activeClassName='active home'>Home</NavLink></li>
					<li><NavLink to={currentUserIsDefined('/add')} activeClassName='active add'>New Question</NavLink></li>
					<li><NavLink to={currentUserIsDefined('/leaderboard')} activeClassName='active leaderboard'>Leaderboard</NavLink></li>
					{ generateLogOutLink() }
			</ul>
			<Snackbar
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				open={showError}
				autoHideDuration={3000}
				onClose={handleErrorMessageClose}
				ContentProps={{
					'aria-describedby': 'message-id',
				}}
				message={<span id="message-id">Please sign in before continuing</span>}
			/>
		</nav>
	);
}

function mapStateToProps({ currentUser }) {
  return {
    currentUser
  };
}

export default connect(mapStateToProps)(NavMenu);
