import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import '../assets/css/app.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { getAllData } from '../actions/shared';
import { LoadingBar } from 'react-redux-loading';
import NavMenu from './NavMenu';
import Home from './Home';
import SignIn from './SignIn';
import CurrentUser from './CurrentUser';
import QuestionPage from './QuestionPage';
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';
import Error from './Error';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(getAllData());
  }

  configureRoutes() {
    if(this.props.currentUser !== null) {
      return <Route path='/' exact component={Home} />;
    } else {
      return <Route path='/' exact component={SignIn} />;
    }
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='main-app'>
            <NavMenu />
            <CurrentUser />
            { this.configureRoutes() }
            <Route path='/questions/:id' component={QuestionPage} />
            <Route path='/add' component={NewQuestion} />
            <Route path='/leaderboard' component={Leaderboard} />
            <Route path='/error' component={Error} />
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps ({ currentUser, users }) {
  return {
    loading: currentUser === null,
    currentUser,
    users
  }
}


export default connect(mapStateToProps)(App);
