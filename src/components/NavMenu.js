import React from 'react';
import { NavLink } from 'react-router-dom';


function NavMenu() {
	return (
		<nav className="navmenu">
		    <ul className="navmenu__list">
		        <li><NavLink to='/' exact activeClassName='active'>Home</NavLink></li>
		        <li><NavLink to='/new' activeClassName='active'>New Question</NavLink></li>
		        <li><NavLink to='/leaderboard' activeClassName='active'>Leaderboard</NavLink></li>
		        <li><NavLink to='/' exact activeClassName='active'>Logout</NavLink></li>
		    </ul>
		</nav>
	);
}

export default NavMenu;