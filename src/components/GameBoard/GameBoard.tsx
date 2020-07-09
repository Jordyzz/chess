import React, { useEffect } from 'react';

import styles from './GameBoard.scss';
import Square from './Square';
import { useSelector } from '@redux/useSelector';
import { gameService } from '@core/GameService';

const GameBoard = () => {
  const { board } = useSelector(state => state.game);

  useEffect(() => {
    gameService.initBoard();
  }, []);

  const isEven = (num: number) => {
    return num % 2 === 0;
  };

  return (
    <div className={styles.wrapper}>
      {board.map((c, cIdx) =>
        c.map((r, rIdx) => {
          return (
            <Square
              key={r.index}
              index={r.index}
              isLight={(isEven(cIdx) && isEven(rIdx)) || (!isEven(cIdx) && !isEven(rIdx))}
              piece={r.piece}
            />
          );
        })
      )}
    </div>
  );
};

export default GameBoard;
