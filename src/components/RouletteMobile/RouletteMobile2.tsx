import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {useEffect, useState} from "react";
import classes from './RouletteMobile.module.scss';
import './RouletteMobile.scss';

import groupLetalIcon from "./images/groupLetal.png";
import bonusIcon from "./images/bonus.png";
import hardIcon from "./images/hard.png";
import microIcon from "./images/micro.png";
import letalIcon from "./images/letal.png";
import lightIcon from "./images/light.png";
import groupIcon from "./images/group.png";
import defendIcon from "./images/defend.png";
import arrowIcon from "./images/arrow.png";
import {useAppSelector} from "../../hooks.ts";
import {selectGameInfoIsShown} from "../../store/reducers/gameInfoSlice.ts";

const data = [
  {
    option: 'Групповой, летальный',
    optionSize: 2,
    style: {
      background: 'linear-gradient(180deg, #CB101B 0%, #584282 100%);',
    },
    fullName: 'Групповой, летальный НС',
    icon: groupLetalIcon,
    category: '6 + 1',
    class: 'groupLetal'
  },
  {
    option: 'Бонус',
    optionSize: 5,
    style: {
      background: 'linear-gradient(180deg, #39BC89 0%, #414283 100%);',
    },
    fullName: 'Бонус!',
    icon: bonusIcon,
    category: '',
    class: 'bonus'
  },
  {
    option: 'Тяжелый',
    optionSize: 4,
    style: {
      background: 'linear-gradient(180deg, #9F6EF4 0%, #414283 100%);'
    },
    fullName: 'Тяжелый НС',
    icon: hardIcon,
    category: '4',
    class: 'hard'
  },
  {
    option: 'Микротравма',
    optionSize: 5,
    style: {
      background: 'linear-gradient(180deg, #FAA406 0%, #414283 100%);'
    },
    fullName: 'Микротравма',
    icon: microIcon,
    category: '1',
    class: 'micro'
  },
  {
    option: 'Летальный',
    optionSize: 3,
    style: {
      background: 'linear-gradient(180deg, #F64747 0%, #414283 100%);'
    },
    fullName: 'Летальный НС',
    icon: letalIcon,
    category: '5',
    class: 'letal'
  },
  {
    option: 'Легкий',
    optionSize: 5,
    style: {
      background: 'linear-gradient(180deg, #5DADF9 0%, #414283 100%);'
    },
    fullName: 'Легкий НС',
    icon: lightIcon,
    category: '2',
    class: 'light'
  },
  {
    option: 'Групповой',
    optionSize: 5,
    style: {
      background: 'linear-gradient(180deg, #E660BF 0%, #464284 100%);'
    },
    fullName: 'Групповой НС',
    icon: groupIcon,
    category: '3 + 1',
    class: 'group'
  },
  {
    option: 'Микротравма',
    optionSize: 5,
    style: {
      background: 'linear-gradient(180deg, #FAA406 0%, #414283 100%);'
    },
    fullName: 'Микротравма',
    icon: microIcon,
    category: '1',
    class: 'micro'
  },
]
export default function RouletteMobile2(props: any) {
  const [swiper, setSwiper] = useState(null);
  // const [blur, setBlur] = useState(false);
  const gameInfoOpen = useAppSelector(selectGameInfoIsShown);

  useEffect(() => {
    if (!props.mustSpin) {
      return;
    }
    rollTo(2, 0);
    setTimeout(()=> {
      rollTo(props.prizeNumber + 8);
    }, 200)

  }, [props.prizeNumber, props.mustSpin]);

  function rollTo(index: number, speed = 3000) {
    if(swiper) {
      // @ts-expect-error: swiper
      swiper.slideTo(index, speed);
    }
  }

  function getSlides () {
    return data.map((el) => <SwiperSlide key={el.class + '_' + Math.random()} className={classes.swiperSlide + ' ' + classes[el.class]}>
      {
        el.category
          ?
          <div className={classes.difficultly}>
            <span>{el.category}</span>
            <img src={defendIcon} alt="Тяжесть"/>
          </div>
          :
          ''
      }
      <div className={classes.slideImage}><img src={el.icon} alt={el.fullName}/></div>
      <div className={classes.slideName}>{el.option}</div>
    </SwiperSlide>)
  }
  return (
    <>
      <div className={gameInfoOpen ? 'blur' : ''} style={{marginTop: 67, marginBottom: 16}}>
        <div className={classes.swiperWrapper}>
          <div className={classes.swiperArrow}>
            <img src={arrowIcon} alt="Стрелка"/>
          </div>
          <Swiper
            className={classes.swiper}
            spaceBetween={4}
            // slidesPerView={3}
            slidesPerView={'auto'}
            onSlideChange={() => console.log('slide change')}
            onSlideNextTransitionEnd={() => {
              if(props.mustSpin) {
                props.onStopSpinning();
              }
            }}
            onSwiper={(swiper) => {
              setSwiper(swiper as any);
            }}
            allowTouchMove={false}
            initialSlide={2}
            // speed={10000}
            centeredSlides={true}
          >
            {...getSlides()}
            {...getSlides()}
            {/*{...getSlides()}*/}
            {/*{...getSlides()}*/}
            {/*{...getSlides()}*/}
            {/*{...getSlides()}*/}
            {/*{...getSlides()}*/}
            {/*{...getSlides()}*/}
            <SwiperSlide key={data[0].class + '_' + Math.random()} className={classes.swiperSlide + ' ' + classes[data[0].class]}>
                  <div className={classes.difficultly}>
                    <span>{data[0].category}</span>
                    <img src={defendIcon} alt="Тяжесть"/>
                  </div>
              <div className={classes.slideImage}><img src={data[0].icon} alt={data[0].fullName}/></div>
              <div className={classes.slideName}>{data[0].option}</div>
            </SwiperSlide>
            <SwiperSlide key={data[1].class + '_' + Math.random()} className={classes.swiperSlide + ' ' + classes[data[1].class]}>

              <div className={classes.slideImage}><img src={data[1].icon} alt={data[1].fullName}/></div>
              <div className={classes.slideName}>{data[1].option}</div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

    </>

  );
}
