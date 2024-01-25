import classes from "./Field.module.scss";
import defendIcon from "./img/defend.svg";
import defendActiveIcon from "./img/shieldActive.svg";
import hexagonIcon from "./img/hexagon.svg";
import hexagonActiveIcon from "./img/hexagon_active.svg";
import plusIcon from "./img/plus.svg";
import workerIcon from "./img/worker.svg";
import {useAppDispatch, useAppSelector} from "../../../../hooks.ts";
import {selectBuyWindowIndex, showBuyWindow} from "../../../../store/reducers/buyWindowSlice.ts";
import {getCurrentPlayerState, getWorkerDataByIndex} from "../../../../utils/game.ts";

function Field(props: any) {
  const dispatch = useAppDispatch();
  const selectedWorkerIndex = useAppSelector(selectBuyWindowIndex);
  const playerState = getCurrentPlayerState(props.playersState, props.userId);
  const workersData = getWorkerDataByIndex(playerState, props.index);
  const onFieldClick = () => {
    if(props.shiftChangeMode === 'true') {
      dispatch(showBuyWindow({index: props.index}))
    }
  }
  const Defends = () => {

    const defends = [];
    for(let i = 0; i < workersData.activeDefends; i++){
      defends.push(<div className={classes.defend}>
        <img src={defendActiveIcon} alt="Защита Активная"/>
      </div>);
    }
    for(let i = 0; i < (workersData.notActiveDefends); i++){
      defends.push(<div className={classes.defend}>
        <img src={defendIcon} alt="Защита Неактивная"/>
      </div>);
    }
    for(let i = 0; i < (6 - (workersData.notActiveDefends + workersData.activeDefends)); i++){
      defends.push(<div className={classes.defend + ' ' + classes.empty}>
        <img src={defendIcon} alt="Защита Пустая"/>
      </div>);
    }
    return defends;

  }

  return <div onClick={onFieldClick} className={classes.hexagon + ' ' + classes['hexagon_' + props.index] + ' ' + (selectedWorkerIndex === props.index ? classes.active : '')}>
    <Defends/>
    <img src={(selectedWorkerIndex === props.index) ? hexagonActiveIcon : hexagonIcon} alt="Поле"/>
    {props.worker
      ?
      <img className={classes.worker} src={workerIcon} alt="Рабочий"/>
      :
      <img className={classes.plus} src={plusIcon} alt="Добавить рабочего"/>
    }
  </div>
}

export default Field;
