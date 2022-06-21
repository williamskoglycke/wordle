import { evaluateGuess } from './evaluateGuess';
import { Status } from './types';

describe('evaluateWord', () => {
  it('all characters are wrong', () => {
    const result = evaluateGuess({
      guessedWord: 'abcde',
      correctWord: 'fghij',
    });
    expect(result.at(0)).toEqual({ letter: 'a', status: Status.WRONG });
    expect(result.at(1)).toEqual({ letter: 'b', status: Status.WRONG });
    expect(result.at(2)).toEqual({ letter: 'c', status: Status.WRONG });
    expect(result.at(3)).toEqual({ letter: 'd', status: Status.WRONG });
    expect(result.at(4)).toEqual({ letter: 'e', status: Status.WRONG });
  });

  it('all characters are correct', () => {
    const result = evaluateGuess({
      guessedWord: 'hello',
      correctWord: 'hello',
    });
    expect(result.at(0)).toEqual({ letter: 'h', status: Status.MATCH });
    expect(result.at(1)).toEqual({ letter: 'e', status: Status.MATCH });
    expect(result.at(2)).toEqual({ letter: 'l', status: Status.MATCH });
    expect(result.at(3)).toEqual({ letter: 'l', status: Status.MATCH });
    expect(result.at(4)).toEqual({ letter: 'o', status: Status.MATCH });
  });

  it('All "L"s, should return two MATCH and three WRONG', () => {
    const result = evaluateGuess({
      guessedWord: 'lllll',
      correctWord: 'hello',
    });
    expect(result.at(0)).toEqual({ letter: 'l', status: Status.WRONG });
    expect(result.at(1)).toEqual({ letter: 'l', status: Status.WRONG });
    expect(result.at(2)).toEqual({ letter: 'l', status: Status.MATCH });
    expect(result.at(3)).toEqual({ letter: 'l', status: Status.MATCH });
    expect(result.at(4)).toEqual({ letter: 'l', status: Status.WRONG });
  });

  it('Two "L"s, should return two IN_WORD and three WRONG', () => {
    const result = evaluateGuess({
      guessedWord: 'llabc',
      correctWord: 'hello',
    });
    expect(result.at(0)).toEqual({ letter: 'l', status: Status.IN_WORD });
    expect(result.at(1)).toEqual({ letter: 'l', status: Status.IN_WORD });
    expect(result.at(2)).toEqual({ letter: 'a', status: Status.WRONG });
    expect(result.at(3)).toEqual({ letter: 'b', status: Status.WRONG });
    expect(result.at(4)).toEqual({ letter: 'c', status: Status.WRONG });
  });

  it('Three "L"s, only one in the correct place, should return one MATCH and one IN_WORD', () => {
    const result = evaluateGuess({
      guessedWord: 'allcl',
      correctWord: 'hello',
    });
    expect(result.at(0)).toEqual({ letter: 'a', status: Status.WRONG });
    expect(result.at(1)).toEqual({ letter: 'l', status: Status.IN_WORD });
    expect(result.at(2)).toEqual({ letter: 'l', status: Status.MATCH });
    expect(result.at(3)).toEqual({ letter: 'c', status: Status.WRONG });
    expect(result.at(4)).toEqual({ letter: 'l', status: Status.WRONG });
  });
});
