import Player, { ApiPlayer } from '../entities/Player';

const BASE_URL = 'https://www.balldontlie.io/api/v1/players';

interface FetchMeta {
  total_pages: number;
  current_page: number;
  next_page: number;
  per_page: number;
  total_count: number;
}

interface ApiRes {
  data: ApiPlayer[];
  meta: FetchMeta;
}

const mapToAppPlayers = (apiPlayers: ApiPlayer[]): Player[] =>
  apiPlayers.map(({ id, first_name, last_name }) => ({
    id,
    fullName: `${first_name} ${last_name}`,
    isFavorite: false,
  }));

class PlayersService {
  private fetchMeta: FetchMeta | undefined;
  private isLoading = false;

  async fetchNext(): Promise<Player[] | Error> {
    try {
      const noMorePlayers =
        Number.isInteger(this.fetchMeta?.current_page) &&
        this.fetchMeta?.current_page === this.fetchMeta?.total_pages;

      if (noMorePlayers || this.isLoading) return [];

      this.isLoading = true;
      const res = await fetch(
        `${BASE_URL}?page=${this.fetchMeta?.next_page || 0}`
      );
      const parsedRes: ApiRes = await res.json();

      this.fetchMeta = parsedRes.meta;
      this.isLoading = false;

      return mapToAppPlayers(parsedRes.data);
    } catch (err: any) {
      return new Error(err);
    }
  }

  async search(text: string) {
    const res = await fetch(`${BASE_URL}?search=${text}`);
    const parsedRes: ApiRes = await res.json();
    return mapToAppPlayers(parsedRes.data);
  }
}

export const playersService = new PlayersService();
