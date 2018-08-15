import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoadingBar from 'react-redux-loading';
import NavMenu from './NavMenu';
import Home from './Home';
import SignIn from './SignIn';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <div className='main-app'>
            <NavMenu />
            <Route path='/' exact component={SignIn} />
          </div>
        </Fragment>
      </Router>
    );
  }
}

// function mapStateToProps ({ authedUser }) {
//   return {
//     loading: authedUser === null
//   }
// }

export default App;
