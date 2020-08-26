import React from 'react';
import { Router } from 'react-router';
import { Switch, Route, Redirect } from 'react-router-dom';

import history from '@core/history';
import MainPage from '@pages/MainPage';
import styles from './App.scss';
import ToastHandler from '@components/ToastHandler';
import GamePage from '@pages/GamePage/GamePage';
import RoomPage from '@pages/RoomPage';

function App() {
  return (
    <Router history={history}>
      <div className={styles.wrapper}>
        <ToastHandler />
        <div className={styles.content}>
          <Switch>
            <Route path="/home" component={MainPage} />
            <Route path="/chess/room" component={RoomPage} />
            <Route path="/chess/local" component={GamePage} />
            <Route path="/chess/online" component={GamePage} />
            <Redirect to="/home" />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
