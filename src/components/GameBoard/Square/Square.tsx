import React from 'react';
import classNames from 'classnames';

import styles from './Square.scss';
import { SquareProps } from './Square.interface';
import Icon from '@components/Icon';

const Square = (props: SquareProps) => {
  const { index, isLight, piece, color, setSelected } = props;

  return (
    <div
      className={classNames(styles.wrapper, isLight ? styles.evenBackground : styles.oddBackground)}
      onClick={() => setSelected(piece)}>
      {piece && <Icon pieceIcon={piece.icon} />}
    </div>
  );
};

export default Square;
