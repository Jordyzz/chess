import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

import styles from './MainPage.scss';

function MainPage() {
  return (
    <div className={styles.wrapper}>
      <Link to="/chess/local">
        <button className={styles.menuButton}>Play Local</button>
      </Link>
      <Link to="/chess/room">
        <button className={styles.menuButton}>Find Online Match</button>
      </Link>
    </div>
  );
}

export default MainPage;
