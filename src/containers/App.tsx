import React from 'react';
import { Router } from 'react-router';
import { Switch, Route, Redirect } from 'react-router-dom';

import history from '@core/history';
import MainPage from '@pages/MainPage';
import styles from './App.scss';
import ToastHandler from '@components/ToastHandler';

function App() {
  return (
    <Router history={history}>
      <div className={styles.wrapper}>
        <ToastHandler />
        <div className={styles.content}>
          <Switch>
            <Route path="/home" component={MainPage} />
            <Redirect to="/home" />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
