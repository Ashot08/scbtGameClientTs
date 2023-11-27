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
