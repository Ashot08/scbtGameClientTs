import './App.css'
import ButtonAppBar from "./components/ButtonAppBar/ButtonAppBar.tsx";
//import Notification from "./components/Notification/Notification.tsx";
//import Popup from "./components/Popup/Popup.tsx";
import {Route, Routes} from "react-router-dom";
import {selectUserIsLogin} from "./store/reducers/userSlice.ts";
import {useAppSelector} from "./hooks.ts";
import StartPage from "./components/StartPage/StartPage.tsx";
import Game from "./components/Game/Game.tsx";

function App() {

  const isLogin = useAppSelector(selectUserIsLogin);

  return (
    <>
      <ButtonAppBar
        buttonText={isLogin ? 'Выйти' : 'Войти'}
        buttonHandler={()=>{}}
        games={[]}
        //buttonHandler={isLogin ? () => dispatch(logout()) : ()=>{} }
        //games={games}
      />
      {/*<Notification*/}
      {/*  text={notification?.text}*/}
      {/*  status={notification?.status}*/}
      {/*  onClose={(event, reason) => {*/}
      {/*    if (reason === 'clickaway') {*/}
      {/*      return;*/}
      {/*    }*/}
      {/*    dispatch(hideNotificationAction())*/}
      {/*  }}*/}
      {/*  isOpen={!!notification}*/}
      {/*/>*/}

      {/*<Popup onClose={()=>dispatch(hidePopupAction())} data={popup} open={!!popup} />*/}

      <Routes>
        <Route path='/' element={<StartPage />}/>
        <Route path='/game/:gameId?' element={<Game />}/>
      </Routes>
    </>
  )
}

export default App
