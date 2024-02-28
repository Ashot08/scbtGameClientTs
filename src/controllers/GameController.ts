import GameApi, {CreateGameData} from "../api/GameApi.ts";
import Token from "../utils/Token.ts";

class GameController {

  async createGame(payload: CreateGameData) {
    try {
      //return res.status(400).json({ message: 'Ошибка при валидации данных', validationErrors });
      const response: any = await GameApi.createGame(payload);

      if(response?.validationErrors){
        return {token: null, text: 'Create Game error', status: 'error', errors: response.validationErrors.errors}
      }

      if(response?.result.lastID) {
        return { game_id: response.result.lastID, text: response.message, status: 'success'}
      }
      return {text: 'Registration error', status: 'error'}
    } catch (e) {
      console.log('E ', e, ' E')
      return {text: 'Registration error', status: 'error',}
    }
  }

  async getGameState() {
    try {
      return {text: 'Registration error', status: 'error'}
    } catch (e) {
      return {text: 'Registration error', status: 'error'}
    }
  }

  async getGamesByPlayerId (playerId: number) {

    const token = Token.getToken();

    if(token.token) {
      const response = await GameApi.getGamesByPlayerId(playerId, token.token);
      console.log(response);
      return {message: 'Get Games Success', status: 'success', games: response};
    }
    return {message: 'Get Games Error', status: 'error'};

  }

}

export default new GameController();
