import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import '../assets/css/app.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoadingBar from 'react-redux-loading';
import { getAllData } from '../actions/shared';
import NavMenu from './NavMenu';
import Home from './Home';
import SignIn from './SignIn';
import CurrentUser from './CurrentUser';
import QuestionPage from './QuestionPage';
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';
import Error from './Error';

function App(props) {
  useEffect(() => {
    props.dispatch(getAllData());
  });

  function configureRoutes() {
    if(props.currentUser !== null) {
      return <Route path='/' exact component={Home} />;
    } else {
      return <Route path='/' exact component={SignIn} />;
    }
  }

  return (
    <Router>
      <div className='main-app'>
        <NavMenu />
        <CurrentUser />
        <LoadingBar className="main-app__loading-bar" />
        <div className="main-app__container">
          <Switch>
            { configureRoutes() }
            <Route path='/questions/:id' component={QuestionPage} />
            <Route path='/add' component={NewQuestion} />
            <Route path='/leaderboard' component={Leaderboard} />
            <Route component={Error} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

function mapStateToProps ({ currentUser, users }) {
  return {
    currentUser,
    users
  };
}


export default connect(mapStateToProps)(App);
