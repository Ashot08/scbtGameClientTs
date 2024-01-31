import {useEffect, useState} from "react";
import classes from './GameInfoModal.module.scss';
import leftCornerIcon from './img/left_corner.png';
import disasterIcon from './img/disaster.png';
import successIcon from './img/success.png';
import infoIcon from './img/info.png';
import coinsIcon from './img/coins.png';
import {useAppSelector} from "../../hooks.ts";
import {selectGame} from "../../store/reducers/gameSlice.ts";
import {
  getCurrentPlayerState,
  isGetQuestionAvailable,
  isNextTurnAvailable,
  isNextWorkerAvailable
} from "../../utils/game.ts";
import {data} from "../../constants/data.ts";

export default function GameInfoModal(props: any) {
  const [isShowBox, setIsShowBox] = useState(false);
  const game = useAppSelector(selectGame);
  const activePlayerState = getCurrentPlayerState(game.playersState, props.activePlayer.id);
  const prizeNumber = game.lastTurnRolls[game.lastTurnRolls.length - 1].result_id;
  let status = '';

  useEffect(() => {
    setTimeout(() => setIsShowBox(true), 100);
  }, []);

  let image = infoIcon;
  if (activePlayerState.accident_difficultly > 0) {
    image = disasterIcon;
    status = 'disaster';
  }
  if (activePlayerState.accident_difficultly === 0) {
    image = successIcon;
    status = 'success';
  }

  return (
    <>
      {
          <div className={`${classes.gameInfo} ${isShowBox ? classes.blockShow : ""}`}>
              <div className={classes.leftCorner}>
                  <img src={leftCornerIcon} alt="фон 1"/>
              </div>
              <div className={classes.leftText}>
                  <div className={classes.leftTextTitle}>
                    {
                      isNextWorkerAvailable(activePlayerState)
                      ?
                        'К следующему работнику'
                        :
                        <>
                          {isNextTurnAvailable(activePlayerState)
                            ?
                            'Ход завершен'
                            :
                            <>{data[prizeNumber].option}</>
                          }
                        </>
                    }
                  </div>
                  <div className={classes.leftTextContent}>

                    {isNextWorkerAvailable(activePlayerState)
                      ?
                      <>
                        {(status === 'success' && props.activePlayer.id == props.userId)
                          &&
                            <>
                                 У вас Бонус (+1 защита)!
                            </>
                        }
                        {(status === 'success' && props.activePlayer.id != props.userId)
                          &&
                            <>
                                У {props.activePlayer.name || props.activePlayer.username} Бонус!
                            </>
                        }
                      </>
                      :
                      <>
                        {(status === 'disaster' && props.activePlayer.id == props.userId)
                          &&
                            <>
                              {isNextTurnAvailable(activePlayerState)
                                ? 'Передайте ход следующему игроку'
                                :
                                'У вас может произойти несчастный случай!'
                              }
                            </>
                        }
                        {(status === 'disaster' && props.activePlayer.id != props.userId)
                          &&
                            <>
                              {isNextTurnAvailable(activePlayerState)
                                ? <>У {props.activePlayer.name || props.activePlayer.username} смена окончена</>
                                :
                                <>У {props.activePlayer.name || props.activePlayer.username} может произойти несчастный случай!</>
                              }
                            </>
                        }
                      </>
                    }



                  </div>
              </div>
              <div className={classes.image}>
                  <img src={image} alt={'title'}/>
              </div>
            {
              ( status === 'info')
              &&
                <div className={classes.info}>
                    <div className={classes.infoText}>
                        Бонусы защиты можно получить обменяв
                        их на монеты
                    </div>
                    <div className={classes.infoCoins}>
                        <img src={coinsIcon} alt="Монеты на защиту"/>
                    </div>
                </div>
            }

            {
              ( status === 'disaster')
              &&
                <div className={`${classes.info} ${classes.disasterInfo}`}>
                    <div className={classes.infoText}>

                      {activePlayerState.questions_to_active_def_count
                        ?
                        <div>
                          Доступно защит для
                          <div>
                            активации: <span style={{fontWeight: 600, color: 'gold'}}>{activePlayerState.questions_to_active_def_count}</span>
                          </div>
                        </div>
                          :
                        ''
                      }
                      {activePlayerState.questions_without_def_count ?
                        <>
                            Ответы без права на
                            <div>ошибку: <span style={{
                              fontWeight: 600,
                              color: 'gold'
                            }}>{activePlayerState.questions_without_def_count}</span>
                            </div>
                        </>
                        :
                        ''
                      }
                    </div>
                    <div className={classes.infoCoins}>
                        <img src={coinsIcon} alt="Монеты на защиту"/>
                    </div>
                </div>
            }

            {
              props.showButtons && <div className={classes.buttons}>
                {
                  isGetQuestionAvailable(activePlayerState) &&
                  <button onClick={props.onShowQuiz}>Спасти работника!</button>
                }
                {
                  isNextTurnAvailable(activePlayerState) &&
                  <button onClick={props.goNextTurn}>Передать ход</button>
                }
                {
                  isNextWorkerAvailable(activePlayerState) &&
                  <button onClick={props.goNextWorker}>Следующий работник</button>
                }
                </div>
            }

          </div>
      }
    </>
  )
    ;
}
