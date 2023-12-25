import {quiz} from './quiz';
import {order} from './order';
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import Button from "@mui/material/Button";
import './quiz.css';
import {useEffect, useState} from "react";
// import {setAnswersStat} from "../../store/quizReducer.js";
import Timer from "../Timer/Timer.jsx";
// import {show} from "../../store/reducers/notificationSlice.ts";
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {offTimer} from "../../store/reducers/quizSlice.ts";
import {selectGame} from "../../store/reducers/gameSlice.ts";
import {
  getCurrentAnswer, getCurrentPlayerAnswer,
  getCurrentPlayerProcessAnswer,
} from "../../utils/answers.ts";
import thinkingMan from './images/thinkingMan.png';

export const Quiz = (props: any) => {
  const dispatch = useAppDispatch();
  const game = useAppSelector(selectGame);
  const questionNumber = getCurrentAnswer(game)?.question_id;
  const [answer, setAnswer] = useState('');
  const [answerStatus, setAnswerStatus] = useState('error');
  const [answerResultText, setAnswerResultText] = useState('');
  const [oneMoreQuestionDisabled, setOneMoreQuestionDisabled] = useState(true);

  let orderNumber = 0;
  if (questionNumber < 400) {
    orderNumber = 1;
  }
  if (questionNumber < 390) {
    orderNumber = 2;
  }
  if (questionNumber < 280) {
    orderNumber = 3;
  }
  if (questionNumber < 270) {
    orderNumber = 0;
  }
  if (questionNumber < 260) {
    orderNumber = 1;
  }
  if (questionNumber < 250) {
    orderNumber = 2;
  }
  if (questionNumber < 240) {
    orderNumber = 3;
  }
  if (questionNumber < 230) {
    orderNumber = 0;
  }
  if (questionNumber < 220) {
    orderNumber = 1;
  }
  if (questionNumber < 210) {
    orderNumber = 2;
  }
  if (questionNumber < 200) {
    orderNumber = 3;
  }
  if (questionNumber < 190) {
    orderNumber = 0;
  }
  if (questionNumber < 180) {
    orderNumber = 1;
  }
  if (questionNumber < 170) {
    orderNumber = 2;
  }
  if (questionNumber < 160) {
    orderNumber = 3;
  }
  if (questionNumber < 150) {
    orderNumber = 0;
  }
  if (questionNumber < 140) {
    orderNumber = 1;
  }
  if (questionNumber < 130) {
    orderNumber = 2;
  }
  if (questionNumber < 120) {
    orderNumber = 3;
  }
  if (questionNumber < 110) {
    orderNumber = 0;
  }
  if (questionNumber < 100) {
    orderNumber = 1;
  }
  if (questionNumber < 90) {
    orderNumber = 2;
  }
  if (questionNumber < 80) {
    orderNumber = 3;
  }
  if (questionNumber < 70) {
    orderNumber = 0;
  }
  if (questionNumber < 60) {
    orderNumber = 1;
  }
  if (questionNumber < 50) {
    orderNumber = 2;
  }
  if (questionNumber < 40) {
    orderNumber = 3;
  }
  if (questionNumber < 30) {
    orderNumber = 0;
  }
  if (questionNumber < 20) {
    orderNumber = 1;
  }
  if (questionNumber < 10) {
    orderNumber = 2;
  }
  if (questionNumber < 5) {
    orderNumber = 3;
  }


  useEffect(() => {
    setAnswerStatus(getCurrentPlayerAnswer(game, props.userId)?.status ?? 'in_process');
    setTimeout(function () {
      setOneMoreQuestionDisabled(false);
    }, 3000);
  }, [questionNumber, game]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    const trueAnswer = quiz.questions[questionNumber].answers[+quiz.questions[questionNumber]['correctAnswer'] - 1];

    if (!answer) {
      alert('Нужно выбрать ответ!');
      return;
    }

    const isSuccessAnswer = (answer == trueAnswer);

    setAnswerStatus(isSuccessAnswer ? 'success' : 'error');
    // dispatch(show({
    //   text: isSuccessAnswer ? `Вы ответили правильно!` : `Вы ошиблись!`,
    //   status: isSuccessAnswer ? 'success' : 'error',
    // }));
    if (getCurrentPlayerProcessAnswer(game, props.userId)) {
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
    if(answer) {
      onSubmit({preventDefault: ()=>{}});
    } else {
      if (getCurrentPlayerProcessAnswer(game, props.userId)) {
        props.updateAnswer(
          getCurrentPlayerProcessAnswer(game, props.userId)?.id,
          'error'
        );
        setAnswerResultText('Ответ неверный! (Вы не успели ответить).')
      }
    }

    if (answerStatus !== 'success') {
      setAnswerStatus('error')
    }
    setAnswer('');
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
                  <Button sx={{backgroundColor: '#c0392b', marginRight: 4}} onClick={props.startAnswers} disabled={false}
                          variant={'contained'}>Старт!</Button>

                  <div>
                    <Button sx={{backgroundColor: '#00ABAB', marginTop: 1}} onClick={props.onHideQuiz} disabled={false}
                            variant={'contained'}>Перейти к рулетке</Button>
                  </div>
                </div>
                :
                <div>
                  <h4>Прежде чем отвечать, нужно покрутить рулетку!</h4>

                  <div className={'onlyMobile'}>
                    <Button sx={{backgroundColor: '#00ABAB', marginTop: 1}}
                            onClick={props.onHideQuiz} disabled={false}
                            variant={'contained'}>Перейти к рулетке</Button>
                  </div>
                </div>
              }


            </div>}
        {game?.answersMode === 'true'
          &&
            <form style={{textAlign: 'left'}} onSubmit={onSubmit}>
                <FormControl sx={{width: '100%'}}>
                {/*<FormLabel sx={{color: '#fff'}} id="demo-radio-buttons-group-label">{quiz.questions[questionNumber]?.question}</FormLabel>*/}
                    <div className={'questionNumber'}>Вопрос №{questionNumber}</div>
                    <div className={'questionText'}>{quiz.questions[questionNumber]?.question}</div>
                    <div className={'questionsWrapper'}>
                        <RadioGroup
                            sx={{display: 'grid'}}
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue=""
                            name="radio-buttons-group"
                            onChange={(e) => setAnswer(e.target.value)}
                        >
                          {
                            quiz.questions[questionNumber]?.answers.map(
                              (a: any) => <FormControlLabel
                                disabled={answerStatus !== 'in_process'}
                                sx={{
                                  order: order[orderNumber][quiz.questions[questionNumber].answers.indexOf(a)],
                                }}
                                key={questionNumber + a} value={a} control={<Radio/>}
                                label={a}
                                // checked={
                                //   getCurrentPlayerAnswer(game, props.userId).status === 'success'
                                //   &&
                                //   (quiz.questions[questionNumber].answers.indexOf(a) === 0)}
                              />)
                          }

                        </RadioGroup>
                    </div>
                </FormControl>

              {
                (game?.moderatorMode === '1' && props.userId === game?.moderator)
                  ?
                  <div>Игроки находятся в режиме ответов на вопросы...</div>
                  :
                  <div className={'answerButtonWrapper'}><Button
                    sx={{color: '#fff', border: '1px solid rgba(255, 255, 255, 0.5)'}}
                    disabled={answerStatus !== 'in_process'} type={'submit'}
                    variant={'outlined'}>Ответить</Button></div>
              }

              {
                props.quizTimer &&
                  <div className={'timerWrapper'}><Timer expiryTimestamp={time} onExpire={onExpire}/></div>
              }

              {
                (answerStatus !== 'in_process')
                &&
                  <div className={'answerButtonWrapper'}>
                      <h3>{answerResultText}</h3>
                    {
                      props.isMyTurn && !props.timerOn &&
                        <>
                            <div><Button className={'oneMoreQuestionButton'} sx={{backgroundColor: '#00ABAB'}} disabled={props.quizTimer || oneMoreQuestionDisabled} onClick={props.startAnswers}
                                         variant={'contained'}>Взять ещё один вопрос</Button></div>
                            <div className={'onlyMobile'}><Button className={'oneMoreQuestionButton'} sx={{marginTop: 2}} onClick={props.onHideQuiz} disabled={props.quizTimer}
                                         variant={'contained'}>Завершить</Button></div>
                        </>
                    }
                  </div>

              }

            </form>
        }

        <div className={'thinkingMan'}>
          <img src={thinkingMan} alt="Думающий человек"/>
        </div>
      </div>
    </div>
  </>
}

