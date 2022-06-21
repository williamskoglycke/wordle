/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { WordleRow } from './components/WordleRow';
import { spacing } from './constants';
import {
  ActionType,
  useSetWordleState,
  useWordleState,
} from './hooks/useWordleState';
import { GameOver } from './components/GameOver';
import { useCurrentGuessState } from './hooks/useCurrentGuessState';

export const Wordle = ({
  allowedNumberOfGuesses,
}: {
  allowedNumberOfGuesses: number;
}) => {
  const { gameOver, guesses, correctWord } = useWordleState();
  const setWordleState = useSetWordleState();
  const input = useCurrentGuessState();

  useEffect(() => {
    setWordleState({ type: ActionType.START_GAME });
  }, [setWordleState]);

  useEffect(() => {
    if (guesses.at(-1) === correctWord) {
      setWordleState({ type: ActionType.GAME_WON });
    }
    if (guesses.length === allowedNumberOfGuesses) {
      setWordleState({ type: ActionType.GAME_LOST });
    }
  }, [allowedNumberOfGuesses, correctWord, guesses, setWordleState]);

  return (
    <div
      style={{
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.SMALL,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: spacing.SMALL,
        }}
      >
        {[...Array(allowedNumberOfGuesses)].map((_, index) => {
          const guessedWord = guesses.at(index);
          const isCurrentGuess = guesses.length === index;
          return (
            <WordleRow
              key={index}
              isActive={isCurrentGuess}
              correctWord={correctWord}
              guessedWord={isCurrentGuess ? input : guessedWord}
              showStatus={!!guessedWord}
            />
          );
        })}
      </div>
      {gameOver && <GameOver />}
    </div>
  );
};
