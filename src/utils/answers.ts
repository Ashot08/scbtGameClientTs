import {GameState} from "../store/reducers/gameSlice.ts";

export const getLastRoll = (game: GameState) => {
  if(Array.isArray(game?.lastTurnRolls) && game.lastTurnRolls.length) {
    return game.lastTurnRolls.slice(-1)[0];
  }
  return null;
}

export const getLastRollAnswers = (game: GameState) => {
  const lastRoll = getLastRoll(game);
  if(!lastRoll) return [];

  const lastRollAnswers = [];

  if(Array.isArray(game.answers) && game.answers.length) {
    for (const answer of game.answers) {
      if(answer.roll_id === lastRoll.id) {
        lastRollAnswers.push(answer);
      }
    }
  }
  return lastRollAnswers;
}

export const getCurrentPlayerProcessAnswer = (game: GameState, playerId: number) => {
  let result = null;

  for(const answer of getLastRollAnswers(game)) {
    if(answer.status === 'in_process' && answer.player_id === playerId) {
      result = answer;
    }
  }
  return result;
}

export const getCurrentPlayerAnswer = (game: GameState, playerId: number) => {
  let result = null;

  for(const answer of getLastRollAnswers(game)) {
    if(answer.player_id === playerId) {
      result = answer;
    }
  }
  return result;
}

export const getLastRollMainAnswers = (game: GameState) => {
  const lastRollAnswers = getLastRollAnswers(game);
  const lastRollMainAnswers = [];
  for(const answer of lastRollAnswers) {
    if(answer.is_countable === 'false') {
      lastRollMainAnswers.push(answer);
    }
  }
  return lastRollMainAnswers;
}

export const getCurrentAnswer = (game: GameState) => {
  const lastRollMainAnswers = getLastRollMainAnswers(game);

  if(lastRollMainAnswers.length){
    return lastRollMainAnswers.slice(-1)[0];
  }
  return null;
}

export const getAnswersResults = (game: GameState) => {
  const result = [];

  for (const answer of game.answers) {
    if (answer.status === 'success') {
      if (!Array.isArray(result[answer.player_id])) {
        result[answer.player_id] = [];
      }
      if (!result[answer.player_id].includes(answer.id as never) && answer.is_countable === 'true') {
        result[answer.player_id].push(answer.id as never);
      }

    }
  }
  return result;
}

export const getTotalAnswersResults = (game: GameState) => {
  const result = [];

  for (const answer of game.answers) {
    if (answer.status === 'success') {
      if (!Array.isArray(result[answer.player_id])) {
        result[answer.player_id] = [];
      }
      if (!result[answer.player_id].includes(answer.id as never)) {
        result[answer.player_id].push(answer.id as never);
      }

    }
  }
  return result;
}

export const getAnswersResultsToGraph = (game: GameState) => {
  const result = [];

  for (const player of game.players) {

    const playerResult = {
      name: player.name || player.username,
      'Попытки': 0,
      'Баллы': 0,
    };

    for (const answer of game.answers) {
      if (answer.player_id === player.id
        && answer.is_countable === 'true') {

        if(answer.status === 'success') {
          playerResult['Попытки'] += 1;
          playerResult['Баллы'] += 1;
        } else {
          playerResult['Попытки'] += 1;
        }
      }
    }
    result.push(playerResult);
  }

  return result;
}

export const getTotalAnswersResultsToGraph = (game: GameState) => {
  const result = [];

  for (const player of game.players) {

    const playerResult = {
      name: player.name || player.username,
      'Попытки': 0,
      'Баллы': 0,
    };

    for (const answer of game.answers) {
      if (answer.player_id === player.id) {

        if(answer.status === 'success') {
          playerResult['Попытки'] += 1;
          playerResult['Баллы'] += 1;
        } else {
          playerResult['Попытки'] += 1;
        }
      }
    }
    result.push(playerResult);
  }
  return result;
}


// export const isAnswersModeActive = (game: GameState) => {
//   let isAnswersModeActive = false;
//   const currentAnswer = getCurrentAnswer(game);
//
//   if(currentAnswer && currentAnswer.status === 'in_process') {
//     isAnswersModeActive = true;
//   }
//   return isAnswersModeActive;
// }
