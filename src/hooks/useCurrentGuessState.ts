import { useEffect, useState } from 'react';
import {
  ActionType,
  useSetWordleState,
  useWordleState,
} from './useWordleState';

export const useCurrentGuessState = () => {
  const [input, setInput] = useState('');
  const { gameOver } = useWordleState();
  const setWordleState = useSetWordleState();

  useEffect(() => {
    const handleEvent = (event: KeyboardEvent) => {
      const { key } = event;
      if (gameOver && key === 'Enter') {
        setWordleState({ type: ActionType.START_GAME });
      }
      if (gameOver) {
        return;
      }
      if (key === 'Backspace' && input) {
        setInput((prevState) => prevState.slice(0, -1));
      }
      if (key === 'Enter' && input.length === 5) {
        setWordleState({ type: ActionType.ADD_GUESS, payload: input });
        setInput('');
      }
      if (input.length === 5) {
        return;
      }
      if (key.match(/^[a-zA-Z]$/)) {
        setInput((prevState) => prevState + key.toUpperCase());
      }
    };
    window.addEventListener('keydown', handleEvent);
    return () => window.removeEventListener('keydown', handleEvent);
  }, [gameOver, input, setWordleState]);

  return input;
};
