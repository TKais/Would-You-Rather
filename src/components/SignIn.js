import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// TODO: Get data passed down from App.js
const names = [{ name: 'tiff'}, {name: 'ale'}, { name: 'inna'}];

class SignIn extends React.Component {

	state = {
		val: ''
	}

	handleChange = (e) => {
		const value = e.target.value;
		this.setState({ val: value });
	}

	render() {
		return (
			<div className="signin">
				<Paper elevation={1}>
				  <Typography variant="headline" component="h3" className="signin__header">
		            Sign In
		          </Typography>
		          <TextField
			          id="select-username"
			          select
			          className="signin__select"
			          label="Select Username"
			          value={this.state.val}
			          onChange={this.handleChange}
			          margin="normal"
			      >
			          {names.map( option => (
				          <MenuItem key={option.name} value={option.name}>
			                {option.name}
			              </MenuItem>
		              ))}
	              </TextField>
	              <Button
			        variant="contained"
			        color="primary"
			        className="signin__button"
			      >Sign In</Button>
				</Paper>
			</div>
		);
	}
}

export default SignIn;