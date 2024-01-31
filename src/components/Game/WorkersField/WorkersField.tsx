import classes from './WorkersField.module.scss';
import Field from "./Field/Field.tsx";
import {getActivePlayer, getCurrentPlayerState} from "../../../utils/game.ts";

function WorkersField (props: any) {

  const playerState = getCurrentPlayerState(props.game.playersState, props.userId);
  const workersSchemeArray = playerState.workers_positions_scheme.split(',');
  const activePlayerId = getActivePlayer(props.game).id;

  return <div className={classes.workers_field}>
    <Field
      key={'workers_field_1'}
      isActivePlayer={activePlayerId === props.userId}
      userId={props.userId}
      playersState={props.game.playersState}
      shiftChangeMode={props.game.shiftChangeMode}
      index={0}
      worker={workersSchemeArray[0] === '1'}
    />
    <Field
      key={'workers_field_2'}
      isActivePlayer={activePlayerId === props.userId}
      userId={props.userId}
      playersState={props.game.playersState}
      shiftChangeMode={props.game.shiftChangeMode}
      index={1}
      worker={workersSchemeArray[1] === '1'}
    />
    <Field
      key={'workers_field_3'}
      isActivePlayer={activePlayerId === props.userId}
      userId={props.userId}
      playersState={props.game.playersState}
      shiftChangeMode={props.game.shiftChangeMode}
      index={2}
      worker={workersSchemeArray[2] === '1'}
    />
    <Field
      key={'workers_field_4'}
      isActivePlayer={activePlayerId === props.userId}
      userId={props.userId}
      playersState={props.game.playersState}
      shiftChangeMode={props.game.shiftChangeMode}
      index={3}
      worker={workersSchemeArray[3] === '1'}
    />
    <Field
      key={'workers_field_5'}
      isActivePlayer={activePlayerId === props.userId}
      userId={props.userId}
      playersState={props.game.playersState}
      shiftChangeMode={props.game.shiftChangeMode}
      index={4}
      worker={workersSchemeArray[4] === '1'}
    />
    <Field
      key={'workers_field_6'}
      isActivePlayer={activePlayerId === props.userId}
      userId={props.userId}
      playersState={props.game.playersState}
      shiftChangeMode={props.game.shiftChangeMode}
      index={5}
      worker={workersSchemeArray[5] === '1'}
    />
  </div>
}

export default WorkersField;
