import { Wheel } from 'react-custom-roulette';
import './Roulette.scss';
import arrowImage from './img/arrow.svg';
import BasicCard from "../Card/BasicCard.tsx";
// import {offRollAction} from "../../store/gameReducer.js";
import {ButtonGroup, ListItem, ListItemButton, ListItemIcon} from "@mui/material";
import Button from "@mui/material/Button";
import bonusIcon from './img/icons/bonus.png';
import microIcon from './img/icons/micro.png';
import lightIcon from './img/icons/light.png';
import hardIcon from './img/icons/hard.png';
import groupIcon from './img/icons/group.png';
import letalIcon from './img/icons/letal.png';
import groupLetalIcon from './img/icons/group_letal.png';
// import {clearAnswersStat} from "../../store/quizReducer.js";
import {mobileCheck} from "../../utils/mobileCheck.ts";
// import RouletteMobile from "../RouletteMobile/RouletteMobile.jsx";
import {hidePopup, showPopup} from "../../store/reducers/popupSlice.ts";
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {selectGame} from "../../store/reducers/gameSlice.ts";
import {selectIsRoll, selectPrizeNumber, setMeta, stopRoll} from "../../store/reducers/rouletteSlice.ts";
import List from "@mui/material/List";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DangerousIcon from "@mui/icons-material/Dangerous";
import RouletteMobile2 from "../RouletteMobile/RouletteMobile2.tsx";
import placeholder_1 from './img/placeholder_1.png';

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
export default function Roulette (props: any){
    const mustSpin = useAppSelector(selectIsRoll);
    const prizeNumber = useAppSelector(selectPrizeNumber);
    const dispatch = useAppDispatch();
    const game = useAppSelector(selectGame);
    //const [yourTurnWasShown, setYourTurnWasShown] = useState(false);

    // useEffect(() => {
    //     if(!yourTurnWasShown) {
    //         if (props.userId === props.activePlayer?.id) {
    //             dispatch(showPopup({title: 'Ваш ход', content: 'success'}));
    //             setYourTurnWasShown(true);
    //         }
    //     }
    // }, [game]);
    const onNextPlayer = () => {
        dispatch(showPopup({
            title: '',
            content:                             <BasicCard
              name={'Вы уверены, что хотите передать ход?'}
              id={`Вернуться к текущему ходу будет нельзя`}
              content={
                  <List>
                      <ListItem key={'sdfsa'} disablePadding>
                          <ListItemButton onClick={() => {
                             // setYourTurnWasShown(false);
                              props.onNextPlayer();
                          }}>
                              <ListItemIcon>
                                  <CheckCircleOutlineIcon/>
                              </ListItemIcon>
                              <Button sx={{my: 2}} type="submit"
                                      variant="contained">Да</Button>
                          </ListItemButton>
                      </ListItem>

                      <ListItem key={'sdfsa'} disablePadding>
                          <ListItemButton onClick={()=>dispatch(hidePopup())}>
                              <ListItemIcon>
                                  <DangerousIcon/>
                              </ListItemIcon>
                              <Button sx={{my: 2}} type="submit"
                                      variant="contained">Нет</Button>
                          </ListItemButton>
                      </ListItem>
                  </List>
              }
            />,
        }))
    }

    const onRoll = () => {
        props.handleSpinClick();
    }

    const onStopSpinning = () => {

        if(prizeNumber === undefined) return;
        dispatch(showPopup({
                title: <>
                    Ход  <strong>{props.activePlayer.name || props.activePlayer.username}</strong>
                </>,
                content: <BasicCard
                    style={{textAlign: 'center'}}
                    name={''}
                    id={<div className={'roll_result_content'}>
                        <div>
                            <img src={data[prizeNumber].icon} alt={data[prizeNumber].fullName}/>
                        </div>
                        <div>
                            {data[prizeNumber].fullName}
                        </div>
                        <div style={{textTransform: 'none', color: '#000'}}>
                            {(prizeNumber === 1) ?
                                'Вы получаете 1 защиту'
                                :
                                'Тяжесть: ' + data[prizeNumber].category
                            }

                        </div>
                    </div>} />,
            }
        ));

        dispatch(stopRoll());
        dispatch(setMeta({
            result: data[prizeNumber].fullName,
            playerName: props.activePlayer.name || props.activePlayer.username})
        );
    }

    return (
      <>


              {mobileCheck() ?
                <div>
                    <RouletteMobile2 onStopSpinning={onStopSpinning} mustSpin={mustSpin} prizeNumber={prizeNumber} />
                    <div className={'mobileTopPanel'}>
                        <div className={'mobileTopPanel_placeholder_1'}><img src={placeholder_1} alt=""/></div>
                        <button className={'mobileRollButton'} disabled={mustSpin} onClick={onRoll}>Крутить</button>
                    </div>

                </div>
                // <RouletteMobile onStopSpinning={onStopSpinning} mustSpin={mustSpin} prizeNumber={prizeNumber}/>
                :
                <div className="rouletteWrapper">
                    <Wheel
                      mustStartSpinning={mustSpin}
                      prizeNumber={prizeNumber as number}
                      data={data}
                      innerRadius={8}
                      radiusLineWidth={1}
                      textDistance={55}
                      spinDuration={0.2}
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
                    <Button disabled={mustSpin} onClick={onNextPlayer}>Передать ход</Button>
                </ButtonGroup>
              }


          </div>


      </>
    )
}
