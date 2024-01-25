import classes from './Resources.module.scss';
import {getCurrentPlayerState} from "../../../utils/game.ts";
import defendIcon from './img/shield.svg';
import moneyIcon from './img/money.svg';
import {useAppDispatch} from "../../../hooks.ts";
import {showBuyResourcesWindow} from "../../../store/reducers/buyResourcesWindowSlice.ts";
function Resources (props: any) {

  const playerState = getCurrentPlayerState(props.playersState, props.userId);
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(showBuyResourcesWindow());
  }

  return <div onClick={onClick} className={classes.resources}>
    <div className={classes.defends}>
      <img src={defendIcon} alt="Защиты"/>
      {playerState?.defends}
    </div>
    <div className={classes.money}>
      <img src={moneyIcon} alt="Деньги"/>
      {playerState?.money}
    </div>
  </div>
}

export default Resources;
