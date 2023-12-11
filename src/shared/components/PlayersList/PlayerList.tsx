import { ReactNode, useMemo } from 'react';
import styled from 'styled-components';
import Player from '../../entities/Player';
import PlayerListItem from './PlayerListItem';

interface Props {
  players: Player[];
  onItemChange(player: Player): void;
  isLoading?: boolean;
  emptyListText?: string;
  children?: ReactNode;
}

export default function PlayerList({
  players,
  onItemChange,
  isLoading,
  emptyListText,
  children,
}: Readonly<Props>) {
  const Players = useMemo(
    () =>
      players.map((p) => (
        <PlayerListItem
          player={p}
          key={p.id}
          checked={p.isFavorite}
          onCheckboxChange={onItemChange}
        />
      )),
    [players, onItemChange]
  );

  const noPlayersText = isLoading
    ? 'Loading...'
    : emptyListText || 'No players';

  return (
    <Root>
      {players.length ? Players : <span>{noPlayersText}</span>}
      {children}
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  ${PlayerListItem.styled} {
    margin-bottom: 4px;
  }
`;
