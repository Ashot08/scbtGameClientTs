import {GameState} from "../store/reducers/gameSlice.ts";
import {getTotalAnswersResults} from "./answers.ts";

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
  console.log('HUI')
  return {name: '-', id: null};
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

export const getAvailableWorkers = (playerState: any) => {
  const aliveCount = playerState.workers_alive;
  const usedWorkersCount = playerState.workers_positions_scheme.split(',').filter((w: any) => w !== '0').length;
  return aliveCount - usedWorkersCount;
}

export const getWorkerDataByIndex = (playerState: any, workerIndex: number) => {
  const notActiveDefendsArray = playerState.not_active_defends_scheme.split(',');
  const activeDefendsArray = playerState.active_defends_scheme.split(',');
  const workersPositionsArray = playerState.workers_positions_scheme.split(',');

  return {
    notActiveDefends: +notActiveDefendsArray[workerIndex],
    activeDefends: +activeDefendsArray[workerIndex],
    workerIsSet: +workersPositionsArray[workerIndex],
  }
}

export const getWorkersUsedOnFieldsCount = (playerState: any) => {
  const usedWorkersCount = playerState.workers_positions_scheme.split(',').filter((w: any) => w !== '0').length;
  return usedWorkersCount;
}

export const isNextTurnAvailable = (playerState: any) => {
  return (
    playerState.no_more_rolls === 'true' &&
    playerState.questions_to_next_worker_count === 0 &&
    playerState.questions_without_def_count === 0 &&
    playerState.questions_to_active_def_count === 0 &&
    playerState.next_worker_index <= playerState.active_worker
  );
}

export const isGetQuestionAvailable = (playerState: any) => {
  return (
    playerState.questions_to_next_worker_count > 0 ||
    playerState.questions_without_def_count > 0 ||
    playerState.questions_to_active_def_count > 0
  );
}

export const isNextWorkerAvailable = (playerState: any) => {
  return (
    playerState.no_more_rolls === 'false' &&
    playerState.questions_to_next_worker_count === 0 &&
    playerState.questions_without_def_count === 0 &&
    playerState.questions_to_active_def_count <= 0 &&
    playerState.next_worker_index > 0
  );
}

export const getQuestionsCountInfo = (playerState: any) => {
  let subject = '';
  let count = 0;
  if(playerState.questions_to_active_def_count > 0) {
    subject = 'Вопросы для активации защит: ';
    count = playerState.questions_to_active_def_count;
  } else if(playerState.questions_without_def_count > 0) {
    subject = 'Ответы без права на ошибку: ';
    count = playerState.questions_without_def_count;
  } else if(playerState.questions_to_next_worker_count > 0) {
    subject = 'Вопросы для соседнего рабочего (групповой НС): ';
    count = playerState.questions_to_next_worker_count;
  }
  return {
    subject,
    count,
  }
}

export const getActiveDefendsCount = (
  playerState: any,
  workerIndex: number,
) => {
  const activeDefendsArray = playerState.active_defends_scheme.split(',');
  return +activeDefendsArray[workerIndex];
};

export const getPlayerNameById = (id: number, game: GameState) => {
  for(const p of game.players) {
    if(p.id === id) {
      return p.name || p.username;
    }
  }
}

export const getPlayersTotalMoneyAndDefsTable = (game: GameState) => {
  const resultsTable = [];
  for (const p of game.playersState) {
    const playerResults = {
      name: getPlayerNameById(p.player_id, game),
      'Деньги': p.money,
      'Активные защиты': 0,
      'Итого': 0
    }
    for(let i = 0; i < 6; i++) {
      playerResults['Активные защиты'] += getActiveDefendsCount(p, i);
    }
    playerResults['Итого'] = playerResults['Активные защиты'] + playerResults['Деньги']
    resultsTable.push(playerResults);
  }

  return resultsTable.sort((p1, p2) => {return p2['Итого'] - p1['Итого']});
}

export const getPlayersTotalMoneyDefsAnswersTable = (game: GameState) => {
  const answersResult = getTotalAnswersResults(game);
  const sortedByAnswersCountPlayers = [...game.players].sort((p1: any, p2: any) => {
    return +answersResult[p2.id]?.length - +answersResult[p1.id]?.length;
  });
  const places: any = [];

  for(let i = 0; i < sortedByAnswersCountPlayers.length; i++) {

    if(i === 0) {
      // sortedByAnswersCountPlayers[i]['place'] = 1;
      places.push({
          player_id: sortedByAnswersCountPlayers[i].id,
          place: 1,
        });
    } else {
      if(answersResult[sortedByAnswersCountPlayers[i].id].length === answersResult[sortedByAnswersCountPlayers[i - 1].id].length) {
        // sortedByAnswersCountPlayers[i]['place'] = sortedByAnswersCountPlayers[i - 1]['place'];
        places.push({
          player_id: sortedByAnswersCountPlayers[i].id,
          place: places[i - 1]['place'],
        });
      } else {
        // sortedByAnswersCountPlayers[i]['place'] = sortedByAnswersCountPlayers[i - 1]['place'] + 1;
        places.push({
          player_id: sortedByAnswersCountPlayers[i].id,
          place: places[i - 1]['place'] + 1,
        });
      }
    }
  }

  const resultsTable = [];
  for (const p of game.playersState) {
    const playerResults = {
      name: getPlayerNameById(p.player_id, game),
      'Деньги': +p.money,
      'Активные защиты': 0,
      'Деньги + защиты': p.money,
      'Доп. баллы за ответы': 0,
      'Итого': 0
    }
    for(let i = 0; i < 6; i++) {
      playerResults['Активные защиты'] += getActiveDefendsCount(p, i);
    }
    console.log('places', places)
    for(const player of places) {
      if(+p.player_id === +player.player_id) {
        if(player.place === 1) {
          playerResults['Доп. баллы за ответы'] = 5;
        } else if(player.place === 2) {
          playerResults['Доп. баллы за ответы'] = 3;
        } else if(player.place === 3) {
          playerResults['Доп. баллы за ответы'] = 1;
        }
      }
    }

    if(+p.player_id === +sortedByAnswersCountPlayers[0].id) {
      playerResults['Доп. баллы за ответы'] = 5;
    } else if(+p.player_id === +sortedByAnswersCountPlayers[1].id) {
      playerResults['Доп. баллы за ответы'] = 3;
    } else if(+p.player_id === +sortedByAnswersCountPlayers[2].id) {
      playerResults['Доп. баллы за ответы'] = 1;
    }

    playerResults['Деньги + защиты'] = playerResults['Активные защиты'] + playerResults['Деньги'];
    playerResults['Итого'] = playerResults['Активные защиты'] + playerResults['Деньги'] + playerResults['Доп. баллы за ответы'];
    resultsTable.push(playerResults);
  }

  console.log(sortedByAnswersCountPlayers);
  return resultsTable.sort((p1, p2) => {return p2['Итого'] - p1['Итого']});
}
