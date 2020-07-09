import React, { useState, useEffect, useCallback } from 'react';

import styles from './MainPage.scss';
import GameBoard from '@components/GameBoard/GameBoard';

function MainPage() {
  return (
    <div className={styles.wrapper}>
      <GameBoard />
    </div>
  );
}

export default MainPage;
