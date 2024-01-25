import classes from "./BuyWindow.module.scss";
import {useAppDispatch, useAppSelector} from "../../../../hooks.ts";
import {hideBuyWindow, selectBuyWindowIndex} from "../../../../store/reducers/buyWindowSlice.ts";
import {getCurrentPlayerState} from "../../../../utils/game.ts";
import hexagonIcon from './img/hexagon.png';
import shieldEmptyIcon from './img/shieldEmpty.svg';
import workerEmptyIcon from './img/workerEmpty.svg';
function BuyWindow (props: any) {
  const dispatch = useAppDispatch();
  const workerIndex = useAppSelector(selectBuyWindowIndex);
  const playerState = getCurrentPlayerState(props.playersState, props.userId);
  const onClose = () => {
    dispatch(hideBuyWindow())
  }
  const onSave = () => {

  }

  return <div className={classes.buyWindow}>
    <div>
      <div>
        <div className={classes.board}>
          <div className={classes.defend}>
            <img src={shieldEmptyIcon} alt="Защита"/>
          </div>
          <div className={classes.defend}>
            <img src={shieldEmptyIcon} alt="Защита"/>
          </div>
          <div className={classes.defend}>
            <img src={shieldEmptyIcon} alt="Защита"/>
          </div>
          <div className={classes.defend}>
            <img src={shieldEmptyIcon} alt="Защита"/>
          </div>
          <div className={classes.defend}>
            <img src={shieldEmptyIcon} alt="Защита"/>
          </div>
          <div className={classes.defend}>
            <img src={shieldEmptyIcon} alt="Защита"/>
          </div>

          <div className={classes.worker}>
            <img src={workerEmptyIcon} alt="Рабочий"/>
          </div>

          <img src={hexagonIcon} alt="Фон"/>
        </div>
      </div>
      <div className={classes.buttons}>
        <button onClick={onClose}>Назад</button>
        <button onClick={onSave}>Сохранить {workerIndex}</button>
      </div>
    </div>
  </div>;
}

export default BuyWindow;
