import React from 'react';

import styles from './PromotionMenu.scss';
import { PromotionMenuProps } from './PromotionMenu.interface';
import Icon from '@components/Icon';
import { pieceIcons } from '@src/utils/pieceIcons';
import { promotionPieces } from './utils/promotionPieces';

const PromotionMenu = (props: PromotionMenuProps) => {
  const { onSelectedPromotion, currentTurn } = props;
  return (
    <div className={styles.wrapper}>
      {promotionPieces.map(p => (
        <div key={p.id} className={styles.piece} onClick={() => onSelectedPromotion(p.name)}>
          <Icon pieceIcon={pieceIcons[currentTurn][p.id]} />
        </div>
      ))}
    </div>
  );
};

export default PromotionMenu;
