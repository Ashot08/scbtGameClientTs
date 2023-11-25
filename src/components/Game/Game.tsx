import {useParams} from "react-router-dom";
import './game.css';
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {selectUserIsLogin, selectUserLogin, selectUserName} from "../../store/reducers/userSlice.ts";
import Token from "../../utils/Token.ts";

// import RouletteMobile from "../RouletteMobile/RouletteMobile.jsx";
// import {mobileCheck} from "../../utils/mobileCheck.js";
import Roulette from "../Roulette/Roulette.jsx";
import BasicCard from "../Card/BasicCard.tsx";
import List from "@mui/material/List";
import {ListItem, ListItemButton, ListItemIcon, ListItemText, TextField} from "@mui/material";
import {GameQR} from "../GameQR/GameQR.tsx";
import {hidePopup, showPopup} from "../../store/reducers/popupSlice.ts";
import FaceIcon from '@mui/icons-material/Face';
import Button from "@mui/material/Button";
import Account from "../Account/Account.tsx";
import useGame from "../../hooks/useGame.ts";
import CasinoIcon from '@mui/icons-material/Casino';
import {selectPlayerName, selectResult} from "../../store/reducers/rouletteSlice.ts";
import {hide, selectIsActive, selectTimerOn, show} from "../../store/reducers/quizSlice.ts";
import {Quiz} from "../Quiz/Quiz.tsx";
import {getAnswersResults, getLastRollMainAnswers} from "../../utils/answers.ts";
import {useEffect} from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DangerousIcon from '@mui/icons-material/Dangerous';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

function Game() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const player = useAppSelector(selectUserLogin);
  const playerName = useAppSelector(selectUserName);
  const isLogin = useAppSelector(selectUserIsLogin);
  const userId = Token.getToken()?.id;
  const {game, joinGame, createRoll, goNextTurn, startAnswers, updateAnswer, stopAnswers} = useGame(params.gameId);
  const lastRollResult = useAppSelector(selectResult);
  const lastRollPlayerName = useAppSelector(selectPlayerName);
  const quizActive = useAppSelector(selectIsActive);
  const timerOn = useAppSelector(selectTimerOn);

  useEffect(() => {
    if(game?.answersMode === 'true') {
      dispatch(show());
    }
  }, []);

  const onGetGameLink = () => {
      dispatch(showPopup({
              title: 'Поделиться ссылкой',
              content: <GameQR gameId={params.gameId} />,
          }
      ));
  }

  const getActivePlayer = () => {
    if(Array.isArray(game.turns) && Array.isArray(game.players) && game.turns.length && game.players.length) {
      const lastTurn = getLastTurn();
      return game.players.find((el: any) => {return el.id === lastTurn.player_id});
    }
    return {name: '-'};
  }

  const getLastTurn = () => {
    return game.turns.slice(-1)[0];
  }

  const onHideQuiz = () => {
    if( (game?.answersMode === 'true' && getActivePlayer().username === player) || (game?.answersMode === 'true' && userId === game.moderator)) {
      dispatch(showPopup({
        title: '',
        content:                             <BasicCard
          name={'Вы уверены, что хотите завершить ответ?'}
          id={`Если вы не ответили на вопрос, то будет засчитана ошибка`}
          content={
            <List>
              <ListItem key={'sdfsa'} disablePadding>
                <ListItemButton onClick={stopAnswers}>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon/>
                  </ListItemIcon>
                  <Button sx={{my: 2}} type="submit"
                          variant="contained">Да</Button>
                </ListItemButton>
              </ListItem>

              <ListItem key={'sdfsa'} disablePadding>
                <ListItemButton onClick={()=>dispatch(hidePopup())}>
                  <ListItemIcon>
                    <DangerousIcon/>
                  </ListItemIcon>
                  <Button sx={{my: 2}} type="submit"
                          variant="contained">Нет</Button>
                </ListItemButton>
              </ListItem>
            </List>
          }
        />,
      }))
    }
    dispatch(hide());
  }
  const onShowQuiz = () => {
    dispatch(show());
  }


  return (
    <>

      <main>
        <div className={'gameWrapper'}>
          {
            (
              game.status &&
              isLogin &&
              (
                game.players.find((p: any) => p.username == player
                  ||
                  (game.moderatorMode === '1' && userId === game.moderator))
              )
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
                                    (game.players.map((p: any) => {
                                      return(
                                        <ListItem key={p.id} disablePadding>
                                          <ListItemButton>
                                            <ListItemIcon>
                                              <FaceIcon/>
                                            </ListItemIcon>
                                            <ListItemText primary={p.name ? p.name : p.username}/>
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

                {(game.status === 'in_process')
                  &&
                    <>
                        <aside className={'game_state'}>
                            <ul>
                              {game.moderator == userId && <li><strong>Режим модератора:</strong> ON</li>}
                                <li><strong>Игрок:</strong> {playerName || player}</li>
                                <li>
                                    <strong>Игра:</strong> {game.title} ({params.id})
                                    <button style={{marginLeft: 5}} onClick={onGetGameLink}>Ссылка на игру</button>
                                </li>
                                <li><strong>Смена:</strong> {getLastTurn()?.shift}</li>
                                <li><strong>Сейчас
                                    ходит:</strong> {getActivePlayer().name || getActivePlayer().username}</li>

                              {lastRollResult && <li><strong>Результат предыдущего:</strong> {lastRollPlayerName} - {lastRollResult}</li> }

                                <li>
                                    <strong>Игроки:</strong>
                                    <ul className={'game_state_players'}>
                                      {game.players.map((p: any) => {
                                        return (
                                          <li key={'players' + p.id}>
                                            {(getActivePlayer().id === p.id) && <CasinoIcon sx={{width: 15}}/>}
                                            {p.name ? p.name : p.username}
                                            {(getActivePlayer().id === p.id) && getLastRollMainAnswers(game)?.map((a) => {
                                              if(a.status === 'success') return  <CheckCircleOutlineIcon sx={{color: 'green'}} />;
                                              if(a.status === 'error') return  <DangerousIcon sx={{color: 'red'}} />;
                                              if(a.status === 'in_process') return  <HourglassTopIcon sx={{color: 'gray'}} />;
                                            })}

                                            {/*{(game.players[0].id == p.id) && game.answersStat.map( (a) => { return a ? <CheckCircleOutlineIcon sx={{color: 'green'}} /> : <DangerousIcon sx={{color: 'red'}} /> }) }*/}
                                          </li>
                                        )
                                      })}
                                    </ul>

                                </li>

                            </ul>
                          {
                            (getActivePlayer().id === userId || game.moderator == userId)
                            &&
                              <div>
                                {
                                    (game?.answersMode === 'true'
                                      &&
                                     (getActivePlayer().username === player || userId === game.moderator)
                                    )
                                    ||
                                    quizActive
                                    ?
                                    <button onClick={onHideQuiz} className={'button'}>Перейти к рулетке</button>
                                    :
                                    <button onClick={onShowQuiz} className={'button'}>Взять вопрос</button>
                                }
                              </div>
                          }
                        </aside>

                        <div className={'game_desk'}>
                          {

                            (game?.answersMode === 'true' || quizActive)
                              ?
                              <Quiz quizTimer={timerOn} startAnswers={startAnswers} isMyTurn={getActivePlayer().username === player}
                                    userId={userId} updateAnswer={updateAnswer} />
                              :
                              <div>
                                {(getLastTurn()?.shift === 4)
                                  ?

                                  <div style={{marginTop: 20}}>
                                    <table>
                                      <tbody>
                                      <tr>
                                        <th>Игрок</th>
                                        <th>Баллы</th>
                                      </tr>
                                      {
                                        game.players.map((p: any) => {
                                          return <tr>
                                            <td>{p.name || p.username}</td>
                                            <td>{getAnswersResults(game)[p.id]?.length}</td>
                                          </tr>
                                        })
                                      }
                                      </tbody>
                                    </table>
                                  </div>

                                  :
                                  <Roulette userId={userId} activePlayer={getActivePlayer()} handleSpinClick={createRoll} onNextPlayer={goNextTurn} />
                                }
                              </div>
                          }
                        </div>
                    </>
                }

                {(game.status === 'finished') && <BasicCard name={ 'Игра ' + game.title } id={'Завершена'} />}
              </>
              :
              <div className={'game_desk game_desk_centered'}>
                <div>
                  <>
                    <h1>ИГРА {game && game.title}</h1>
                    {isLogin && <BasicCard name={playerName || player} id={'id: ' + userId} />}
                  </>

                  {(!isLogin)
                    ?
                    <div >
                      <Account />
                    </div>

                    :

                    <div>
                      <List component="nav" aria-label="mailbox folders">
                        <ListItem sx={{justifyContent: 'center'}} divider>
                          <div>
                            <h4>Присоединиться к игре</h4>
                            <form onSubmit={(e) => {e.preventDefault(); joinGame(userId);}} action="">

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
