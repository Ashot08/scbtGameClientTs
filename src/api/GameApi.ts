import BaseAPI from "./BaseApi.ts";


export interface CreateGameData {
  title: string,
  playersCount: number,
  moderator: number,
  authorization: string,
  moderatorMode: boolean
}

class GameAPI extends BaseAPI {
  constructor() {
    super('/game');
  }

  createGame(data: CreateGameData): Promise<unknown> {
    return this.http.post('/create', data);
  }

  logOut(): Promise<unknown> {
    return this.http.post('/logout');
  }

  read(id: number, token: string): Promise<unknown> {
    return this.http.get(`/game/${id}`, {authorization: `Bearer ${token}`});
  }

  getGamesByPlayerId(playerId:number, token: string): Promise<unknown> {
    return this.http.get(`/games/${playerId}`, {authorization: `Bearer ${token}`});
  }

  create = undefined;

  update = undefined;

  delete = undefined;
}

export default new GameAPI();
