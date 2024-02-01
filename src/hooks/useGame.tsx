import { useEffect, useRef } from 'react'
// получаем класс IO
import io from 'socket.io-client'
import {useAppDispatch, useAppSelector} from "../hooks.ts";
import {selectGame, setGame} from "../store/reducers/gameSlice.ts";
import {selectUserIsLogin} from "../store/reducers/userSlice.ts";
import {show} from "../store/reducers/notificationSlice.ts";
import {roll} from "../store/reducers/rouletteSlice.ts";
import {hidePopup, showPopup} from "../store/reducers/popupSlice.ts";
import {hide, onTimer} from "../store/reducers/quizSlice.ts";
import shiftClockIcon from '../assets/shift_clock.png'
import shiftCupIcon from '../assets/shift_cup.png'
import playerIcon from '../assets/player.png';
import failIcon from '../components/Game/img/fail.png';
import successIcon from '../components/Game/img/success.png';
import { Button } from '@mui/material';
import {hideGameInfo} from "../store/reducers/gameInfoSlice.ts";



// import { useBeforeUnload } from './useBeforeUnload.ts';

// адрес сервера
// требуется перенаправление запросов - смотрите ниже
const SERVER_URL = 'http://localhost:3001'
// const SERVER_URL = 'ws://80.90.189.247:3001/';

// хук принимает название комнаты
const useGame = (roomId: any) => {
  const game = useAppSelector(selectGame);
  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(selectUserIsLogin);
  const socketRef: any = useRef(null)

  useEffect(() => {
    // создаем экземпляр сокета, передаем ему адрес сервера
    // и записываем объект с названием комнаты в строку запроса "рукопожатия"
    // socket.handshake.query.roomId
    socketRef.current = io(SERVER_URL, {
      query: { roomId }
    })

    if(isLogin) {
      // отправляем запрос на получение сообщений
      socketRef.current.emit('game:getState');
    }

    socketRef.current.on('game:updateState', (state: any) => {

      console.log('state ', state);

      dispatch(setGame({
        isLoaded: true,
        title: state.state.game.title,
        status: state.state.game.status,
        playersCount: state.state.game.players_count,
        moderator: state.state.game.moderator,
        creationDate: state.state.game.creation_date,
        players: state.state.players,
        turns: state.state.turns,
        answers: state.state.answers,
        lastTurnRolls: state.state.lastTurnRolls,
        moderatorMode: state.state.game.moderator_mode,
        answersMode: state.state.game.answers_mode,
        shiftChangeMode: state.state.game.shift_change_mode,
        showRollResultMode: state.state.game.show_roll_result_mode,
        playersState: state.state.playersState,
      }));
    })

    socketRef.current.on('notification', (notification: any) => {
      dispatch(show({text: notification.message, status: notification.status}));
    })

    socketRef.current.on('game:roll', (result: any) => {
      dispatch(hidePopup());
      dispatch(hideGameInfo());
      dispatch(hide());

      // Рулетка не успевает монтироваться, если у модератора был открыт Квиз, отсюда ошибка

      setTimeout(function(){
        dispatch(roll({prizeNumber: result.result.prizeNumber}));
      }, 100)

    });

    socketRef.current.on('game:stopAnswers', () => {
      dispatch(hideGameInfo());
      dispatch(hide());
    });

    socketRef.current.on('game:nextPlayer', (activePlayer: any) => {
      dispatch(hideGameInfo());
      dispatch(showPopup({
        title:
          <>
            <div style={{marginTop: 20, marginBottom: 20, textAlign: "center"}}><strong>Переход хода!</strong></div>
            <div style={{marginTop: 10, marginBottom: 10, textAlign: "center"}}>Ходит: {activePlayer.name || activePlayer.username}</div>
          </>
        ,
        content: <div style={
          {minWidth: 300, marginTop: 20, marginBottom: 20, textAlign: "center",}
        }><img style={{maxWidth: 80}} src={playerIcon} alt="shift player icon"/>
          <div style={
            {marginTop: 10, marginBottom: 10,}
          }>
            <Button variant="contained" onClick={() => dispatch(hidePopup())}>Вперед!</Button>
          </div>
        </div>
      }));
    });

    socketRef.current.on('game:nextShift', (result: any, activePlayer: any) => {
      dispatch(hideGameInfo());
      if(result.shift > 100) {
        // end game
      } else {
        dispatch(showPopup({
          title: <> {
            result.shift === 1
              ?
              <>
                <div style={{marginTop: 20, marginBottom: 20, textAlign: "center"}}><strong>Старт игры!</strong></div><div style={{textAlign: "center"}}>Скоро начнется смена <strong>№{result.shift}</strong></div>
                <div style={{marginTop: 10, marginBottom: 10, textAlign: "center"}}>
                  <div>Купите защиты и расставьте работников!</div>
                  Первым будет ходить: {activePlayer.name || activePlayer.username}
                </div>
              </>
              :
              <>
                <div style={{textAlign: "center"}}>Скоро начнется смена <strong>№{result.shift}</strong></div>
                <div style={{marginTop: 10, marginBottom: 10, textAlign: "center"}}>
                  <div>Купите защиты и расставьте работников!</div>
                  Первым будет ходить: {activePlayer.name || activePlayer.username}
                </div>
              </>
          }
          </>,
          content: <div style={
            {minWidth: 300, marginTop: 20, marginBottom: 20, textAlign: "center",}
          }><img src={shiftClockIcon} alt="shift clock icon"/>
            <div style={
              {marginTop: 10, marginBottom: 10,}
            }>
              <Button variant="contained" onClick={() => dispatch(hidePopup())}>Ok</Button>
            </div>
          </div>
        }));
      }

      socketRef.current.emit('game:getState');
    });

    socketRef.current.on('game:allReadyStartShift', () => {
      dispatch(hideGameInfo());
      dispatch(showPopup({
        title: <> {
          <>
            <div style={{textAlign: "center"}}>Смена началась!</div>
          </>
        }
        </>,
        content: <div style={
          {minWidth: 300, marginTop: 20, marginBottom: 20, textAlign: "center",}
        }><img src={shiftClockIcon} alt="shift clock icon"/>
          <div style={
            {marginTop: 10, marginBottom: 10,}
          }>
            <Button variant="contained" onClick={() => dispatch(hidePopup())}>Ok</Button>
          </div>
        </div>
      }));
    });

    socketRef.current.on('game:gameFinished', () => {
      dispatch(showPopup({
        title:
          <><div style={{marginTop: 20, marginBottom: 20, textAlign: "center"}}><strong>Игра окончена!</strong></div></>
        ,
        content: <div style={
          {minWidth: 300, marginTop: 20, marginBottom: 20, textAlign: "center",}
        }><img src={shiftCupIcon} alt="shift cup icon"/>
          <div style={
            {marginTop: 10, marginBottom: 10,}
          }>
            <Button variant="contained" onClick={() => dispatch(hidePopup())}>К итогам!</Button>
          </div>
        </div>
      }));
    });

    socketRef.current.on('game:workerFail', (data: any) => {
      dispatch(hideGameInfo());
      dispatch(hide());
      dispatch(showPopup({
        title:
          <><div style={{marginTop: 20, marginBottom: 20, textAlign: "center"}}><strong>
            {data.status === 'Потеря'
            ?
              'Работник травмирован!'
              :
              'ШТРАФ - 1 монета!'
            }

          </strong>
        </div></>
        ,
        content: <div style={
          {minWidth: 300, marginTop: 20, marginBottom: 20, textAlign: "center",}
        }><img style={{maxWidth: '200px'}} src={failIcon} alt="shift cup icon"/>
          <div style={
            {marginTop: 10, marginBottom: 10,}
          }>
            <Button variant="contained" onClick={() => dispatch(hidePopup())}>Ок!</Button>
          </div>
        </div>
      }));
    });

    socketRef.current.on('game:workerSaved', () => {
      dispatch(hideGameInfo());
      dispatch(hide());
      dispatch(showPopup({
        title:
          <><div style={{marginTop: 20, marginBottom: 20, textAlign: "center"}}><strong>Работник спасен!</strong></div></>
        ,
        content: <div style={
          {minWidth: 300, marginTop: 20, marginBottom: 20, textAlign: "center",}
        }><img style={{maxWidth: '200px'}} src={successIcon} alt="shift cup icon"/>
          <div style={
            {marginTop: 10, marginBottom: 10,}
          }>
            <Button variant="contained" onClick={() => dispatch(hidePopup())}>Ок!</Button>
          </div>
        </div>
      }));
    });

    socketRef.current.on('answer:startTimer', () => {
      dispatch(onTimer());
    });

    return () => {
      // при размонтировании компонента выполняем отключение сокета
      socketRef.current.disconnect()
    }
  }, [roomId, isLogin])


  const joinGame = (playerId: number) => {
    socketRef.current.emit('game:join', {playerId, gameId: roomId});
  }

  const createRoll = () => {
    socketRef.current.emit('game:create_roll');
  }

  const goNextTurn = () => {
    socketRef.current.emit('game:create_turn');
    dispatch(hidePopup());
  }

  const goNextWorker = (activePlayerId: number) => {
    socketRef.current.emit('game:go_next_worker', {activePlayerId});
    dispatch(hidePopup());
  }

  const startAnswers = () => {
    socketRef.current.emit('game:start_answers');
  }

  const stopAnswers = () => {
    socketRef.current.emit('game:stop_answers');
    dispatch(hidePopup());
    dispatch(hide());
  }

  const updateAnswer = (answerId: number, status: 'success' | 'error') => {
    socketRef.current.emit('game:update_answer', {answerId, status});
  }

  const stopGame = () => {
    socketRef.current.emit('game:stop_game');
    dispatch(hidePopup());
  }

  const updateWorkerData = (userId: number, data: {workerIndex: number, addedDefendsCount: number, workerIsSet: boolean}) => {
    socketRef.current.emit('game:update_worker_data', {userId, data});
  }

  const buyDefends = (userId: number, defendsCount: number) => {
    socketRef.current.emit('game:buy_defends', {userId, defendsCount});
  }

  const changeReadyStatus = (userId: number, readyStatus: boolean) => {
    socketRef.current.emit('game:change_ready_status', {userId, readyStatus});
  }

  return { game,
    joinGame,
    createRoll,
    goNextTurn,
    startAnswers,
    updateAnswer,
    stopAnswers,
    stopGame,
    updateWorkerData,
    buyDefends,
    changeReadyStatus,
    goNextWorker
  }
}

export default useGame;
