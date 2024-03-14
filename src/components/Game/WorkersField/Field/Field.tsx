import classes from "./Field.module.scss";
import defendIcon from "./img/defend.svg";
import defendActiveIcon from "./img/shieldActive.svg";
import hexagonIcon from "./img/hexagon.svg";
// import hexagonActiveIcon from "./img/hexagon_active.svg";
import hexagonActiveIcon2 from "./img/hexagon_active.png";
import plusIcon from "./img/plus.svg";
import workerIcon from "./img/worker.svg";
import {useAppDispatch, useAppSelector} from "../../../../hooks.ts";
import {selectBuyWindowIndex, showBuyWindow} from "../../../../store/reducers/buyWindowSlice.ts";
import {
  getCurrentPlayerState,
  getWorkerDataByIndex,
} from "../../../../utils/game.ts";


function Field(props: any) {
  const dispatch = useAppDispatch();
  const selectedWorkerIndex = useAppSelector(selectBuyWindowIndex);
  const playerState = getCurrentPlayerState(props.playersState, props.userId);
  const workersData = getWorkerDataByIndex(playerState, props.index);
  const isActive = ((selectedWorkerIndex === props.index) && props.shiftChangeMode === 'true') ||
    (props.isActivePlayer && (props.index === playerState.active_worker) && props.shiftChangeMode === 'false')
  const isNeighbour = (playerState.next_worker_mode === 'true')
    && (props.index === playerState.next_worker_index)
    && (playerState.questions_to_next_worker_count > 0);
  const onFieldClick = () => {
    if(props.shiftChangeMode === 'true') {
      dispatch(showBuyWindow({index: props.index}));
    }
  }
  const Defends = () => {

    const defends = [];
    for(let i = 0; i < workersData.activeDefends; i++){
      defends.push(<div key={'defend_' + Math.random()} className={classes.defend}>
        <img src={defendActiveIcon} alt="Защита Активная"/>
      </div>);
    }
    for(let i = 0; i < (workersData.notActiveDefends); i++){
      defends.push(<div key={'defend_' + Math.random()} className={classes.defend}>
        <img src={defendIcon} alt="Защита Неактивная"/>
      </div>);
    }
    for(let i = 0; i < (6 - (workersData.notActiveDefends + workersData.activeDefends)); i++){
      defends.push(<div key={'defend_' + Math.random()} className={classes.defend + ' ' + classes.empty}>
        <img src={defendIcon} alt="Защита Пустая"/>
      </div>);
    }
    return defends;

  }

  return <div onClick={onFieldClick} className={classes.hexagon
    + ' '
    + classes['hexagon_' + props.index]
    + ' '
    + (isActive ? classes.active : '')
    + ' '
    + (isNeighbour ? classes.neighbour : '')
  }
  >
    <Defends/>
    <img src={(isActive) ? hexagonActiveIcon2 : hexagonIcon} alt="Поле"/>
    {props.worker
      ?
      <img className={classes.worker} src={workerIcon} alt="Рабочий"/>
      :
      <img className={classes.plus} src={plusIcon} alt="Добавить рабочего"/>
    }
  </div>
}

export default Field;
