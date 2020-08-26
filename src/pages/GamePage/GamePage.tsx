import React from 'react';

import styles from './GamePage.scss';
import GameBoard from '@components/GameBoard';

function GamePage() {
  return (
    <div className={styles.wrapper}>
      <GameBoard />
    </div>
  );
}

export default GamePage;
