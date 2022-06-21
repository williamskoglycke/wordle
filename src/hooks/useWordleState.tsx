import React, {
  createContext,
  Dispatch,
  ReactNode,
  Reducer,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { GameOverState } from '../types';
import { fiveLetterWords } from '../fiveLetterWords';

export type WordleState = {
  guesses: string[];
  correctWord: string;
  gameOver: GameOverState | undefined;
};

const INITIAL_WORDLE_STATE: WordleState = {
  guesses: [],
  correctWord: '',
  gameOver: undefined,
};

export enum ActionType {
  START_GAME = 'START_GAME',
  ADD_GUESS = 'ADD_GUESS',
  GAME_WON = 'GAME_WON',
  GAME_LOST = 'GAME_LOST',
}

type StartGame = {
  type: ActionType.START_GAME;
};

type AddGuess = {
  type: ActionType.ADD_GUESS;
  payload: string;
};

type GameWon = {
  type: ActionType.GAME_WON;
};

type GameLost = {
  type: ActionType.GAME_LOST;
};

export type Action = StartGame | AddGuess | GameWon | GameLost;

const useWordleReducer = () =>
  useReducer<Reducer<WordleState, Action>>((prevState, action) => {
    switch (action.type) {
      case ActionType.ADD_GUESS: {
        return {
          ...prevState,
          guesses: [...prevState.guesses, action.payload],
        };
      }
      case ActionType.START_GAME: {
        const randomWord =
          fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)];
        console.log({ randomWord }); // Cheat!
        return { ...INITIAL_WORDLE_STATE, correctWord: randomWord };
      }
      case ActionType.GAME_WON:
        return { ...prevState, gameOver: GameOverState.WON };
      case ActionType.GAME_LOST:
        return { ...prevState, gameOver: GameOverState.LOST };
      default: {
        const exhaustiveCheck: never = action;
        throw new Error(`${exhaustiveCheck} is an unsupported type`);
      }
    }
  }, INITIAL_WORDLE_STATE);

type ContextType = {
  wordleState: WordleState;
  dispatch: Dispatch<Action>;
};
const WordleStateContext = createContext<ContextType | undefined>(undefined);

export const WordleStateProvider = ({ children }: { children: ReactNode }) => {
  const [wordleState, dispatch] = useWordleReducer();
  const value = useMemo(
    () => ({ wordleState, dispatch }),
    [dispatch, wordleState],
  );
  return (
    <WordleStateContext.Provider value={value}>
      {children}
    </WordleStateContext.Provider>
  );
};

export const useWordleState = () => {
  const context = useContext(WordleStateContext);
  if (!context) {
    throw new Error(`Must wrap Wordle in '<WordleStateProvider>'`);
  }
  return context.wordleState;
};

export const useSetWordleState = (): ContextType['dispatch'] => {
  const context = useContext(WordleStateContext);
  if (!context) {
    throw new Error(`Must wrap Wordle in '<WordleStateProvider>'`);
  }
  return context.dispatch;
};
