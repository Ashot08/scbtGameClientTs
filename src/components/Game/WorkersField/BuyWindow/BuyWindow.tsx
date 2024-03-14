import classes from "./BuyWindow.module.scss";
import {useAppDispatch, useAppSelector} from "../../../../hooks.ts";
import {hideBuyWindow, selectBuyWindowIndex, showBuyWindow} from "../../../../store/reducers/buyWindowSlice.ts";
import {
  getAvailableWorkers,
  getCurrentPlayerState,
  getLastTurn,
  getWorkerDataByIndex,
  getWorkersUsedOnFieldsCount
} from "../../../../utils/game.ts";
import hexagonIcon from './img/hexagon.png';
import shieldEmptyIcon from './img/shieldEmpty.png';
import shieldIcon from './img/shield.svg';
import shieldIconActive from './img/shieldActive.svg';
import workerEmptyIcon from './img/workerEmpty.svg';
import workerIcon from './img/worker.png';
import closeIcon from './img/close.svg';
import {useEffect, useState} from "react";
import {show} from "../../../../store/reducers/notificationSlice.ts";
import {hidePopup, showPopup} from "../../../../store/reducers/popupSlice.ts";
import BasicCard from "../../../Card/BasicCard.tsx";
import Button from "@mui/material/Button";
function BuyWindow (props: any) {
  const dispatch = useAppDispatch();
  const workerIndex = useAppSelector(selectBuyWindowIndex);
  const playerState = getCurrentPlayerState(props.playersState, props.userId);
  const [workerIsSet, setWorkerIsSet] = useState(false);
  const [addedDefendsCount, setAddedDefendsCount] = useState(0);
  const [saveLoading, setSaveLoading] = useState(false);
  const onClose = () => {
    dispatch(hideBuyWindow())
  }

  useEffect(() => {
    setWorkerIsSet(false);
    setAddedDefendsCount(0);
    setSaveLoading(false);
    // const workersData = getWorkerDataByIndex(playerState, workerIndex);
    // if(workersData.workerIsSet) {
    //   setWorkerIsSet(true);
    // }
  }, [workerIndex, playerState]);

  const workersData = getWorkerDataByIndex(playerState, workerIndex);
  const availableWorkersCount = getAvailableWorkers(playerState);

  const generateDefends = () => {
    const defends = [];
    for(let i = 0; i < workersData.activeDefends; i++){
      defends.push(<div className={classes.defend}>
        <img src={shieldIconActive} alt="Защита Активная"/>
      </div>);
    }
    for(let i = 0; i < (workersData.notActiveDefends + addedDefendsCount); i++){
      defends.push(<div className={classes.defend}>
        <img src={shieldIcon} alt="Защита Неактивная"/>
      </div>);
    }
    for(let i = 0; i < (6 - (workersData.notActiveDefends + workersData.activeDefends + addedDefendsCount)); i++){
      defends.push(<div onClick={onAddDefend} className={classes.defend}>
        <img src={shieldEmptyIcon} alt="Защита Пустая"/>
      </div>);
    }
    return defends;
  }

  const onSave = () => {
    if (!workerIsSet && !addedDefendsCount) return;

    setSaveLoading(true);
    props.updateWorkerData(
      props.userId, {
        workerIndex,
        addedDefendsCount,
        workerIsSet,
      });
  }

  const onSetWorker = () => {
    if (workersData.workerIsSet) return;
    if(!availableWorkersCount) return;

    if(getLastTurn(props.game)?.shift === 1) {
      const workersCount = getWorkersUsedOnFieldsCount(playerState);
      if(workersCount > 1) {
        dispatch(showPopup({
          title: '',
          content: <BasicCard
            name={'В первой смене нельзя выставить больше двух рабочих!'}
            id={``}
            content={<div style={{textAlign: 'center'}}>
              <Button onClick={() => {
                dispatch(hidePopup());
              }}
                      sx={{my: 2}} type="submit"
                      variant="contained">Ок</Button>
            </div>
            }
          />,
        }))
        return;
      }
    }

    setWorkerIsSet(!workerIsSet);
  }

  const onAddDefend = () => {
    if(addedDefendsCount >= 6 - (workersData.notActiveDefends + workersData.activeDefends)) return;
    if(addedDefendsCount >= 6) return;
    if(addedDefendsCount >= playerState.defends) {
      dispatch(show({text: 'Недостаточно защит!', status: 'error'}));
      return;
    }
    setAddedDefendsCount(addedDefendsCount + 1);
  }

  const onRefresh = () => {
    setWorkerIsSet(false);
    setAddedDefendsCount(0);
  }

  const nextWorker = () => {
    let newIndex = 0;
    if(workerIndex < 5) {
      newIndex = workerIndex + 1;
    }
    dispatch(showBuyWindow({index: newIndex}));
  }

  return <div className={classes.buyWindow}>
    <div onClick={() => dispatch(hideBuyWindow())} className={classes.close}>
      <img src={closeIcon} alt="Закрыть"/>
    </div>
    <div>
      <div>
        <div className={classes.board}>

          {generateDefends()}

          <div onClick={onSetWorker} className={classes.worker}>
            {(workerIsSet || workersData.workerIsSet)
              ?
              <img src={workerIcon} alt="Рабочий"/>
              :
              <img src={workerEmptyIcon} alt="Рабочий"/>
            }
          </div>

          <img className={classes.boardImage} src={hexagonIcon} alt="Фон"/>
        </div>
      </div>
      <div className={classes.buttons}>
        <button onClick={onClose}>Закрыть</button>
        {
          saveLoading
            ?
            <button disabled={true}>Сохранение...</button>
            :
            <button disabled={!workerIsSet && !addedDefendsCount} onClick={onSave}>Сохранить</button>
        }
        <button disabled={!workerIsSet && !addedDefendsCount} onClick={onRefresh}>Сброс</button>
        <button onClick={nextWorker}> {'-->'} </button>
      </div>
    </div>
  </div>;
}

export default BuyWindow;
