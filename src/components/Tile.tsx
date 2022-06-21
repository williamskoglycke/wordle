import React from 'react';
import { Status } from '../types';
import { colors } from '../constants';

export interface TileProps {
  letter: string;
  status: Status;
  isActive: boolean;
}

export const Tile = ({ letter, status, isActive }: TileProps) => {
  return (
    <div
      style={{
        backgroundColor: {
          [Status.MATCH]: colors.SUCCESS,
          [Status.IN_WORD]: colors.IN_WORD,
          [Status.WRONG]: colors.BACKGROUND,
          [Status.NOT_SUBMITTED]: colors.BACKGROUND,
        }[status],
        width: isActive ? '85px' : '80px',
        height: isActive ? '85px' : '80px',
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontSize: '40px',
          alignSelf: 'center',
          height: 'fit-content',
          textTransform: 'capitalize',
        }}
      >
        {letter}
      </span>
    </div>
  );
};
