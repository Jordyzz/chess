import React from 'react';
import classNames from 'classnames';

import iconsMap from './iconsMap';
import { IconProps } from './Icon.interface.d';
import styles from './Icon.scss';

function Icon(props: IconProps) {
  const { className, pieceIcon, type, onClick } = props;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: pieceIcon ? pieceIcon : iconsMap[type] }}
      className={classNames(styles.icon, className)}
      onClick={onClick}
    />
  );
}

export default Icon;
