import { useEffect, useState } from 'react';
import Player from '../entities/Player';
import { playersService } from '../services/PlayersService';
import { useAppSelector } from '../store/reduxHooks';
import { selectFavoritePlayers } from '../store/players';

const useSearch = () => {
  const [searchText, setSearchText] = useState('');
  const [res, setRes] = useState<Player[]>([]);
  const favoritePlayers = useAppSelector(selectFavoritePlayers);

  useEffect(() => {
    (async () => {
      if (!searchText) return;
      const players = (await playersService.search(searchText)).map((p) =>
        favoritePlayers.find((fp) => fp.id === p.id)
          ? { ...p, isFavorite: true }
          : p
      );
      setRes(players);
    })();
  }, [searchText, favoritePlayers]);

  return { search: setSearchText, searchText, players: res };
};

export default useSearch;
