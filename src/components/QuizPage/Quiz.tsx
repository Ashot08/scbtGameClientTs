import {quiz} from './quiz';
import {order} from './order';
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import Button from "@mui/material/Button";
import './quiz.css';
import {useEffect, useState} from "react";
// import {setAnswersStat} from "../../store/quizReducer.js";
// import {show} from "../../store/reducers/notificationSlice.ts";
import {useAppSelector} from "../../hooks.ts";
import {selectGame} from "../../store/reducers/gameSlice.ts";
import thinkingMan from './images/thinkingMan.png';

export const Quiz = () => {
  const game = useAppSelector(selectGame);
  const [questionNumber, setQuestionNumber] = useState(Math.floor(Math.random() * quiz.questions.length));
  const [answer, setAnswer] = useState('');
  const [answerStatus, setAnswerStatus] = useState('error');
  const [answerResultText, setAnswerResultText] = useState('');

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
    setAnswerStatus('in_process');
  }, [game, questionNumber]);

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
    setAnswerResultText(isSuccessAnswer ? 'Верно!' : 'Вы ошиблись!');
  }

  return <>
    <div className={'game_desk game_desk_centered'}>
      <div className={''}>
        <div className={'variants'}>
          <form style={{textAlign: 'left'}} onSubmit={onSubmit}>
            <FormControl sx={{width: '100%'}}>
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
                      />)
                  }

                </RadioGroup>
              </div>
            </FormControl>
            <div className={'answerButtonWrapper'}><Button
              sx={{color: '#fff', border: '1px solid rgba(255, 255, 255, 0.5)'}}
              disabled={answerStatus !== 'in_process'} type={'submit'}
              variant={'outlined'}>Ответить</Button></div>
            {
              (answerStatus !== 'in_process')
              &&
                <div className={'answerButtonWrapper'}>
                    <h3>{answerResultText}</h3>
                  {

                    <>
                      <div><Button className={'oneMoreQuestionButton'} sx={{backgroundColor: '#00ABAB'}}
                                   onClick={() => setQuestionNumber(Math.floor(Math.random() * quiz.questions.length))}
                                   variant={'contained'}>Взять ещё один вопрос</Button></div>
                    </>
                  }
                </div>

            }

          </form>


          <div className={'thinkingMan'}>
            <img src={thinkingMan} alt="Думающий человек"/>
          </div>
        </div>
      </div>
    </div>

  </>
}

