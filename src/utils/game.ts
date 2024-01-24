import {GameState} from "../store/reducers/gameSlice.ts";

export const getActivePlayer = (game: GameState) => {
  if(game) {
    if(Array.isArray(game.turns) && Array.isArray(game.players) && game.turns.length && game.players.length) {
      const lastTurn = getLastTurn(game);
      return game.players.find((el) => {return el.id === lastTurn.player_id});
    }
    if(Array.isArray(game.turns) && Array.isArray(game.players) && game.players.length) {
      return game.players[0];
    }
  }
  return {name: '-'};
}

export const getLastTurn = (game: GameState) => {
  return game.turns.slice(-1)[0];
}

export const getCurrentPlayerState = (playersState: any, playerId: number) => {
  let currentPlayer = [];
  if(Array.isArray(playersState)) {
    for(const p of playersState) {
      if(p.player_id === playerId) {
        currentPlayer = p;
        break;
      }
    }
  }
  return currentPlayer;
}
