import { createAsyncThunk } from '@reduxjs/toolkit';
import { playersService } from '../../services/PlayersService';

// const playersService = new PlayersService();
export const fetchPlayers = createAsyncThunk(
  'players/fetchPlayers',
  async () => {
    const res = await playersService.fetchNext();
    if (res instanceof Error) {
      console.error(res);
      return [];
    }
    return res;
  }
);

// export const fetchAllPlayers = createAsyncThunk(
//   'players/fetchAllPlayers',
//   async () => {
//     const res = await playersService.fetchAll();
//     if (res instanceof Error) {
//       console.error(res);
//       return [];
//     }
//     return res;
//   }
// );
