import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Player from '../../entities/Player';
import { fetchPlayers } from './playersThunks';

interface PlayersState {
  players: Player[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: PlayersState = {
  players: [],
  loading: 'idle',
};

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    togglePlayerFavorite: (
      state,
      { payload: player }: PayloadAction<Player>
    ) => {
      const existingPlayer = state.players.find((p) => p.id === player.id);
      if (!existingPlayer) {
        state.players.push({ ...player, isFavorite: !player.isFavorite });
      } else {
        existingPlayer.isFavorite = !player.isFavorite;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlayers.fulfilled, (state, { payload: players }) => {
      if (!players.length) return;
      state.players = [...state.players, ...players];
      state.loading = 'succeeded';
    });
    builder.addCase(fetchPlayers.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(fetchPlayers.rejected, (state) => {
      state.loading = 'failed';
    });
  },
});

export default playersSlice;
