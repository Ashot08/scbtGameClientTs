import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import {Autoplay} from "swiper/modules";
import {useState} from "react";
import classes from './RouletteMobile.module.scss';

import groupLetalIcon from "./images/groupLetal.png";
import bonusIcon from "./images/bonus.png";
import hardIcon from "./images/hard.png";
import microIcon from "./images/micro.png";
import letalIcon from "./images/letal.png";
import lightIcon from "./images/light.png";
import groupIcon from "./images/group.png";

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
export default function RouletteMobile2() {
  const [swiper, setSwiper] = useState(null);
  function rollTo(index: number, speed = 3000) {
    if(swiper) {
      // @ts-expect-error: swiper
      swiper.slideTo(index, speed)
    }
  }

  const slides = data.map(el => <SwiperSlide className={classes.swiperSlide + ' ' + classes[el.class]}>
    <div className={classes.difficultly}>{el.category}</div>
    <div className={classes.slideImage}><img src={el.icon} alt={el.fullName}/></div>
  </SwiperSlide>)

  return (
    <>
      <button onClick={()=>rollTo(20)}>Roll!</button>
      <button onClick={()=>rollTo(2, 1)}>Back</button>
      <div style={{marginTop: 100, marginBottom: 100}}>
        <div className={classes.swiperWrapper}>
          <Swiper
            className={classes.swiper}
            spaceBetween={4}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => {
              console.log(swiper);
              setSwiper(swiper as any);
            }}
            allowTouchMove={false}
            initialSlide={2}
            speed={3000}
            modules={[Autoplay]}
            centeredSlides={true}
          >
            {...slides}
            {...slides}
            {...slides}
            {...slides}

          </Swiper>
        </div>
      </div>

    </>

  );
};
