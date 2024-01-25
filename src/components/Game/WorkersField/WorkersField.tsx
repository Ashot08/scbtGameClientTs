import classes from './WorkersField.module.scss';
import Field from "./Field/Field.tsx";
import {getCurrentPlayerState} from "../../../utils/game.ts";

function WorkersField (props: any) {

  const playerState = getCurrentPlayerState(props.game.playersState, props.userId);
  const workersSchemeArray = playerState.workers_positions_scheme.split(',');

  return <div className={classes.workers_field}>
    <Field userId={props.userId} playersState={props.game.playersState} shiftChangeMode={props.game.shiftChangeMode} index={0} worker={workersSchemeArray[0] === '1'} />
    <Field userId={props.userId} playersState={props.game.playersState} shiftChangeMode={props.game.shiftChangeMode} index={1} worker={workersSchemeArray[1] === '1'} />
    <Field userId={props.userId} playersState={props.game.playersState} shiftChangeMode={props.game.shiftChangeMode} index={2} worker={workersSchemeArray[2] === '1'} />
    <Field userId={props.userId} playersState={props.game.playersState} shiftChangeMode={props.game.shiftChangeMode} index={3} worker={workersSchemeArray[3] === '1'} />
    <Field userId={props.userId} playersState={props.game.playersState} shiftChangeMode={props.game.shiftChangeMode} index={4} worker={workersSchemeArray[4] === '1'} />
    <Field userId={props.userId} playersState={props.game.playersState} shiftChangeMode={props.game.shiftChangeMode} index={5} worker={workersSchemeArray[5] === '1'} />
  </div>
}

export default WorkersField;
