import { quiz } from './quiz';
import { order } from './order';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import Button from "@mui/material/Button";
import './quiz.css';
import {useEffect, useState} from "react";
// import {setAnswersStat} from "../../store/quizReducer.js";
import Timer from "../Timer/Timer.jsx";
import {show} from "../../store/reducers/notificationSlice.ts";
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {offTimer, onTimer} from "../../store/reducers/quizSlice.ts";
import {selectGame} from "../../store/reducers/gameSlice.ts";
import {
    getCurrentAnswer,
    getCurrentPlayerAnswer,
    isAnswersModeActive
} from "../../utils/answers.ts";

export const Quiz = (props: any) => {
    const dispatch = useAppDispatch();
    const game = useAppSelector(selectGame);
    // const questionNumber = useSelector(state => state.game.game.question.question);
    const questionNumber = getCurrentAnswer(game)?.question_id;
    const [answer, setAnswer] = useState('');
    const [answerStatus, setAnswerStatus] = useState('in_process');


    let orderNumber = 0;
    if(questionNumber < 150) {
        orderNumber = 1;
    }
    if(questionNumber <  110) {
        orderNumber = 2;
    }
    if(questionNumber <  60) {
        orderNumber = 2;
    }
    if(questionNumber < 30) {
        orderNumber = 0;
    }

    useEffect(() => {
        setAnswerStatus('in_process');

        dispatch(offTimer());

    }, [questionNumber]);

    const onSubmit = (e: any) => {
        e.preventDefault();
        const trueAnswer = quiz.questions[questionNumber].answers[ +quiz.questions[questionNumber]['correctAnswer'] - 1 ];

        if(!answer) {
            alert('Нужно выбрать ответ!');
            return;
        }

        dispatch(onTimer());

        if(answer == trueAnswer){
            setAnswerStatus('success');
            dispatch(show({
                text: `Вы ответили правильно!`,
                status: 'success'
            }))
            props.updateAnswer(
              getCurrentPlayerAnswer(game, props.userId)?.id,
              'success')
            // dispatch(setAnswersStat(1));
        }else{
            dispatch(show({
                text: `Вы ошиблись!`,
                status: 'error'
            }))
            // dispatch(setAnswersStat(0));
            setAnswerStatus('failed');
            props.updateAnswer(getCurrentPlayerAnswer(game, props.userId)?.id, 'error')
        }

    }

    const time = new Date();
    time.setSeconds(time.getSeconds() + 3);

    const onExpire = () => {
        dispatch(offTimer());
        if(answerStatus !== 'success') {
            setAnswerStatus('failed')
        }
    }

    return <>

        <div className={'quiz'}>
            <div className={'variants'}>
                {game?.answersMode === 'false'
                  &&
                <div>
                    {game.lastTurnRolls.length
                      ?
                      <div>
                          <h4>Готовы отвечать?</h4>
                          <Button onClick={props.startAnswers} disabled={false} variant={'contained'}>Старт!</Button>
                      </div>
                      :
                      <div>
                          <h4>Прежде чем отвечать, нужно покрутить рулетку!</h4>
                      </div>
                    }


                </div>}
                {game?.answersMode === 'true'
                  &&
                <form style={{textAlign: 'left'}} onSubmit={onSubmit}>
                    <FormControl sx={{width: '100%'}}>
                        <FormLabel id="demo-radio-buttons-group-label">{quiz.questions[questionNumber].question}</FormLabel>
                        <RadioGroup
                            sx={{display: 'grid'}}
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue=""
                            name="radio-buttons-group"
                            onChange={(e) => setAnswer(e.target.value)}
                        >
                            {
                                quiz.questions[questionNumber].answers.map((a: any) => <FormControlLabel sx={
                                    {
                                        order: order[orderNumber][quiz.questions[questionNumber].answers.indexOf(a)]
                                    }
                                } key={questionNumber + a} value={a} control={<Radio />} label={a} /> )
                            }

                        </RadioGroup>
                    </FormControl>

                    {
                        <Button disabled={answerStatus !== 'in_process'} type={'submit'} variant={'contained'}>Ответить</Button>
                    }

                    {
                        (getCurrentAnswer(game).status !== 'in_process') && <Timer expiryTimestamp={time} onExpire={onExpire} />
                    }

                    {
                        (answerStatus == 'success')
                        &&
                        <div>
                            <h3>Верно!</h3>
                            {props.isMyTurn && !props.timerOn && <Button disabled={props.quizTimer} onClick={props.startAnswers} variant={'contained'}>Взять ещё один вопрос</Button>}
                        </div>

                    }
                    {
                        (answerStatus == 'failed')
                        &&
                        <div>
                            <h3>Ответ неверный!</h3>
                            {props.isMyTurn && !props.timerOn && <Button disabled={props.quizTimer} onClick={props.startAnswers} variant={'contained'}>Взять ещё один вопрос</Button>}
                        </div>

                    }
                </form>
                }
            </div>
        </div>
    </>
}

