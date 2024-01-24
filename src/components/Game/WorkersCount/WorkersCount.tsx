import classes from './WorkersCount.module.scss';
import {getCurrentPlayerState} from "../../../utils/game.ts";
import workerIcon from './img/worker.svg';
function WorkersCount(props: any) {
  const workersCount = getCurrentPlayerState(props.playersState, props.userId).workers_alive;
  const workers = [0,0,0,0,0,0];
  for (let i = 0; i < workersCount; i++) {
    workers[i] = 1;
  }

  return <div>
    <div className={classes.info}>Вам доступно <span>{workersCount}</span> рабочих</div>
    <div className={classes.workers_count}>
      {workers.map((w: number) => {
        if (w) {
          return <div className={classes.worker}>
            <img src={workerIcon} alt="Работник"/>
          </div>
        }
        return <div className={classes.worker + ' ' + classes.empty}>
          <img src={workerIcon} alt="Работник"/>
        </div>
      })}
    </div>
  </div>

}

export default WorkersCount;
