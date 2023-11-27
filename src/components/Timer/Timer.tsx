import { useTimer } from 'react-timer-hook';
import './timer.css';


// @ts-expect-error: any
function Timer({ expiryTimestamp, onExpire }) {
    const {
        // totalSeconds,
        seconds,
        // minutes,
        // hours,
        // days,
        // isRunning,
        // start,
        // pause,
        // resume,
        // restart,

    } = useTimer({ autoStart: true, expiryTimestamp, onExpire });



    return (
        <div className={'timer'}>

            {seconds}

        </div>
    );
}

export default Timer;
