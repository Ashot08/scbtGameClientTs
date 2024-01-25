import classes from './WorkersField.module.scss';
import Field from "./Field/Field.tsx";


function WorkersField (props: any) {



  return <div className={classes.workers_field}>

    <Field shiftChangeMode={props.game.shiftChangeMode} index={0} worker={true} />
    <Field shiftChangeMode={props.game.shiftChangeMode} index={1} />
    <Field shiftChangeMode={props.game.shiftChangeMode} index={2} />
    <Field shiftChangeMode={props.game.shiftChangeMode} index={3} />
    <Field shiftChangeMode={props.game.shiftChangeMode} index={4} />
    <Field shiftChangeMode={props.game.shiftChangeMode} index={5} />

  </div>
}

export default WorkersField;
