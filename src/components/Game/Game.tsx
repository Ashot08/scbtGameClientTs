import {useParams} from "react-router-dom";
import './game.css';
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {selectUserIsLogin, selectUserLogin} from "../../store/reducers/userSlice.ts";
import Token from "../../utils/Token.ts";
import Roulette from "../Roulette/Roulette.jsx";
import BasicCard from "../Card/BasicCard.tsx";
import List from "@mui/material/List";
import {ListItem, ListItemButton, ListItemIcon, ListItemText, Tab, Tabs, TextField} from "@mui/material";
import {GameQR} from "../GameQR/GameQR.tsx";
import {hidePopup, showPopup} from "../../store/reducers/popupSlice.ts";
import FaceIcon from '@mui/icons-material/Face';
import Button from "@mui/material/Button";
import useGame from "../../hooks/useGame.tsx";
import CasinoIcon from '@mui/icons-material/Casino';
import {selectIsRoll, selectPlayerName, selectResult} from "../../store/reducers/rouletteSlice.ts";
import {hide, selectIsActive, selectTimerOn, show} from "../../store/reducers/quizSlice.ts";
import {Quiz} from "../Quiz/Quiz.tsx";
import {
  getLastRollMainAnswers, getTotalAnswersResults,
  getTotalAnswersResultsToGraph
} from "../../utils/answers.ts";
import {useEffect, useState} from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DangerousIcon from '@mui/icons-material/Dangerous';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import {
  getActivePlayer,
  getCurrentPlayerState,
  getLastTurn,
  getPlayersTotalMoneyAndDefsTable, getPlayersTotalMoneyDefsAnswersTable
} from "../../utils/game.ts";
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
import classes from './Game.module.scss';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import StartPage from "../StartPage/StartPage.tsx";
import gameIcon from './img/gameIcon.png';
import placeholder_2 from './img/placeholder_2.png';
import lockIcon from './img/lock.png';
import peopleIcon from './img/people.png';
import CheckIcon from '@mui/icons-material/Check';
import historyIcon from './img/history.png';
import chatIcon from './img/chat.png';
import GameInfoModal from "../GameInfoModal/GameInfoModal.tsx";
import {hideGameInfo} from "../../store/reducers/gameInfoSlice.ts";
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Resources from "./Resources/Resources.tsx";
import WorkersCount from "./WorkersCount/WorkersCount.tsx";
import WorkersField from "./WorkersField/WorkersField.tsx";
import BuyWindow from "./WorkersField/BuyWindow/BuyWindow.tsx";
import {selectBuyWindowIsShown} from "../../store/reducers/buyWindowSlice.ts";
import {selectBuyResourcesWindowIsShown} from "../../store/reducers/buyResourcesWindowSlice.ts";
import BuyResourcesWindow from "./Resources/BuyResourcesWindow/BuyResourcesWindow.tsx";

function Game() {
  const dispatch = useAppDispatch();
  const params = useParams();
  const player = useAppSelector(selectUserLogin);
  const isLogin = useAppSelector(selectUserIsLogin);
  const userId = Token.getToken()?.id;
  const {
    game,
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
  } = useGame(params.gameId);
  const lastRollResult = useAppSelector(selectResult);
  const lastRollPlayerName = useAppSelector(selectPlayerName);
  const quizActive = useAppSelector(selectIsActive);
  const timerOn = useAppSelector(selectTimerOn);
  const buyWindowOpen = useAppSelector(selectBuyWindowIsShown);
  const buyResourcesWindowOpen = useAppSelector(selectBuyResourcesWindowIsShown);
  const [activeTabNumber, setActiveTabNumber] = useState(0);
  const [isLoadingReadyStatus, setIsLoadingReadyStatus] = useState(false);
  const playerState = getCurrentPlayerState(game.playersState, userId);
  const mustSpin = useAppSelector(selectIsRoll);

  const onNextPlayer = () => {
    dispatch(showPopup({
      title: '',
      content: <BasicCard
        name={'Вы уверены, что хотите передать ход?'}
        id={`Вернуться к текущему ходу будет нельзя`}
        content={
          <List>
            <ListItem key={'sdfsa'} disablePadding>
              <ListItemButton onClick={() => {
                // setYourTurnWasShown(false);
                goNextTurn();
              }}>
                <ListItemIcon>
                  <CheckCircleOutlineIcon/>
                </ListItemIcon>
                <Button sx={{my: 2}} type="submit"
                        variant="contained">Да</Button>
              </ListItemButton>
            </ListItem>

            <ListItem key={'sdfsa'} disablePadding>
              <ListItemButton onClick={() => dispatch(hidePopup())}>
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

  const handleChange = (event: any, newValue: number) => {
    console.log(event)
    setActiveTabNumber(newValue);
  };
  useEffect(() => {
    setIsLoadingReadyStatus(false);

    if (game.status === 'created') {
      dispatch(hideGameInfo());
    }

    if (game?.answersMode === 'true') {
      dispatch(show());
    }
  }, [game, userId, dispatch]);

  const onGetGameLink = () => {
    dispatch(showPopup({
        title: 'Поделиться ссылкой',
        content: <GameQR gameId={params.gameId}/>,
      }
    ));
  }

  const onHideQuiz = () => {
    if ((game?.answersMode === 'true' && getActivePlayer(game)?.username === player) || (game?.answersMode === 'true' && userId === game?.moderator)) {
      dispatch(showPopup({
        title: '',
        content: <BasicCard
          name={'Вы уверены, что хотите завершить?'}
          id={``}
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
                <ListItemButton onClick={() => dispatch(hidePopup())}>
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

  const onFinishGame = () => {
    if ((game?.answersMode === 'false') && (userId === game?.moderator)) {
      dispatch(showPopup({
        title: '',
        content: <BasicCard
          name={'Вы уверены, что хотите завершить игру?'}
          id={`Обратить это действие будет невозможно`}
          content={
            <List>
              <ListItem key={'sdfsa'} disablePadding>
                <ListItemButton onClick={stopGame}>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon/>
                  </ListItemIcon>
                  <Button sx={{my: 2}} type="submit"
                          variant="contained">Да</Button>
                </ListItemButton>
              </ListItem>

              <ListItem key={'sdfsa1в'} disablePadding>
                <ListItemButton onClick={() => dispatch(hidePopup())}>
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

  const getStillNotJoinedPlayers = () => {
    const playersJoinedCount = game.players.length;
    const playersCount = game.playersCount;
    const result = [];
    if (playersCount) {
      for (let i = 0; i < (playersCount - playersJoinedCount); i++) {
        result.push({title: 'Ожидаем игрока...', key: `wait_player_${i}`});
      }
    }
    return result;
  }

  const onReady = () => {
    setIsLoadingReadyStatus(true);
    changeReadyStatus(userId, !(playerState.ready === 'true'));
  }

  return (
    <>

      {(!isLogin)
        ?
        <div>
          <StartPage/>
        </div>

        :

        <main className={classes.main}>
          <div className={'container'}>
            <div className={'gameWrapper'}>
              {
                (
                  game.status &&
                  isLogin
                  &&
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
                            <div className={classes.gameWait}>
                                <h1>
                                    Игра создана. Ждём игроков.
                                </h1>
                                <div>
                                  {/*{player && <BasicCard name={''} id={game.players[game.turn].name} />}*/}
                                </div>

                                <BasicCard
                                    name={`Игра '${(game.title ? game.title : params.id)}'`}
                                    id={`Ожидает, когда наберется ${game.playersCount} игроков (сейчас ${game.players.length} из ${game.playersCount})`}
                                    content={
                                      <List>
                                        {
                                          (game.players.map((p: any) => {
                                            return (
                                              <ListItem key={p.id} disablePadding>
                                                <ListItemButton>
                                                  <ListItemIcon>
                                                    <FaceIcon/>
                                                  </ListItemIcon>
                                                  <ListItemText primary={p.name ? p.name : p.username}/>
                                                </ListItemButton>
                                              </ListItem>
                                            )
                                          }))
                                        }
                                        {
                                          (getStillNotJoinedPlayers().map((p: any) => {
                                            return (
                                              <ListItem key={p.key} disablePadding>
                                                <ListItemButton>
                                                  <ListItemIcon>
                                                    <HelpOutlineIcon/>
                                                  </ListItemIcon>
                                                  <ListItemText primary={p.title}/>
                                                </ListItemButton>
                                              </ListItem>
                                            )
                                          }))
                                        }

                                      </List>
                                    }
                                />
                                <br/>
                                <Button sx={{backgroundColor: '#00A4A4'}} onClick={onGetGameLink} type="submit"
                                        variant="contained" fullWidth={true}>Ссылка на игру</Button>
                            </div>
                        </div>
                    }

                    {(game.status === 'in_process')
                      &&
                        <>
                          {
                            <aside className={'game_state'}>
                              <div className={classes.asideInner}>
                                {
                                  !mobileCheck() && <div className={classes.asideInnerHead}>
                                        <img src={gameIcon} alt="Название игры" title={'Название игры'}/>
                                        <span>{game.title}</span>
                                    </div>}

                                {
                                  !(game.moderatorMode === '1' && userId === game.moderator) &&
                                  !mobileCheck() && <div className={classes.asideInnerContent}>
                                        <div className={classes.tilesField}>
                                            <WorkersCount playersState={game.playersState} userId={userId} />
                                            <WorkersField game={game} userId={userId} />
                                        </div>
                                    </div>
                                }

                                {
                                  !mobileCheck() && <div className={classes.asideInnerHead}>
                                        <img src={peopleIcon} alt="Участники игры" title={'Участники игры'}/>
                                        <span>В игре</span>
                                    </div>
                                }


                                <div
                                  className={`${classes.asideInnerContent} ${(game.answersMode === 'true') ? classes.mobileAnswersMode : ''}`}>
                                  <div className={'game_state_players'}>
                                    {game.players.map((p: any) => {
                                      return (
                                        <div
                                          className={'game_state_player' + (getActivePlayer(game).id === p.id ? ' active' : '')}
                                          key={'players_' + p.id}>
                                          {
                                            (getActivePlayer(game).id === p.id)
                                              ?
                                              <CasinoIcon sx={{width: 15}}/>
                                              :
                                              <CheckIcon sx={{width: 15}}/>
                                          }
                                          {p.name ? p.name : p.username}{p.username === player ? '(Вы)' : ''}
                                          {(getActivePlayer(game).id === p.id) && getLastRollMainAnswers(game)?.map((a) => {
                                            if (a.status === 'success') return <CheckCircleOutlineIcon
                                              key={'answer_icon_' + Math.random()}
                                              sx={{color: 'green'}}/>;
                                            if (a.status === 'error') return <DangerousIcon
                                              key={'answer_icon_' + Math.random()}
                                              sx={{color: 'red'}}/>;
                                            if (a.status === 'in_process') return <HourglassTopIcon
                                              key={'answer_icon_' + Math.random()}
                                              sx={{color: 'gray'}}/>;
                                          })}
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>


                                {
                                  !mobileCheck() && <div className={classes.asideInnerContent}>
                                    {game.moderator == userId && <div className={classes.moderatorModeText}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M17 3H7C4.79086 3 3 4.79086 3 7V17C3 19.2091 4.79086 21 7 21H17C19.2091 21 21 19.2091 21 17V7C21 4.79086 19.2091 3 17 3Z"
                                                stroke="#20BDBD" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round"/>
                                            <path d="M9 12L11.25 14L15 10" stroke="#20BDBD" stroke-width="2"
                                                  stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        Режим модератора
                                    </div>}
                                    </div>
                                }
                                {
                                  (getActivePlayer(game).id === userId || game.moderator == userId)
                                  && <>
                                        <div className={classes.asideInnerContent}>
                                          {
                                            (game?.answersMode === 'true'
                                              &&
                                              (getActivePlayer(game).username === player || userId === game.moderator)
                                            )
                                            ||
                                            quizActive
                                              ?
                                              !timerOn &&
                                                <button onClick={onHideQuiz} className={'button'}>К
                                                    рулетке</button>
                                              :
                                              <>
                                                {/*<button onClick={onShowQuiz} className={'button'}>Взять вопрос</button>*/}
                                                <button onClick={startAnswers} className={'button'}>Взять вопрос</button>
                                                {
                                                  (game.moderator == userId)
                                                  &&
                                                    <div style={{marginTop: 10}}>
                                                        <button onClick={onFinishGame} className={'button'}>Завершить игру
                                                        </button>
                                                    </div>
                                                }
                                              </>
                                          }
                                        </div>

                                    </>
                                }

                              </div>
                            </aside>
                          }


                          {
                            !(game.moderatorMode === '1' && userId === game.moderator) &&
                            (buyResourcesWindowOpen && game.shiftChangeMode) &&
                              <BuyResourcesWindow buyDefends={buyDefends} playersState={game.playersState} userId={userId} />
                          }
                          {
                            !(game.moderatorMode === '1' && userId === game.moderator) &&
                            (buyWindowOpen && game.shiftChangeMode) &&
                              <BuyWindow updateWorkerData={updateWorkerData} playersState={game.playersState}
                                         userId={userId}/>
                          }


                          {false && <div>
                              {
                                (userId == game.playersState[0].player_id)
                                &&
                                  <ul style={{listStyle: 'none', fontSize: 12, paddingTop: 60}}>
                                    {/*<li>{game.playersState[0].id}</li>*/}
                                    {/*<li>{game.playersState[0].player_id}</li>*/}
                                    {/*<li>{game.playersState[0].game_id}</li>*/}
                                      <li>workers_alive: {game.playersState[0].workers_alive}</li>
                                      <li>active_worker: {game.playersState[0].active_worker}</li>
                                      <li>next_worker_index: {game.playersState[0].next_worker_index}</li>
                                      <li>next_worker_mode: {game.playersState[0].next_worker_mode}</li>
                                      <li>money: {game.playersState[0].money}</li>
                                      <li>defends: {game.playersState[0].defends}</li>
                                      <li>active_defends_scheme: {game.playersState[0].active_defends_scheme}</li>
                                      <li>not_active_defends_scheme: {game.playersState[0].not_active_defends_scheme}</li>
                                      <li>workers_positions_scheme: {game.playersState[0].workers_positions_scheme}</li>
                                      <li>accident_difficultly: {game.playersState[0].accident_difficultly}</li>
                                      <li>ready: {game.playersState[0].ready}</li>
                                      <li>questions_to_active_def_count: {game.playersState[0].questions_to_active_def_count}</li>
                                      <li>questions_without_def_count: {game.playersState[0].questions_without_def_count}</li>
                                      <li>questions_to_next_worker_count: {game.playersState[0].questions_to_next_worker_count}</li>
                                      <li>no_more_rolls: {game.playersState[0].no_more_rolls}</li>
                                  </ul>
                              }
                              {
                                (userId == game.playersState[1].player_id)
                                &&
                                  <ul style={{listStyle: 'none', fontSize: 12, paddingTop: 60}}>
                                    {/*<li>{game.playersState[1].id}</li>*/}
                                    {/*<li>{game.playersState[1].player_id}</li>*/}
                                    {/*<li>{game.playersState[1].game_id}</li>*/}
                                      <li>workers_alive: {game.playersState[1].workers_alive}</li>
                                      <li>active_worker: {game.playersState[1].active_worker}</li>
                                      <li>next_worker_index: {game.playersState[1].next_worker_index}</li>
                                      <li>next_worker_mode: {game.playersState[1].next_worker_mode}</li>
                                      <li>money: {game.playersState[1].money}</li>
                                      <li>defends: {game.playersState[1].defends}</li>
                                      <li>active_defends_scheme: {game.playersState[1].active_defends_scheme}</li>
                                      <li>not_active_defends_scheme: {game.playersState[1].not_active_defends_scheme}</li>
                                      <li>workers_positions_scheme: {game.playersState[1].workers_positions_scheme}</li>
                                      <li>accident_difficultly: {game.playersState[1].accident_difficultly}</li>
                                      <li>ready: {game.playersState[1].ready}</li>
                                      <li>questions_to_active_def_count: {game.playersState[1].questions_to_active_def_count}</li>
                                      <li>questions_without_def_count: {game.playersState[1].questions_without_def_count}</li>
                                      <li>questions_to_next_worker_count: {game.playersState[1].questions_to_next_worker_count}</li>
                                      <li>no_more_rolls: {game.playersState[1].no_more_rolls}</li>
                                  </ul>
                              }

                            </div>
                          }
                            <div className={'game_desk top'}>

                                <div className={`${(game.showRollResultMode === 'true' && !mustSpin) 
                                  ? 'blured_object ' : ''} ${classes.shiftIndicator}`}>
                                  {(game.shiftChangeMode === 'true')
                                    ?
                                    'Скоро начнется Смена ' + (getLastTurn(game)?.shift || '')
                                    :
                                    'Смена' + (getLastTurn(game)?.shift || '')
                                  }

                                </div>

                                <div className={classes.readyCheckbox + ` ${(game.showRollResultMode === 'true' && !mustSpin) 
                                  ? 
                                  'blured_object ' : ''}`}>
                                  {(game.shiftChangeMode === 'true') && <label>Готов
                                      <input disabled={isLoadingReadyStatus} onChange={onReady}
                                             checked={playerState.ready === 'true'} type="checkbox"
                                             name={'isReadyToStartShift'}/>
                                  </label>}
                                </div>

                                <div className={`${(game.showRollResultMode === 'true' && !mustSpin) ? 'blured_object ' : ''} ${classes.playerResources}`}>
                                    <Resources playersState={game.playersState} userId={userId}/>
                                </div>
                              {

                                (game?.answersMode === 'true')
                                  ?
                                  <Quiz quizTimer={timerOn} startAnswers={startAnswers}
                                        isMyTurn={getActivePlayer(game).username === player}
                                        userId={userId} updateAnswer={updateAnswer} onHideQuiz={onHideQuiz} onStopAnswers={stopAnswers}/>
                                  :
                                  <>
                                    <div style={{width: '100%'}}>
                                      <Roulette userId={userId} activePlayer={getActivePlayer(game)}
                                                handleSpinClick={createRoll} onNextPlayer={onNextPlayer}/>
                                    </div>
                                    {(game.showRollResultMode === 'true' && !mustSpin) &&
                                        <>
                                            <GameInfoModal
                                                userId={userId}
                                                activePlayer={getActivePlayer(game)}
                                                showButtons={(getActivePlayer(game).id === userId || game.moderator == userId)}
                                                onShowQuiz={startAnswers} goNextTurn={onNextPlayer} goNextWorker={() => goNextWorker(getActivePlayer(game).id)}/>
                                        </>
                                    }
                                  </>
                              }
                            </div>


                        {
                          (mobileCheck() && !quizActive) &&

                            <div className={'game_desk'}>
                                <div className={classes.asideInnerContent}>
                                    <div className={classes.tilesField}>
                                      {
                                        game.shiftChangeMode === 'true'
                                        ?
                                          <WorkersCount blured={(game.showRollResultMode === 'true' && !mustSpin)}
                                                        playersState={game.playersState} userId={userId}/>
                                          :
                                          ''
                                      }
                                        <WorkersField game={game} userId={userId}/>
                                      </div>
                                  </div>
                              </div>
                          }


                          {
                            !mobileCheck() && <aside className={'game_state'}>
                                  <div className={classes.asideInner + ' ' + classes.asideInnerRight}>
                                      <div className={classes.asideInnerHead}>
                                          <img src={historyIcon} alt="История игры" title={'История игры'}/>
                                          <span>История</span>
                                      </div>

                                      <div className={classes.asideInnerContent}>
                                          <div className={'game_state_history'}>
                                            {lastRollResult ?
                                              <div>Результат
                                                предыдущего: {lastRollPlayerName} - {lastRollResult}
                                              </div>
                                              :
                                              'Тут будет история ходов'
                                            }
                                          </div>
                                      </div>

                                      <div className={classes.asideInnerHead}>
                                          <img src={chatIcon} alt="Чат игры" title={'Чат игры'}/>
                                          <span>Чат</span>
                                      </div>

                                      <div className={classes.asideInnerContent}>
                                          <div className={classes.tilesField}>
                                              <img src={placeholder_2} alt="Чат игры" title={'Чат игры'}/>
                                              <div className={classes.lock}>
                                                  <img src={lockIcon} alt="lock"/>
                                              </div>
                                          </div>
                                      </div>
                                      <div className={classes.asideInnerContent}>
                                          <Button sx={{backgroundColor: '#00A4A4'}} onClick={onGetGameLink} type="submit"
                                                  variant="contained" fullWidth={true}>Ссылка на игру</Button>
                                      </div>
                                  </div>
                              </aside>
                          }
                        </>
                    }

                    {(game.status === 'finished')
                      &&
                        <div className={'game_desk_finished'}>
                            <div style={{marginTop: 100}}>
                                <h1 style={{textAlign: 'center'}}>Игра окончена</h1>
                                <h2 style={{textAlign: 'center', opacity: 0.5}}>Итоги игры:</h2>
                                <Box sx={{borderBottom: 1, borderColor: 'divider', marginBottom: 2}}>
                                    <Tabs className={'tabs'} value={activeTabNumber} onChange={handleChange}
                                          aria-label="basic tabs example">
                                        <Tab label="Таблица"/>
                                        <Tab label="График"/>
                                    </Tabs>
                                </Box>

                                <div
                                    role="tabpanel"
                                    hidden={activeTabNumber !== 0}
                                    id={`simple-tabpanel-${0}`}
                                    aria-labelledby={`simple-tab-${0}`}
                                >
                                  {activeTabNumber === 0 && (
                                    <>

                                      <h3 style={{opacity: 0.5, textAlign: 'center'}}>Общий результат</h3>
                                      <Box sx={{p: 3}}>
                                        <table className={'players_result_table'}>
                                          <tbody>
                                          <tr>
                                            <th>Игрок</th>
                                            <th>Защиты + Деньги</th>
                                          </tr>
                                          {
                                            getPlayersTotalMoneyDefsAnswersTable(game)
                                              .map((p: any, index: number) => {
                                                return <tr key={'players_table_item_' + p.id}>
                                                  <td>
                                                    {p.name}:
                                                  </td>
                                                  <td style={{
                                                    fontWeight: 600,
                                                    textAlign: 'center'
                                                  }}>
                                                    <div style={{
                                                      display: 'flex',
                                                      justifyContent: 'center',
                                                      alignItems: 'center'
                                                    }}>
                                                      {p['Итого']}
                                                      {p['Доп. баллы за ответы'] ? '(' + p['Деньги + защиты'] + ' + ' + p['Доп. баллы за ответы'] + ')' : ''}


                                                      {index === 0 && <>
                                                          <EmojiEventsIcon sx={{color: 'gold', marginLeft: 1}}/>
                                                      </>}

                                                      {index === 1 && <>
                                                          <EmojiEventsIcon
                                                              sx={{color: 'silver', marginLeft: 1, width: 22}}/>
                                                      </>}

                                                      {index === 2 && <>
                                                          <EmojiEventsIcon
                                                              sx={{color: '#cd7f32', marginLeft: 1, width: 20}}/>
                                                      </>}
                                                    </div>
                                                  </td>
                                                </tr>
                                              })
                                          }
                                          </tbody>
                                        </table>
                                      </Box>

                                      <h3 style={{opacity: 0.5, textAlign: 'center'}}>Деньги + активные защиты</h3>
                                      <Box sx={{p: 3}}>
                                        <table className={'players_result_table'}>
                                          <tbody>
                                          <tr>
                                            <th>Игрок</th>
                                            <th>Защиты + Деньги</th>
                                          </tr>
                                          {
                                            getPlayersTotalMoneyAndDefsTable(game)
                                              .map((p: any, index: number) => {
                                                return <tr key={'players_table_item_' + p.id}>
                                                  <td>
                                                    {p.name}:
                                                  </td>
                                                  <td style={{
                                                    fontWeight: 600,
                                                    textAlign: 'center'
                                                  }}>
                                                    <div style={{
                                                      display: 'flex',
                                                      justifyContent: 'center',
                                                      alignItems: 'center'
                                                    }}>
                                                      {p['Итого']}
                                                      {index === 0 &&
                                                          <EmojiEventsIcon sx={{color: 'gold', marginLeft: 1}}/>}
                                                      {index === 1 && <EmojiEventsIcon
                                                          sx={{color: 'silver', marginLeft: 1, width: 22}}/>}
                                                      {index === 2 && <EmojiEventsIcon
                                                          sx={{color: '#cd7f32', marginLeft: 1, width: 20}}/>}
                                                    </div>
                                                  </td>
                                                </tr>
                                              })
                                          }
                                          </tbody>
                                        </table>
                                      </Box>

                                      <h3 style={{opacity: 0.5, textAlign: 'center'}}>Общее количество верных
                                        ответов</h3>
                                      <Box sx={{p: 3}}>
                                        <table className={'players_result_table'}>
                                          <tbody>
                                          <tr>
                                            <th>Игрок</th>
                                            <th>Баллы</th>
                                          </tr>
                                          {
                                            [...game.players].sort((p1: any, p2: any) => {
                                              return +getTotalAnswersResults(game)[p2.id]?.length - +getTotalAnswersResults(game)[p1.id]?.length;
                                            })
                                              .map((p: any, index: number) => {
                                                return <tr key={'players_table_item_' + p.id}>
                                                  <td>
                                                    {p.name || p.username}:
                                                  </td>
                                                  <td style={{
                                                    fontWeight: 600,
                                                    textAlign: 'center'
                                                  }}>
                                                    <div style={{
                                                      display: 'flex',
                                                      justifyContent: 'center',
                                                      alignItems: 'center'
                                                    }}>
                                                      {getTotalAnswersResults(game)[p.id]?.length}
                                                      {index === 0 &&
                                                          <EmojiEventsIcon sx={{color: 'gold', marginLeft: 1}}/>}
                                                      {index === 1 && <EmojiEventsIcon
                                                          sx={{color: 'silver', marginLeft: 1, width: 22}}/>}
                                                      {index === 2 && <EmojiEventsIcon
                                                          sx={{color: '#cd7f32', marginLeft: 1, width: 20}}/>}
                                                    </div>
                                                  </td>
                                                </tr>
                                              })
                                          }
                                          </tbody>
                                        </table>
                                      </Box>
                                    </>

                                  )}
                                </div>

                                <div
                                    className={'graph_wrapper'}
                                    role="tabpanel"
                                    hidden={activeTabNumber !== 1}
                                    id={`simple-tabpanel-${1}`}
                                    aria-labelledby={`simple-tab-${1}`}
                                >

                                    <h3 style={{opacity: 0.5, textAlign: 'center'}}>Деньги + активные защиты</h3>
                                  {activeTabNumber === 1 && (

                                    <BarChart
                                      width={mobileCheck() ? 600 : 800}
                                      height={300}
                                      data={getPlayersTotalMoneyAndDefsTable(game)}
                                      margin={{
                                        top: 5,
                                        right: 30,
                                        left: 0,
                                        bottom: 5,
                                      }}
                                    >
                                      <CartesianGrid strokeDasharray="3 3"/>
                                      <XAxis dataKey="name"/>
                                      <YAxis/>
                                      <Tooltip/>
                                      <Legend/>
                                      <Bar dataKey="Деньги" fill="orange"
                                           activeBar={<Rectangle fill="gold" stroke="#920000"/>}/>
                                      <Bar dataKey="Активные защиты" fill="green"
                                           activeBar={<Rectangle fill="green" stroke="#920000"/>}/>
                                      <Bar dataKey="Итого" fill="gray"
                                           activeBar={<Rectangle fill="gray" stroke="#920000"/>}/>
                                    </BarChart>

                                  )}

                                    <h3 style={{opacity: 0.5, textAlign: 'center'}}>Общее количество верных ответов</h3>
                                  {activeTabNumber === 0 && (

                                    <BarChart
                                      width={mobileCheck() ? 600 : 800}
                                      height={300}
                                      data={getTotalAnswersResultsToGraph(game)}
                                      margin={{
                                        top: 5,
                                        right: 30,
                                        left: 0,
                                        bottom: 5,
                                      }}
                                    >
                                      <CartesianGrid strokeDasharray="3 3"/>
                                      <XAxis dataKey="name"/>
                                      <YAxis/>
                                      <Tooltip/>
                                      <Legend/>
                                      <Bar dataKey="Баллы" fill="#c50000"
                                           activeBar={<Rectangle fill="#920000" stroke="#920000"/>}/>

                                    </BarChart>

                                  )}
                                </div>

                            </div>
                        </div>
                    }
                  </>
                  :
                  //Если пользователь не в игре:
                  <>
                    {
                      (game.status === 'created') &&
                        <div className={'game_desk game_desk_centered'}>
                            <div className={classes.gameWait}>
                                <>
                                    <h1>ИГРА {game && game.title}</h1>
                                  {/*{isLogin && <BasicCard name={playerName || player} id={'id: ' + userId} />}*/}
                                </>

                                <div>
                                    <List component="nav" aria-label="mailbox folders">
                                        <ListItem sx={{justifyContent: 'center'}}>
                                            <div>
                                                <h4>Присоединиться к игре '{game && game.title}'</h4>
                                                <form onSubmit={(e) => {
                                                  e.preventDefault();
                                                  joinGame(userId);
                                                }} action="">

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
                                                                fullWidth={true}
                                                            />
                                                        </label>
                                                    </div>
                                                    <Button sx={{my: 2, width: '100%'}} type="submit"
                                                            variant="contained">Присоединиться</Button>

                                                    <br/>
                                                </form>
                                            </div>
                                        </ListItem>
                                    </List>

                                </div>
                                <Button sx={{backgroundColor: '#00A4A4'}} onClick={onGetGameLink} type="submit"
                                        variant="contained" fullWidth={true}>Ссылка на игру</Button>
                            </div>
                        </div>
                    }

                    {(game.status === 'in_process')
                      &&
                        <>
                          {
                            <aside className={'game_state'}>
                              <div className={classes.asideInner}>
                                {
                                  !mobileCheck() && <div className={classes.asideInnerHead}>
                                        <img src={gameIcon} alt="Название игры" title={'Название игры'}/>
                                        <span>{game.title}</span>
                                    </div>}

                                {
                                  !(game.moderatorMode === '1' && userId === game.moderator) &&
                                  !mobileCheck() && <div className={classes.asideInnerContent}>
                                        <div className={classes.tilesField}>
                                            <WorkersCount playersState={game.playersState} userId={getActivePlayer(game).id} />
                                            <WorkersField game={game} userId={getActivePlayer(game).id} />
                                        </div>
                                    </div>
                                }

                                {
                                  !mobileCheck() && <div className={classes.asideInnerHead}>
                                        <img src={peopleIcon} alt="Участники игры" title={'Участники игры'}/>
                                        <span>В игре</span>
                                    </div>
                                }


                                <div
                                  className={`${classes.asideInnerContent} ${(game.answersMode === 'true') ? classes.mobileAnswersMode : ''}`}>
                                  <div className={'game_state_players'}>
                                    {game.players.map((p: any) => {
                                      return (
                                        <div
                                          className={'game_state_player' + (getActivePlayer(game).id === p.id ? ' active' : '')}
                                          key={'players_' + p.id}>
                                          {
                                            (getActivePlayer(game).id === p.id)
                                              ?
                                              <CasinoIcon sx={{width: 15}}/>
                                              :
                                              <CheckIcon sx={{width: 15}}/>
                                          }
                                          {p.name ? p.name : p.username}
                                          {(getActivePlayer(game).id === p.id) && getLastRollMainAnswers(game)?.map((a) => {
                                            if (a.status === 'success') return <CheckCircleOutlineIcon
                                              key={'answer_icon_' + Math.random()}
                                              sx={{color: 'green'}}/>;
                                            if (a.status === 'error') return <DangerousIcon
                                              key={'answer_icon_' + Math.random()}
                                              sx={{color: 'red'}}/>;
                                            if (a.status === 'in_process') return <HourglassTopIcon
                                              key={'answer_icon_' + Math.random()}
                                              sx={{color: 'gray'}}/>;
                                          })}
                                        </div>
                                      )
                                    })}
                                  </div>
                                </div>

                              </div>
                            </aside>
                          }

                            <div className={'game_desk top'}>

                                <div className={`${(game.showRollResultMode === 'true' && !mustSpin)
                                  ? 'blured_object ' : ''} ${classes.shiftIndicator}`}>
                                  {(game.shiftChangeMode === 'true')
                                    ?
                                    'Скоро начнется Смена ' + (getLastTurn(game)?.shift || '')
                                    :
                                    'Смена' + (getLastTurn(game)?.shift || '')
                                  }

                                </div>

                                <div className={`${(game.showRollResultMode === 'true' && !mustSpin) ? 'blured_object ' : ''} ${classes.playerResources}`}>
                                    <Resources playersState={game.playersState} userId={userId}/>
                                </div>
                              {

                                (game?.answersMode === 'true')
                                  ?
                                  <Quiz quizTimer={timerOn} startAnswers={startAnswers}
                                        isMyTurn={getActivePlayer(game).username === player}
                                        userId={userId} updateAnswer={updateAnswer} onHideQuiz={onHideQuiz} onStopAnswers={stopAnswers}/>
                                  :
                                  <>
                                    <div style={{width: '100%'}}>
                                      <Roulette userId={userId} activePlayer={getActivePlayer(game)}
                                                handleSpinClick={createRoll} onNextPlayer={onNextPlayer}/>
                                    </div>
                                    {(game.showRollResultMode === 'true' && !mustSpin) &&
                                        <>
                                            <GameInfoModal
                                                userId={userId}
                                                activePlayer={getActivePlayer(game)}
                                                showButtons={false}
                                                onShowQuiz={startAnswers} goNextTurn={onNextPlayer} goNextWorker={() => goNextWorker(getActivePlayer(game).id)}/>
                                        </>
                                    }
                                  </>
                              }
                            </div>


                          {
                            (mobileCheck() && !quizActive) &&

                              <div className={'game_desk'}>
                                  <div className={classes.asideInnerContent}>
                                      <div className={classes.tilesField}>
                                        {
                                          game.shiftChangeMode === 'true'
                                            ?
                                            <WorkersCount blured={(game.showRollResultMode === 'true' && !mustSpin)}
                                                          playersState={game.playersState} userId={getActivePlayer(game).id}/>
                                            :
                                            ''
                                        }
                                          <WorkersField game={game} userId={getActivePlayer(game).id}/>
                                      </div>
                                  </div>
                              </div>
                          }


                          {
                            !mobileCheck() && <aside className={'game_state'}>
                                  <div className={classes.asideInner + ' ' + classes.asideInnerRight}>
                                      <div className={classes.asideInnerHead}>
                                          <img src={historyIcon} alt="История игры" title={'История игры'}/>
                                          <span>История</span>
                                      </div>

                                      <div className={classes.asideInnerContent}>
                                          <div className={'game_state_history'}>
                                            {lastRollResult ?
                                              <div>Результат
                                                предыдущего: {lastRollPlayerName} - {lastRollResult}
                                              </div>
                                              :
                                              'Тут будет история ходов'
                                            }
                                          </div>
                                      </div>

                                      <div className={classes.asideInnerHead}>
                                          <img src={chatIcon} alt="Чат игры" title={'Чат игры'}/>
                                          <span>Чат</span>
                                      </div>

                                      <div className={classes.asideInnerContent}>
                                          <div className={classes.tilesField}>
                                              <img src={placeholder_2} alt="Чат игры" title={'Чат игры'}/>
                                              <div className={classes.lock}>
                                                  <img src={lockIcon} alt="lock"/>
                                              </div>
                                          </div>
                                      </div>
                                      <div className={classes.asideInnerContent}>
                                          <Button sx={{backgroundColor: '#00A4A4'}} onClick={onGetGameLink} type="submit"
                                                  variant="contained" fullWidth={true}>Ссылка на игру</Button>
                                      </div>
                                  </div>
                              </aside>
                          }
                        </>
                    }

                    {(game.status === 'finished')
                      &&
                        <div className={'game_desk_finished'}>
                            <div style={{marginTop: 100}}>
                                <h1 style={{textAlign: 'center'}}>Игра окончена</h1>
                                <h2 style={{textAlign: 'center', opacity: 0.5}}>Итоги игры:</h2>
                                <Box sx={{borderBottom: 1, borderColor: 'divider', marginBottom: 2}}>
                                    <Tabs className={'tabs'} value={activeTabNumber} onChange={handleChange}
                                          aria-label="basic tabs example">
                                        <Tab label="Таблица"/>
                                        <Tab label="График"/>
                                    </Tabs>
                                </Box>

                                <div
                                    role="tabpanel"
                                    hidden={activeTabNumber !== 0}
                                    id={`simple-tabpanel-${0}`}
                                    aria-labelledby={`simple-tab-${0}`}
                                >
                                  {activeTabNumber === 0 && (
                                    <>

                                      <h3 style={{opacity: 0.5, textAlign: 'center'}}>Общий результат</h3>
                                      <Box sx={{p: 3}}>
                                        <table className={'players_result_table'}>
                                          <tbody>
                                          <tr>
                                            <th>Игрок</th>
                                            <th>Защиты + Деньги</th>
                                          </tr>
                                          {
                                            getPlayersTotalMoneyDefsAnswersTable(game)
                                              .map((p: any, index: number) => {
                                                return <tr key={'players_table_item_' + p.id}>
                                                  <td>
                                                    {p.name}:
                                                  </td>
                                                  <td style={{
                                                    fontWeight: 600,
                                                    textAlign: 'center'
                                                  }}>
                                                    <div style={{
                                                      display: 'flex',
                                                      justifyContent: 'center',
                                                      alignItems: 'center'
                                                    }}>
                                                      {p['Итого']}
                                                      {p['Доп. баллы за ответы'] ? '(' + p['Деньги + защиты'] + ' + ' + p['Доп. баллы за ответы'] + ')' : ''}


                                                      {index === 0 && <>
                                                          <EmojiEventsIcon sx={{color: 'gold', marginLeft: 1}}/>
                                                      </>}

                                                      {index === 1 && <>
                                                          <EmojiEventsIcon
                                                              sx={{color: 'silver', marginLeft: 1, width: 22}}/>
                                                      </>}

                                                      {index === 2 && <>
                                                          <EmojiEventsIcon
                                                              sx={{color: '#cd7f32', marginLeft: 1, width: 20}}/>
                                                      </>}
                                                    </div>
                                                  </td>
                                                </tr>
                                              })
                                          }
                                          </tbody>
                                        </table>
                                      </Box>

                                      <h3 style={{opacity: 0.5, textAlign: 'center'}}>Деньги + активные защиты</h3>
                                      <Box sx={{p: 3}}>
                                        <table className={'players_result_table'}>
                                          <tbody>
                                          <tr>
                                            <th>Игрок</th>
                                            <th>Защиты + Деньги</th>
                                          </tr>
                                          {
                                            getPlayersTotalMoneyAndDefsTable(game)
                                              .map((p: any, index: number) => {
                                                return <tr key={'players_table_item_' + p.id}>
                                                  <td>
                                                    {p.name}:
                                                  </td>
                                                  <td style={{
                                                    fontWeight: 600,
                                                    textAlign: 'center'
                                                  }}>
                                                    <div style={{
                                                      display: 'flex',
                                                      justifyContent: 'center',
                                                      alignItems: 'center'
                                                    }}>
                                                      {p['Итого']}
                                                      {index === 0 &&
                                                          <EmojiEventsIcon sx={{color: 'gold', marginLeft: 1}}/>}
                                                      {index === 1 && <EmojiEventsIcon
                                                          sx={{color: 'silver', marginLeft: 1, width: 22}}/>}
                                                      {index === 2 && <EmojiEventsIcon
                                                          sx={{color: '#cd7f32', marginLeft: 1, width: 20}}/>}
                                                    </div>
                                                  </td>
                                                </tr>
                                              })
                                          }
                                          </tbody>
                                        </table>
                                      </Box>

                                      <h3 style={{opacity: 0.5, textAlign: 'center'}}>Общее количество верных
                                        ответов</h3>
                                      <Box sx={{p: 3}}>
                                        <table className={'players_result_table'}>
                                          <tbody>
                                          <tr>
                                            <th>Игрок</th>
                                            <th>Баллы</th>
                                          </tr>
                                          {
                                            [...game.players].sort((p1: any, p2: any) => {
                                              return +getTotalAnswersResults(game)[p2.id]?.length - +getTotalAnswersResults(game)[p1.id]?.length;
                                            })
                                              .map((p: any, index: number) => {
                                                return <tr key={'players_table_item_' + p.id}>
                                                  <td>
                                                    {p.name || p.username}:
                                                  </td>
                                                  <td style={{
                                                    fontWeight: 600,
                                                    textAlign: 'center'
                                                  }}>
                                                    <div style={{
                                                      display: 'flex',
                                                      justifyContent: 'center',
                                                      alignItems: 'center'
                                                    }}>
                                                      {getTotalAnswersResults(game)[p.id]?.length}
                                                      {index === 0 &&
                                                          <EmojiEventsIcon sx={{color: 'gold', marginLeft: 1}}/>}
                                                      {index === 1 && <EmojiEventsIcon
                                                          sx={{color: 'silver', marginLeft: 1, width: 22}}/>}
                                                      {index === 2 && <EmojiEventsIcon
                                                          sx={{color: '#cd7f32', marginLeft: 1, width: 20}}/>}
                                                    </div>
                                                  </td>
                                                </tr>
                                              })
                                          }
                                          </tbody>
                                        </table>
                                      </Box>
                                    </>

                                  )}
                                </div>

                                <div
                                    className={'graph_wrapper'}
                                    role="tabpanel"
                                    hidden={activeTabNumber !== 1}
                                    id={`simple-tabpanel-${1}`}
                                    aria-labelledby={`simple-tab-${1}`}
                                >

                                    <h3 style={{opacity: 0.5, textAlign: 'center'}}>Деньги + активные защиты</h3>
                                  {activeTabNumber === 1 && (

                                    <BarChart
                                      width={mobileCheck() ? 600 : 800}
                                      height={300}
                                      data={getPlayersTotalMoneyAndDefsTable(game)}
                                      margin={{
                                        top: 5,
                                        right: 30,
                                        left: 0,
                                        bottom: 5,
                                      }}
                                    >
                                      <CartesianGrid strokeDasharray="3 3"/>
                                      <XAxis dataKey="name"/>
                                      <YAxis/>
                                      <Tooltip/>
                                      <Legend/>
                                      <Bar dataKey="Деньги" fill="orange"
                                           activeBar={<Rectangle fill="gold" stroke="#920000"/>}/>
                                      <Bar dataKey="Активные защиты" fill="green"
                                           activeBar={<Rectangle fill="green" stroke="#920000"/>}/>
                                      <Bar dataKey="Итого" fill="gray"
                                           activeBar={<Rectangle fill="gray" stroke="#920000"/>}/>
                                    </BarChart>

                                  )}

                                    <h3 style={{opacity: 0.5, textAlign: 'center'}}>Общее количество верных ответов</h3>
                                  {activeTabNumber === 0 && (

                                    <BarChart
                                      width={mobileCheck() ? 600 : 800}
                                      height={300}
                                      data={getTotalAnswersResultsToGraph(game)}
                                      margin={{
                                        top: 5,
                                        right: 30,
                                        left: 0,
                                        bottom: 5,
                                      }}
                                    >
                                      <CartesianGrid strokeDasharray="3 3"/>
                                      <XAxis dataKey="name"/>
                                      <YAxis/>
                                      <Tooltip/>
                                      <Legend/>
                                      <Bar dataKey="Баллы" fill="#c50000"
                                           activeBar={<Rectangle fill="#920000" stroke="#920000"/>}/>

                                    </BarChart>

                                  )}
                                </div>

                            </div>
                        </div>
                    }
                  </>
              }
            </div>
          </div>
        </main>
      }
    </>
  )
}

export default Game
