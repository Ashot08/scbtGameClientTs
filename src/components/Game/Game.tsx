import {useParams} from "react-router-dom";
import './game.css';
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {selectUserLogin, selectUserName} from "../../store/reducers/userSlice.ts";
import Token from "../../utils/Token.ts";

// import RouletteMobile from "../RouletteMobile/RouletteMobile.jsx";
// import {mobileCheck} from "../../utils/mobileCheck.js";
import {io} from "socket.io-client";
import {show} from "../../store/reducers/notificationSlice.ts";
import {useEffect, useRef} from "react";
import {selectGame, setGame} from "../../store/reducers/gameSlice.ts";
import BasicCard from "../Card/BasicCard.tsx";
import List from "@mui/material/List";
import {ListItem, ListItemButton, ListItemIcon, ListItemText, TextField} from "@mui/material";
import {GameQR} from "../GameQR/GameQR.tsx";
import {showPopup} from "../../store/reducers/popupSlice.ts";
import FaceIcon from '@mui/icons-material/Face';
import Login from "../Login/Login.tsx";
import Button from "@mui/material/Button";

function Game() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const player = useAppSelector(selectUserLogin);
  const game = useAppSelector(selectGame);
  const userId = Token.getToken().id;
  const socket: any = useRef();

  useEffect(() => {
    ws();
  }, []);

  const ws = () => {
    socket.current = io("ws://localhost:3001");

    socket.current.on("connect", () => {
      dispatch(show({text: 'Соединение установлено', status: 'success'}));
      socket.current.emit('get_state', params.gameId);
    });

    socket.current.on("update_state", (state) => {
      dispatch(show({text: 'Обновлен стейт', status: 'success'}));
      dispatch(setGame({
        isLoaded: true,
        title: state.gameState.gameInfo.title,
        status: state.gameState.gameInfo.status,
        playersCount: state.gameState.gameInfo.players_count,
        moderator: state.gameState.gameInfo.moderator,
        creationDate: state.gameState.gameInfo.creation_date,
        players: state.gameState.players,
      }))
    });

    socket.current.on("disconnect", () => {
      dispatch(show({text: 'Соединение разорвано', status: 'error'}))
    });
  }


  const onGetGameLink = () => {
      dispatch(showPopup({
              title: 'Поделиться ссылкой',
              content: <GameQR gameId={params.gameId} />,
          }
      ));
  }

  const joinGame = (e: any) => {
    e.preventDefault();
    socket.current.emit('join_game', params.gameId, userId);
  }

  return (
    <>

      <main>
        <div className={'gameWrapper'}>
          {
            (
              game.status &&
              player &&
              (game.players.find((p: any) => p.username == player || game.moderator == userId) )
            )
              ?
              <>
                {(game.status === 'created')
                  &&
                    <div className={'game_desk game_desk_centered'}>
                        <div>
                            <div>
                              {/*{player && <BasicCard name={''} id={game.players[game.turn].name} />}*/}
                            </div>
                            <BasicCard
                                name={'Игра ' + game.title ? game.title : params.id }
                                id={`Ожидает, когда наберется ${game.playersCount} игроков (сейчас ${game.players.length} из ${game.playersCount})`}
                                content={
                                  <List>{
                                    (game.players.map((p) => {
                                      return(
                                        <ListItem key={p.id} disablePadding>
                                          <ListItemButton>
                                            <ListItemIcon>
                                              <FaceIcon/>
                                            </ListItemIcon>
                                            <ListItemText primary={p.name}/>
                                          </ListItemButton>
                                        </ListItem>
                                      )
                                    }))}
                                  </List>
                                }
                            />
                            <br/>
                            <button style={{marginLeft: 5}} onClick={onGetGameLink} >Ссылка на игру</button>
                        </div>
                    </div>
                }
              </>
              :
              <div className={'game_desk game_desk_centered'}>
                <div>
                  <>
                    <h1>ИГРА {game && game.title}</h1>
                    {player && <BasicCard name={player} id={'id: ' + userId} />}
                  </>

                  {(!player)
                    ?
                    <div >
                      <Login />
                    </div>

                    :

                    <div>
                      <List component="nav" aria-label="mailbox folders">
                        <ListItem sx={{justifyContent: 'center'}} divider>
                          <div>
                            <h4>Присоединиться к игре</h4>
                            <form onSubmit={joinGame} action="">

                              <div>
                                <label htmlFor="">
                                  <TextField
                                    required={true}
                                    id={'name-input'}
                                    label={'Id игры'}
                                    variant={'outlined'}
                                    type={'text'}
                                    name={'game_id'}
                                    value={params.gameId}
                                    disabled={true}
                                  />
                                </label>
                              </div>
                              <Button sx={{my: 2, width: '100%'}} type="submit"
                                      variant="contained">Присоединиться</Button>
                            </form>
                          </div>
                        </ListItem>
                      </List>

                    </div>}
                </div>
              </div>
          }

        </div>
      </main>

    </>
  )
}

export default Game
