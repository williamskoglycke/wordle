import React from 'react';
import { GameOverState } from '../types';
import {
  ActionType,
  useSetWordleState,
  useWordleState,
} from '../hooks/useWordleState';
import { spacing } from '../constants';

export const GameOver = () => {
  const { gameOver } = useWordleState();
  const setWordleState = useSetWordleState();
  return (
    <div
      style={{
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.SMALL,
      }}
    >
      <p style={{ margin: 'auto', width: 'fit-content' }}>{`You ${
        gameOver === GameOverState.WON ? 'WON!' : 'LOST!'
      }`}</p>
      <div
        style={{
          margin: 'auto',
        }}
      >
        <button
          type="button"
          onClick={() => setWordleState({ type: ActionType.START_GAME })}
        >
          Restart
        </button>
      </div>
    </div>
  );
};
