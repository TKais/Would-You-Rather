import React from 'react';
import { connect } from 'react-redux';
import '../assets/css/currentuser.css';

function CurrentUser(props) {
  function getCurrentUser() {
    const user = props.currentUser;
    const loggedInUser = user !== null && Object.values(user).join('');
    const name = loggedInUser && props.users[loggedInUser].name;

    if( name ) {
      return `Welcome, ${name}!`;
    } else {
      return '';
    }
  }

  return (
    <div className="welcome">{ getCurrentUser() }</div>
  );
}

function mapStateToProps({ currentUser, users }) {
  return {
    currentUser,
    users,
  };
}

export default connect(mapStateToProps)(CurrentUser);
