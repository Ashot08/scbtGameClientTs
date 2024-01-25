import classes from './BuyResourcesWindow.module.scss';
import {getCurrentPlayerState} from "../../../../utils/game.ts";
import coinIcon from '../img/money.svg';
import shieldIcon from '../img/shield.svg';
import closeIcon from './img/close.svg';
import {useEffect, useState} from "react";
import {useAppDispatch} from "../../../../hooks.ts";
import {show} from "../../../../store/reducers/notificationSlice.ts";
import {hideBuyResourcesWindow} from "../../../../store/reducers/buyResourcesWindowSlice.ts";

function BuyResourcesWindow (props: any) {
  const dispatch = useAppDispatch();
  const playerState = getCurrentPlayerState(props.playersState, props.userId);
  const [defendsToBeAdded, setDefendsToBeAdded] = useState(0);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    setSaveLoading(false);
    // const workersData = getWorkerDataByIndex(playerState, workerIndex);
    // if(workersData.workerIsSet) {
    //   setWorkerIsSet(true);
    // }
  }, [playerState]);

  const addDefend = () => {
    if(defendsToBeAdded < playerState.money) {
      setDefendsToBeAdded(defendsToBeAdded + 1);
    }
    else {
      dispatch(show({text: `Это максимум, так как у вас всего ${playerState.money} монет`, status: 'error'}));
    }
  }

  const removeDefend = () => {
    if(defendsToBeAdded > 0) {
      setDefendsToBeAdded(defendsToBeAdded - 1);
    } else {
      setDefendsToBeAdded(0);
    }
  }

  const onBuyDefends = () => {
    if(defendsToBeAdded > 0) {
      setSaveLoading(true);
      props.buyDefends(props.userId, defendsToBeAdded);
    }
  }

  return <div className={classes.window}>
    <div onClick={() => dispatch(hideBuyResourcesWindow())} className={classes.overlay}></div>
    <div className={classes.board}>
      <div onClick={() => dispatch(hideBuyResourcesWindow())} className={classes.close}>
        <img src={closeIcon} alt="Закрыть"/>
      </div>
      <h3>Покупка защит</h3>

      <div className={classes.moneyInfo}>
        У вас <span>{playerState.money}</span> монет <img src={coinIcon} alt="Монеты"/>
      </div>
      <div className={classes.buyDefend}>
        <button onClick={removeDefend}>-</button>
        <div className={classes.defendsCounter}>
          <img src={shieldIcon} alt="Защиты"/>
          <span>{defendsToBeAdded}</span>
        </div>
        <button onClick={addDefend}>+</button>
      </div>

      <div className={classes.buyButton}>
        <button onClick={onBuyDefends} disabled={!defendsToBeAdded || saveLoading}>
          {saveLoading
            ?
            'Обработка...'
            :
            'Купить'
          }
        </button>
      </div>
    </div>
  </div>
}

export default BuyResourcesWindow;
