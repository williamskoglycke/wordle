import { Status } from './types';

export interface Props {
  guessedWord: string;
  correctWord: string;
}

export type ReturnType = {
  letter: string;
  status: Status;
};

export const evaluateGuess = ({
  guessedWord,
  correctWord,
}: Props): ReturnType[] => {
  const correctLetters: string[] = [...correctWord];
  const guessedLetterObjects = [...guessedWord].map((letter) => ({
    letter,
    status: Status.WRONG,
  }));

  const checkedIndexes: number[] = [];

  const matchedLetters = guessedLetterObjects.map((letterObj, index) => {
    const { letter } = letterObj;
    if (letter === correctLetters.at(index)) {
      checkedIndexes.push(index);
      return { letter, status: Status.MATCH };
    }
    return letterObj;
  });

  return matchedLetters.map((letterObj) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < correctLetters.length; i++) {
      const letter = correctLetters.at(i);
      if (letter === letterObj.letter && !checkedIndexes.includes(i)) {
        checkedIndexes.push(i);
        return { letter: letterObj.letter, status: Status.IN_WORD };
      }
    }
    return letterObj;
  });
};
