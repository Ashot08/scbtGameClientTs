import { useEffect, useRef, useState } from 'react'
// получаем класс IO
import io from 'socket.io-client'
import {useAppDispatch, useAppSelector} from "../hooks.ts";
import {selectGame, setGame} from "../store/reducers/gameSlice.ts";
import {selectUserIsLogin} from "../store/reducers/userSlice.ts";

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
      socketRef.current.emit('game:getState')
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
        moderatorMode: state.state.moderatorMode,
      }));
    })

    return () => {
      // при размонтировании компонента выполняем отключение сокета
      socketRef.current.disconnect()
    }
  }, [roomId, isLogin])


  const joinGame = (playerId: number) => {
    socketRef.current.emit('game:join', {playerId, gameId: roomId});
  }
  return { game, joinGame }
}

export default useGame;
