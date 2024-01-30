import groupLetalIcon from "../components/Roulette/img/icons/group_letal.png";
import bonusIcon from "../components/Roulette/img/icons/bonus.png";
import hardIcon from "../components/Roulette/img/icons/hard.png";
import microIcon from "../components/Roulette/img/icons/micro.png";
import letalIcon from "../components/Roulette/img/icons/letal.png";
import lightIcon from "../components/Roulette/img/icons/light.png";
import groupIcon from "../components/Roulette/img/icons/group.png";

export const data = [
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
