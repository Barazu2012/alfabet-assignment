import playersSlice from './playersSlice';

export const playersReducer = playersSlice.reducer;
export const { togglePlayerFavorite } = playersSlice.actions;
export { fetchPlayers } from './playersThunks';
export * from './playersSelectors';
