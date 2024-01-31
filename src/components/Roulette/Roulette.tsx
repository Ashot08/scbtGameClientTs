import {Wheel} from 'react-custom-roulette';
import './Roulette.scss';
import arrowImage from './img/arrow.svg';
import {ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";
import {mobileCheck} from "../../utils/mobileCheck.ts";

import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {selectGame} from "../../store/reducers/gameSlice.ts";
import {selectIsRoll, selectPrizeNumber, setMeta, stopRoll} from "../../store/reducers/rouletteSlice.ts";
import RouletteMobile2 from "../RouletteMobile/RouletteMobile2.tsx";
// import RouletteMobile from "../RouletteMobile/RouletteMobile.tsx";
import placeholder_1 from './img/placeholder_1.png';
import {selectGameInfoIsShown} from "../../store/reducers/gameInfoSlice.ts";

import {getCurrentPlayerState, getWorkersUsedOnFieldsCount} from "../../utils/game.ts";
import {data} from '../../constants/data.ts';


export default function Roulette(props: any) {
  const mustSpin = useAppSelector(selectIsRoll);
  const prizeNumber = useAppSelector(selectPrizeNumber);
  const dispatch = useAppDispatch();
  const game = useAppSelector(selectGame);
  const gameInfoOpen = useAppSelector(selectGameInfoIsShown);
  const playerState = getCurrentPlayerState(game.playersState, props.userId);
  // const activePlayerState = getCurrentPlayerState(game.playersState, props.activePlayer.id);
  const isRollAvailable = (props.activePlayer.id == props.userId) && getWorkersUsedOnFieldsCount(playerState) && (playerState.no_more_rolls === 'false');

  const onRoll = () => {
    props.handleSpinClick();
  }

  const onStopSpinning = () => {

    if (prizeNumber === undefined) return;


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
              ((game.shiftChangeMode === 'false') && (props.activePlayer.id == props.userId || game.moderator == props.userId))
              &&
                <div>
                  {
                    (playerState.no_more_rolls === 'true' || game.moderator == props.userId)
                    &&
                      <button style={{marginRight: 10}} className={'mobileRollButton'}
                              disabled={mustSpin || gameInfoOpen}
                              onClick={props.onNextPlayer}>Передать ход
                      </button>
                  }

                  {
                    isRollAvailable ? <button className={'mobileRollButton'} disabled={mustSpin || gameInfoOpen}
                                               onClick={onRoll}>Крутить
                    </button> : ''
                  }
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
          ((game.shiftChangeMode === 'false') && (props.activePlayer.id == props.userId || game.moderator == props.userId))
          &&
            <ButtonGroup className={'rouletteButtons'} variant="contained"
                         aria-label="outlined primary button group">
              {isRollAvailable &&
                  <Button disabled={mustSpin} onClick={onRoll}>Крутить</Button>
              }
              {
                (playerState.no_more_rolls === 'true' || game.moderator == props.userId)
                &&
                  <Button disabled={mustSpin} onClick={props.onNextPlayer}>Передать ход</Button>
              }

            </ButtonGroup>
        }


      </div>


    </>
  )
}
