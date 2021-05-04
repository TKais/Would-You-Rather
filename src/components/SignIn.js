import React, { useState } from 'react';
import { connect } from 'react-redux';
import '../assets/css/signin.css';
import { setCurrentUser } from '../actions/currentUser';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function SignIn(props) {
	const [val, setVal] = useState('');

	function handleChange(e) {
	  const value = e.target.value;
	  setVal(value);
	}

	function handleClick() {
	  const id = val.toLowerCase().replace(/\s/g, '');
	  if(val) {
	    props.dispatch(setCurrentUser(id));
	  }
	}

	return (
		<div className="signin">
			<Paper className="signin__body" elevation={1}>
				<Typography variant="headline" component="h3" className="signin__header">
						Sign In
				</Typography>
				<TextField
					id="select-username"
					select
					className="signin__select"
					label="Select Username"
					value={val}
					onChange={handleChange}
					margin="normal"
				>
					{Object.keys(props.users).map( user => (
						<MenuItem key={props.users[user].id} value={props.users[user].name}>
							{props.users[user].name}
						</MenuItem>
					))}
				</TextField>
				<Button
					variant="contained"
					color="primary"
					className="signin__button"
					onClick={handleClick}
				>Enter</Button>
			</Paper>
		</div>
	);
}

function mapStateToProps({ users }) {
  return {
		users
  };
}

export default connect(mapStateToProps)(SignIn);
