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
