import React, { useMemo, useState } from 'react';
import io from 'socket.io-client';

import styles from './RoomPage.scss';
import history from '@core/history';
import { dispatch } from '@redux/store';
import { setPlayer, updateGameState } from '@redux/game';
import { GameState } from '@redux/redux.interface';
import { pieceFactory } from '@core/Pieces/PieceFactory';
import { pieceIds } from '@src/utils/pieceIds';

function RoomPage() {
  const [messages, setMessages] = useState([]);
  const socket = useMemo(() => io(), []);

  socket.on('connect', () => {
    setMessages(["You've joined a room", 'Finding opponent...']);
  });

  socket.on('disconnect', () => {
    console.log(socket.connected); // false
  });

  socket.on('gameUpdated', (data: GameState) => {
    data.board = data.board.map(square => {
      if (square) {
        return pieceFactory.createPiece(pieceIds[square.pieceId], square.player, square.position);
      }

      return null;
    });

    data.player1.alive = data.player1.alive.map(piece => {
      return pieceFactory.createPiece(pieceIds[piece.pieceId], piece.player, piece.position);
    });
    data.player1.graveyard = data.player1.graveyard.map(piece => {
      return pieceFactory.createPiece(pieceIds[piece.pieceId], piece.player, piece.position);
    });
    data.player2.alive = data.player2.alive.map(piece => {
      return pieceFactory.createPiece(pieceIds[piece.pieceId], piece.player, piece.position);
    });
    data.player2.graveyard = data.player2.graveyard.map(piece => {
      return pieceFactory.createPiece(pieceIds[piece.pieceId], piece.player, piece.position);
    });
    console.log('board updated!', data);

    dispatch(updateGameState(data));
  });

  socket.on('initGame', (id, room) => {
    dispatch(setPlayer({ socket, id, room }));
    history.push('/chess/online');
  });

  return <div className={styles.wrapper}>{...messages}</div>;
}

export default RoomPage;
