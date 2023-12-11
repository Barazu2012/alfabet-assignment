import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PlayerList from '../shared/components/PlayersList';
import Player from '../shared/entities/Player';
import {
  selectLoading,
  selectNonFavoritePlayers,
  togglePlayerFavorite,
} from '../shared/store/players';
import { useAppDispatch } from '../shared/store/reduxHooks';
import SearchInput from './SearchInput';
import { fetchPlayers } from '../shared/store/players';
import Button from '@mui/joy/Button';
import useSearch from '../shared/hooks/useSearch';

export default function AllPlayers() {
  const dispatch = useAppDispatch();
  const nonFavoritePlayers = useSelector(selectNonFavoritePlayers);
  const loading = useSelector(selectLoading);
  const { search, searchText, players: searchPlayers } = useSearch();

  const loadPlayers = useCallback(() => dispatch(fetchPlayers()), [dispatch]);

  useEffect(() => {
    loadPlayers();
  }, [loadPlayers]);

  const visiblePlayers = searchText ? searchPlayers : nonFavoritePlayers;

  const onItemChange = (player: Player) => {
    dispatch(togglePlayerFavorite(player));
    if (searchText) {
      search('');
    }
  };

  const isLoading = loading === 'pending';
  return (
    <Root>
      <SearchInput
        onChange={search}
        value={searchText}
        placeholder="Search player..."
      />
      <PlayerList
        players={visiblePlayers}
        onItemChange={onItemChange}
        isLoading={isLoading}
      >
        {!!visiblePlayers.length && !searchText && (
          <LoadMoreButton
            variant="plain"
            onClick={loadPlayers}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </LoadMoreButton>
        )}
      </PlayerList>
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-right: 1px solid #363636;
  ${SearchInput.styled} {
    margin-bottom: 16px;
  }
`;

const LoadMoreButton = styled(Button)`
  width: 128px;
  align-self: center;
`;
