import {Wheel} from 'react-custom-roulette';
import './Roulette.scss';
import arrowImage from './img/arrow.svg';
import {ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";
import bonusIcon from './img/icons/bonus.png';
import microIcon from './img/icons/micro.png';
import lightIcon from './img/icons/light.png';
import hardIcon from './img/icons/hard.png';
import groupIcon from './img/icons/group.png';
import letalIcon from './img/icons/letal.png';
import groupLetalIcon from './img/icons/group_letal.png';

import {mobileCheck} from "../../utils/mobileCheck.ts";

import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {selectGame} from "../../store/reducers/gameSlice.ts";
import {selectIsRoll, selectPrizeNumber, setMeta, stopRoll} from "../../store/reducers/rouletteSlice.ts";
import RouletteMobile2 from "../RouletteMobile/RouletteMobile2.tsx";
// import RouletteMobile from "../RouletteMobile/RouletteMobile.tsx";
import placeholder_1 from './img/placeholder_1.png';
import {selectGameInfoIsShown, showGameInfo} from "../../store/reducers/gameInfoSlice.ts";
import coinsIcon from './img/coins.png';
import alertIcon from './img/alert.png';

const data = [
  {
    option: 'Групповой, летальный',
    optionSize: 2,
    // image: {
    //     uri: '/src/assets/logo.svg',
    // },
    style: {
      backgroundColor: '#660000',
      fontSize: 14,
      textColor: '#fff'
    },
    fullName: 'Групповой, летальный НС',
    icon: groupLetalIcon,
    category: '6 + 1',
  },
  {
    option: 'Бонус',
    optionSize: 5,
    style: {
      backgroundColor: 'green',
      fontSize: 16,
      textColor: '#fff'
    },
    fullName: 'Бонус!',
    icon: bonusIcon,
    category: '',
  },
  {
    option: 'Тяжелый',
    optionSize: 4,
    style: {
      backgroundColor: '#c50000',
      fontSize: 16,
      textColor: '#fff'
    },
    fullName: 'Тяжелый НС',
    icon: hardIcon,
    category: '4',
  },
  {
    option: 'Микротравма',
    optionSize: 5,
    style: {
      backgroundColor: 'orange',
      fontSize: 16,
      textColor: '#333'
    },
    fullName: 'Микротравма',
    icon: microIcon,
    category: '1',
  },
  {
    option: 'Летальный',
    optionSize: 3,
    style: {
      backgroundColor: '#660000',
      fontSize: 16,
      textColor: '#fff'
    },
    fullName: 'Летальный НС',
    icon: letalIcon,
    category: '5',
  },
  {
    option: 'Легкий',
    optionSize: 5,
    style: {
      backgroundColor: '#ffae42',
      fontSize: 16,
      textColor: '#333'
    },
    fullName: 'Легкий НС',
    icon: lightIcon,
    category: '2',
  },
  {
    option: 'Групповой',
    optionSize: 5,
    style: {
      backgroundColor: '#c50000',
      fontSize: 16,
      textColor: '#fff'
    },
    fullName: 'Групповой НС',
    icon: groupIcon,
    category: '3 + 1',
  },
  {
    option: 'Микротравма',
    optionSize: 5,
    style: {
      backgroundColor: 'orange',
      fontSize: 16,
      textColor: '#333'
    },
    fullName: 'Микротравма',
    icon: microIcon,
    category: '1',
  },
]
export default function Roulette(props: any) {
  const mustSpin = useAppSelector(selectIsRoll);
  const prizeNumber = useAppSelector(selectPrizeNumber);
  const dispatch = useAppDispatch();
  const game = useAppSelector(selectGame);
  const gameInfoOpen = useAppSelector(selectGameInfoIsShown);
  //const [yourTurnWasShown, setYourTurnWasShown] = useState(false);

  // useEffect(() => {
  //     if(!yourTurnWasShown) {
  //         if (props.userId === props.activePlayer?.id) {
  //             dispatch(showPopup({title: 'Ваш ход', content: 'success'}));
  //             setYourTurnWasShown(true);
  //         }
  //     }
  // }, [game]);


  const onRoll = () => {
    props.handleSpinClick();
  }

  const onStopSpinning = () => {

    if (prizeNumber === undefined) return;

    let content: any = '';
    let disasterType: any = '';
    const status = data[prizeNumber].option === 'Бонус' ? 'success' : 'disaster';
    if (data[prizeNumber].option === 'Бонус') {
      content = <div>
        {
          props.activePlayer.id == props.userId
            ?
            <>
              <div>Ура!</div>
              <div>Вы получили</div>
            </>
            : <>
              <div>Игрок <strong>{props.activePlayer.name || props.activePlayer.username}</strong></div>
              <div>Получил</div>
            </>
        }

        <div style={{
          color: '#3894CE',
          fontSize: '28px',
          textTransform: 'uppercase', fontFamily: 'Oswald', fontWeight: 600
        }}>БОНУС
        </div>
      </div>
    } else {
      disasterType = data[prizeNumber].fullName;
      content = <div>
        {
          props.activePlayer.id == props.userId
            ? <div>Внимание!</div>
            : <div>У игрока <strong>{props.activePlayer.name || props.activePlayer.username}</strong></div>
        }
        <div>Может произойти</div>
        <div className={'disasterInfo'} style={{color: '#3894CE', fontSize: '18px', fontWeight: 600}}>
          <img src={alertIcon} alt="Опасность!"/>
          <div>
            <div className={'disasterType'}>{disasterType}</div>
            <div className={'disasterSubtitle'}>на производстве</div>
          </div>
        </div>
        <div style={{marginTop: 20}} className={'onlyMobile'}>Требуется активных защит: {data[prizeNumber].category}
          <div style={{marginTop: 10, marginBottom: 10}}>
            <img src={coinsIcon} alt="Требуется защит"/>
          </div>

          <div style={{fontSize: '12px', opacity: 0.4, paddingTop: 10, paddingBottom: 10, borderBottom: '2px solid #5554A0'}}>
            {props.activePlayer.id == props.userId
              ?
              'Чтобы избежать - отвечайте на вопросы'
              :
              'Отвечайте на вопросы, чтобы набрать дополнительные очки'
            }
          </div>
        </div>
      </div>;
    }

    dispatch(showGameInfo({
      title: '',
      status,
      content,
      needBonusesCount: data[prizeNumber].category,
      disasterType,
    }))

    // dispatch(showPopup({
    //         title: <>
    //             Ход  <strong>{props.activePlayer.name || props.activePlayer.username}</strong>
    //         </>,
    //         content: <BasicCard
    //             style={{textAlign: 'center'}}
    //             name={''}
    //             id={<div className={'roll_result_content'}>
    //                 <div>
    //                     <img src={data[prizeNumber].icon} alt={data[prizeNumber].fullName}/>
    //                 </div>
    //                 <div>
    //                     {data[prizeNumber].fullName}
    //                 </div>
    //                 <div style={{textTransform: 'none', color: '#000'}}>
    //                     {(prizeNumber === 1) ?
    //                         'Вы получаете 1 защиту'
    //                         :
    //                         'Тяжесть: ' + data[prizeNumber].category
    //                     }
    //
    //                 </div>
    //             </div>} />,
    //     }
    // ));

    dispatch(stopRoll());
    dispatch(setMeta({
        result: data[prizeNumber].fullName,
        playerName: props.activePlayer.name || props.activePlayer.username
      })
    );
  }

  return (
    <>


      {mobileCheck() ?
        <div style={{marginTop: 67}}>
          <RouletteMobile2 game={game} onStopSpinning={onStopSpinning} mustSpin={mustSpin} prizeNumber={prizeNumber}/>
          <div className={'mobileTopPanel'}>
            <div className={'mobileTopPanel_placeholder_1'}><img src={placeholder_1} alt=""/></div>
            {
              (props.activePlayer.id == props.userId || game.moderator == props.userId)
              &&
                <div>
                    <button style={{marginRight: 10}} className={'mobileRollButton'} disabled={mustSpin || gameInfoOpen}
                            onClick={props.onNextPlayer}>Передать ход
                    </button>
                    <button className={'mobileRollButton'} disabled={mustSpin || gameInfoOpen}
                            onClick={onRoll}>Крутить
                    </button>
                </div>
            }
          </div>
          {/*<RouletteMobile onStopSpinning={onStopSpinning} mustSpin={mustSpin} prizeNumber={prizeNumber}/>*/}
        </div>
        :
        <div className="rouletteWrapper">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber as number}
            data={data}
            innerRadius={8}
            radiusLineWidth={1}
            textDistance={55}
            spinDuration={0.4}
            pointerProps={{src: arrowImage}}
            onStopSpinning={onStopSpinning}
          />
        </div>
      }


      <div className="rouletteButtonWrapper">

        {
          (props.activePlayer.id == props.userId || game.moderator == props.userId)
          &&
            <ButtonGroup className={'rouletteButtons'} variant="contained"
                         aria-label="outlined primary button group">
                <Button disabled={mustSpin} onClick={onRoll}>Крутить</Button>
                <Button disabled={mustSpin} onClick={props.onNextPlayer}>Передать ход</Button>
            </ButtonGroup>
        }


      </div>


    </>
  )
}
