import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../store';

const selectAllPlayers = (state: AppState) => state.players;

export const selectLoading = (state: AppState) => state.loading;

export const selectFavoritePlayers = createSelector(
  selectAllPlayers,
  (allPlayers) => allPlayers.filter((p) => p.isFavorite)
);

export const selectNonFavoritePlayers = createSelector(
  selectAllPlayers,
  (allPlayers) => allPlayers.filter((p) => !p.isFavorite)
);
