import GameApi, {CreateGameData} from "../api/GameApi.ts";

class GameController {

  async createGame(payload: CreateGameData) {
    try {
      //return res.status(400).json({ message: 'Ошибка при валидации данных', validationErrors });
      const response: any = await GameApi.createGame(payload);

      if(response.validationErrors){
        return {token: null, text: 'Create Game error', status: 'error', errors: response.validationErrors.errors}
      }

      if(response.result.lastID) {
        return { game_id: response.result.lastID, text: response.message, status: 'success'}
      }
      return {text: 'Registration error', status: 'error'}
    } catch (e) {
      return {text: 'Registration error', status: 'error'}
    }
  }

}

export default new GameController();
