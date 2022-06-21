/* eslint-disable react/no-array-index-key */
import React, { useMemo } from 'react';
import { spacing } from '../constants';
import { Tile } from './Tile';
import { Status } from '../types';
import { evaluateGuess } from '../evaluateGuess';
import { useWordleState } from '../hooks/useWordleState';

interface Props {
  correctWord: string;
  guessedWord: string | undefined;
  showStatus: boolean;
  isActive: boolean;
}

export const WordleRow = ({
  correctWord,
  guessedWord,
  showStatus,
  isActive,
}: Props) => {
  const { gameOver } = useWordleState();
  const guessedLetters = useMemo(() => {
    if (!guessedWord || !showStatus) {
      return [...correctWord].map((_, index) => {
        const letter = guessedWord?.at(index);
        return { letter: letter || '', status: Status.NOT_SUBMITTED };
      });
    }
    return evaluateGuess({ guessedWord, correctWord });
  }, [correctWord, guessedWord, showStatus]);

  return (
    <div
      style={{
        margin: 'auto',
        maxWidth: '500px',
        display: 'flex',
        gap: spacing.SMALL,
      }}
    >
      {guessedLetters.map(({ letter, status }, index) => (
        <Tile
          isActive={isActive && !gameOver}
          letter={letter}
          status={status}
          key={index}
        />
      ))}
    </div>
  );
};
