import classes from "./Field.module.scss";
import defendIcon from "./img/defend.svg";
import hexagonIcon from "./img/hexagon.svg";
import plusIcon from "./img/plus.svg";
import workerIcon from "./img/worker.svg";
import {useAppDispatch} from "../../../../hooks.ts";
import {showBuyWindow} from "../../../../store/reducers/buyWindowSlice.ts";

function Field(props: any) {
  const dispatch = useAppDispatch();
  const onFieldClick = () => {
    if(props.shiftChangeMode === 'true') {
      dispatch(showBuyWindow({index: props.index}))
    }
  }
  const Defends = () => {
    return <div className={classes.defends}>
      <div className={classes.defend}>
        <img className={classes.defendIcon} src={defendIcon} alt=""/>
      </div>
      <div className={classes.defend}>
        <img className={classes.defendIcon} src={defendIcon} alt=""/>
      </div>
      <div className={classes.defend}>
        <img className={classes.defendIcon} src={defendIcon} alt=""/>
      </div>
      <div className={classes.defend}>
        <img className={classes.defendIcon} src={defendIcon} alt=""/>
      </div>
      <div className={classes.defend}>
        <img className={classes.defendIcon} src={defendIcon} alt=""/>
      </div>
      <div className={classes.defend}>
        <img className={classes.defendIcon} src={defendIcon} alt=""/>
      </div>
    </div>
  }

  return <div onClick={onFieldClick} className={classes.hexagon + ' ' + classes['hexagon_' + props.index]}>
    <Defends/>
    <img src={hexagonIcon} alt="Поле"/>
    {props.worker
      ?
      <img className={classes.worker} src={workerIcon} alt="Рабочий"/>
      :
      <img className={classes.plus} src={plusIcon} alt="Добавить рабочего"/>
    }
  </div>
}

export default Field;
