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
import {offTimer} from "../../store/reducers/quizSlice.ts";
import {selectGame} from "../../store/reducers/gameSlice.ts";
import {
    getCurrentAnswer, getCurrentPlayerAnswer,
    getCurrentPlayerProcessAnswer,
} from "../../utils/answers.ts";

export const Quiz = (props: any) => {
    const dispatch = useAppDispatch();
    const game = useAppSelector(selectGame);
    // const questionNumber = useSelector(state => state.game.game.question.question);
    const questionNumber = getCurrentAnswer(game)?.question_id;
    const [answer, setAnswer] = useState('');
    const [answerStatus, setAnswerStatus] = useState('error');
    const [answerResultText, setAnswerResultText] = useState('');


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
        setAnswerStatus(getCurrentPlayerAnswer(game, props.userId)?.status ?? 'in_process');
    }, [questionNumber]);

    const onSubmit = (e: any) => {
        e.preventDefault();
        const trueAnswer = quiz.questions[questionNumber].answers[ +quiz.questions[questionNumber]['correctAnswer'] - 1 ];

        if(!answer) {
            alert('Нужно выбрать ответ!');
            return;
        }

        const isSuccessAnswer = (answer == trueAnswer);

        setAnswerStatus(isSuccessAnswer ? 'success' : 'error');
        dispatch(show({
            text: isSuccessAnswer ? `Вы ответили правильно!` : `Вы ошиблись!`,
            status: isSuccessAnswer ? 'success' : 'error',
        }));
        if(getCurrentPlayerProcessAnswer(game, props.userId)) {
            props.updateAnswer(
              getCurrentPlayerProcessAnswer(game, props.userId)?.id,
              isSuccessAnswer ? 'success' : 'error'
            );
        }
        setAnswerResultText(isSuccessAnswer ? 'Верно!' : 'Вы ошиблись!');
    }

    const time = new Date();
    time.setSeconds(time.getSeconds() + 3);

    const onExpire = () => {
        dispatch(offTimer());
        if(getCurrentPlayerProcessAnswer(game, props.userId)) {
            props.updateAnswer(
              getCurrentPlayerProcessAnswer(game, props.userId)?.id,
              'error'
            );
            setAnswerResultText('Ответ неверный! (Вы не успели ответить).')
        }

        if(answerStatus !== 'success') {
            setAnswerStatus('error')
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
                                quiz.questions[questionNumber].answers.map(
                                  (a: any) => <FormControlLabel
                                    disabled={answerStatus !== 'in_process'}
                                    sx={{order: order[orderNumber][quiz.questions[questionNumber].answers.indexOf(a)]}}
                                    key={questionNumber + a} value={a} control={<Radio/>}
                                    label={a}
                                    // checked={
                                    //   getCurrentPlayerAnswer(game, props.userId).status === 'success'
                                    //   &&
                                    //   (quiz.questions[questionNumber].answers.indexOf(a) === 0)}
                                  />)
                            }

                        </RadioGroup>
                    </FormControl>

                    {
                      (game?.moderatorMode === '1' && props.userId === game?.moderator)
                      ?
                        <div>Игроки находятся в режиме ответов на вопросы...</div>
                      :
                      <Button disabled={answerStatus !== 'in_process'} type={'submit'}
                              variant={'contained'}>Ответить</Button>
                    }

                    {
                        props.quizTimer && <Timer expiryTimestamp={time} onExpire={onExpire} />
                    }

                    {
                        (answerStatus !== 'in_process')
                        &&
                        <div>
                            <h3>{answerResultText}</h3>
                            {props.isMyTurn && !props.timerOn && <Button disabled={props.quizTimer} onClick={props.startAnswers} variant={'contained'}>Взять ещё один вопрос</Button>}
                        </div>

                    }

                </form>
                }
            </div>
        </div>
    </>
}

