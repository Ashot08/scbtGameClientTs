import {useParams} from "react-router-dom";
import './game.css';
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {selectUserIsLogin, selectUserLogin, selectUserName} from "../../store/reducers/userSlice.ts";
import Token from "../../utils/Token.ts";
import Roulette from "../Roulette/Roulette.jsx";
import BasicCard from "../Card/BasicCard.tsx";
import List from "@mui/material/List";
import {ListItem, ListItemButton, ListItemIcon, ListItemText, Tab, Tabs, TextField} from "@mui/material";
import {GameQR} from "../GameQR/GameQR.tsx";
import {hidePopup, showPopup} from "../../store/reducers/popupSlice.ts";
import FaceIcon from '@mui/icons-material/Face';
import Button from "@mui/material/Button";
import Account from "../Account/Account.tsx";
import useGame from "../../hooks/useGame.tsx";
import CasinoIcon from '@mui/icons-material/Casino';
import {selectPlayerName, selectResult} from "../../store/reducers/rouletteSlice.ts";
import {hide, selectIsActive, selectTimerOn, show} from "../../store/reducers/quizSlice.ts";
import {Quiz} from "../Quiz/Quiz.tsx";
import {getAnswersResults, getAnswersResultsToGraph, getLastRoll, getLastRollMainAnswers} from "../../utils/answers.ts";
import {useEffect, useState} from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DangerousIcon from '@mui/icons-material/Dangerous';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import {getActivePlayer, getLastTurn} from "../../utils/game.ts";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import Box from "@mui/material/Box";
import {mobileCheck} from "../../utils/mobileCheck.ts";

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
  const [activeTabNumber, setActiveTabNumber] = useState(0);

  const handleChange = (event: any, newValue: number) => {
    console.log(event)
    setActiveTabNumber(newValue);
  };
  useEffect(() => {
    if(game?.answersMode === 'true') {
      dispatch(show());
    }
  }, [game, userId, dispatch]);

  const onGetGameLink = () => {
      dispatch(showPopup({
              title: 'Поделиться ссылкой',
              content: <GameQR gameId={params.gameId} />,
          }
      ));
  }

  const onHideQuiz = () => {
    if( (game?.answersMode === 'true' && getActivePlayer(game)?.username === player) || (game?.answersMode === 'true' && userId === game?.moderator)) {
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
                                    <strong>Игра:</strong> {game.title} ({params.gameId})
                                    <button style={{marginLeft: 5}} onClick={onGetGameLink}>Ссылка на игру</button>
                                </li>
                                <li><strong>Смена:</strong> {getLastTurn(game)?.shift < 4 ? getLastTurn(game)?.shift : 'Игра окончена'}</li>
                                <li><strong>Сейчас
                                    ходит:</strong> {getActivePlayer(game).name || getActivePlayer(game).username}</li>

                              {lastRollResult && <li><strong>Результат предыдущего:</strong> {lastRollPlayerName} - {lastRollResult}</li> }

                                <li>
                                    <strong>Игроки:</strong>
                                    <ul className={'game_state_players'}>
                                      {game.players.map((p: any) => {
                                        return (
                                          <li key={'players' + p.id}>
                                            {(getActivePlayer(game).id === p.id) && <CasinoIcon sx={{width: 15}}/>}
                                            {p.name ? p.name : p.username}
                                            {(getActivePlayer(game).id === p.id) && getLastRollMainAnswers(game)?.map((a) => {
                                              if(a.status === 'success') return  <CheckCircleOutlineIcon sx={{color: 'green'}} />;
                                              if(a.status === 'error') return  <DangerousIcon sx={{color: 'red'}} />;
                                              if(a.status === 'in_process') return  <HourglassTopIcon sx={{color: 'gray'}} />;
                                            })}
                                          </li>
                                        )
                                      })}
                                    </ul>

                                </li>

                            </ul>
                          {
                            (getActivePlayer(game).id === userId || game.moderator == userId)
                            &&
                              <div>
                                {
                                    (game?.answersMode === 'true'
                                      &&
                                     (getActivePlayer(game).username === player || userId === game.moderator)
                                    )
                                    ||
                                    quizActive
                                    ?
                                      !timerOn && <button onClick={onHideQuiz} className={'button'}>Перейти к рулетке</button>
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
                              <Quiz quizTimer={timerOn} startAnswers={startAnswers} isMyTurn={getActivePlayer(game).username === player}
                                    userId={userId} updateAnswer={updateAnswer} />
                              :
                              <div>
                                {(getLastTurn(game)?.shift > 3 && !getLastRoll(game))
                                  ?

                                  <div style={{marginTop: 20}}>

                                    <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
                                      <Tabs value={activeTabNumber} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab label="График" />
                                        <Tab label="Таблица" />
                                      </Tabs>
                                    </Box>

                                    <div
                                      role="tabpanel"
                                      hidden={activeTabNumber !== 0}
                                      id={`simple-tabpanel-${0}`}
                                      aria-labelledby={`simple-tab-${0}`}
                                    >
                                      {activeTabNumber === 0 && (
                                        <Box sx={{ p: 3 }}>
                                          <BarChart
                                            width={mobileCheck() ? 320 : 500}
                                            height={300}
                                            data={getAnswersResultsToGraph(game)}
                                            margin={{
                                              top: 5,
                                              right: 30,
                                              left: 0,
                                              bottom: 5,
                                            }}
                                          >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="Баллы" fill="#c50000" activeBar={<Rectangle fill="#920000" stroke="#920000" />} />
                                            <Bar dataKey="Попытки" fill="#594d5b" activeBar={<Rectangle fill="#c5c6d0" stroke="gray" />} />
                                          </BarChart>
                                        </Box>
                                      )}
                                    </div>

                                    <div
                                      role="tabpanel"
                                      hidden={activeTabNumber !== 1}
                                      id={`simple-tabpanel-${1}`}
                                      aria-labelledby={`simple-tab-${1}`}
                                    >
                                      {activeTabNumber === 1 && (
                                        <Box sx={{ p: 3 }}>
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
                                        </Box>
                                      )}
                                    </div>

                                  </div>

                                  :
                                  <Roulette userId={userId} activePlayer={getActivePlayer(game)} handleSpinClick={createRoll} onNextPlayer={goNextTurn} />
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
