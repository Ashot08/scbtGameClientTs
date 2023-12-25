import {useEffect, useState} from "react";
import classes from './GameInfoModal.module.scss';
import leftCornerIcon from './img/left_corner.png';
import disasterIcon from './img/disaster.png';
import successIcon from './img/success.png';
import infoIcon from './img/info.png';
import coinsIcon from './img/coins.png';
import {useAppSelector} from "../../hooks.ts";
import {selectGameInfoContent, selectGameInfoIsShown} from "../../store/reducers/gameInfoSlice.ts";

export default function GameInfoModal(props: any) {
  const [isShowBox, setIsShowBox] = useState(false);
  const data = useAppSelector(selectGameInfoContent);
  const open = useAppSelector(selectGameInfoIsShown);

  useEffect(() => {
    setTimeout(() => setIsShowBox(true));
  }, []);

  let image = infoIcon;
  if (data.status === 'disaster') {
    image = disasterIcon;
  }
  if (data.status === 'success') {
    image = successIcon;
  }

  return (
    <>
      {
        open
        &&
          <div className={`${classes.gameInfo} ${isShowBox ? classes.blockShow : ""}`}>
              <div className={classes.leftCorner}>
                  <img src={leftCornerIcon} alt="фон 1"/>
              </div>
              <div className={classes.leftText}>
                  <div className={classes.leftTextTitle}>
                    {data.title}
                  </div>
                  <div className={classes.leftTextContent}>
                    {data.content}
                  </div>
              </div>
              <div className={classes.image}>
                  <img src={image} alt={data.title}/>
              </div>
            {
              ( data.status === 'info')
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
              ( data.status === 'disaster')
              &&
                <div className={`${classes.info} ${classes.disasterInfo}`}>
                    <div className={classes.infoText}>
                        Требуется активных
                        <div>
                            защит: <span style={{fontWeight: 600, color: 'gold'}}>{data.needBonusesCount}</span>
                        </div>
                    </div>
                    <div className={classes.infoCoins}>
                        <img src={coinsIcon} alt="Монеты на защиту"/>
                    </div>
                </div>
            }

            {
              props.showButtons && <div className={classes.buttons}>
                <button onClick={props.onShowQuiz}>Взять вопрос</button>
                <button onClick={props.goNextTurn}>Передать ход</button>
            </div>
            }

          </div>
      }
    </>
  )
    ;
}
