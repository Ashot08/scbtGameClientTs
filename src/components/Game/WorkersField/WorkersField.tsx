import classes from './WorkersField.module.scss';
import hexagonIcon from './img/hexagon.svg';

function WorkersField (props: any) {
  return <div className={classes.workers_field}>
    {props.userId}
    <div className={classes.hexagon + ' ' + classes.hexagon_0}>
      <img src={hexagonIcon} alt="Поле"/>
    </div>
    <div className={classes.hexagon + ' ' + classes.hexagon_1}>
      <img src={hexagonIcon} alt="Поле"/>
    </div>
  </div>
}

export default WorkersField;
