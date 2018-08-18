import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getAllData } from '../actions/shared';
import { LoadingBar } from 'react-redux-loading';
import NavMenu from './NavMenu';
import Home from './Home';
import SignIn from './SignIn';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(getAllData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='main-app'>
            <NavMenu />
            <Route path='/' exact component={SignIn} />
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps ({ currentUser }) {
  return {
    loading: currentUser === null
  }
}


export default connect(mapStateToProps)(App);
