import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PlayerList from '../shared/components/PlayersList';
import Player from '../shared/entities/Player';
import {
  selectFavoritePlayers,
  togglePlayerFavorite,
} from '../shared/store/players';
import { useAppDispatch } from '../shared/store/reduxHooks';
import ColorPicker from './ColorPicker';

const DEFAULT_BG_COLOR = 'transparent';

export default function FavoritePlayers() {
  const [bgColor, setBgColor] = useState(DEFAULT_BG_COLOR);
  const players = useSelector(selectFavoritePlayers);
  const dispatch = useAppDispatch();

  const onItemChange = (player: Player) => {
    dispatch(togglePlayerFavorite(player));
  };

  return (
    <Root>
      <ColorPicker defaultColor={bgColor} onChange={setBgColor} />
      <PlayerList
        players={players}
        onItemChange={onItemChange}
        emptyListText="No favorite players"
      />
      <BG $bgColor={bgColor} />
    </Root>
  );
}

const Root = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px;
  ${ColorPicker.styled} {
    position: absolute !important;
    right: 16px;
    top: 16px;
    z-index: 1;
  }
`;

const BG = styled.div<{ $bgColor: string }>`
  position: absolute;
  inset: 0px;
  background-color: ${({ $bgColor }) => $bgColor};
  opacity: 0.5;
  z-index: -1;
  transition: background-color 100ms linear 0s;
`;
