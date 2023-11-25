import { useEffect, useRef } from 'react'
// получаем класс IO
import io from 'socket.io-client'
import {useAppDispatch, useAppSelector} from "../hooks.ts";
import {selectGame, setGame} from "../store/reducers/gameSlice.ts";
import {selectUserIsLogin} from "../store/reducers/userSlice.ts";
import {show} from "../store/reducers/notificationSlice.ts";
import {roll} from "../store/reducers/rouletteSlice.ts";
import {hidePopup} from "../store/reducers/popupSlice.ts";
import {hide, onTimer} from "../store/reducers/quizSlice.ts";

// import { useBeforeUnload } from './useBeforeUnload.ts';

// адрес сервера
// требуется перенаправление запросов - смотрите ниже
const SERVER_URL = 'http://localhost:3001'

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
      }));
    })

    socketRef.current.on('notification', (notification: any) => {

      console.log(notification);

      dispatch(show({text: notification.message, status: notification.status}));
    })

    socketRef.current.on('game:roll', (result: any) => {
      dispatch(roll({prizeNumber: result.result.prizeNumber}));
      dispatch(hidePopup());
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

  return { game, joinGame, createRoll, goNextTurn, startAnswers, updateAnswer, stopAnswers }
}

export default useGame;
