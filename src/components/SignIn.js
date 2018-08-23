import React from 'react';
import { connect } from 'react-redux';
import { setCurrentUser } from '../actions/currentUser';
import { getUserData } from '../actions/shared';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class SignIn extends React.Component {

	state = {
		val: ''
	}

	handleChange = (e) => {
		const value = e.target.value;
		this.setState({ val: value });
	}

	handleClick = () => {
		const val = this.state.val;
		const id = val.toLowerCase().replace(/\s/g, '');
		this.props.dispatch(setCurrentUser(id));
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
			          {Object.keys(this.props.users).map( user => (
				          <MenuItem key={this.props.users[user].id} value={this.props.users[user].name}>
			                {this.props.users[user].name}
			              </MenuItem>
		              ))}
	              </TextField>
	              <Button
			        variant="contained"
			        color="primary"
			        className="signin__button"
			        onClick={this.handleClick}
			      >Sign In</Button>
				</Paper>
			</div>
		);
	}
}

function mapStateToProps({ users }) {
	return {
	    users
	}
}

export default connect(mapStateToProps)(SignIn);