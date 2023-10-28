import './App.css'
import ButtonAppBar from "./components/ButtonAppBar/ButtonAppBar.tsx";
import Notification from "./components/Notification/Notification.tsx";
//import Popup from "./components/Popup/Popup.tsx";
import {Route, Routes} from "react-router-dom";
import {selectUserIsLogin} from "./store/reducers/userSlice.ts";
import {useAppDispatch, useAppSelector} from "./hooks.ts";
import StartPage from "./components/StartPage/StartPage.tsx";
import Game from "./components/Game/Game.tsx";
import {
  hide,
  selectNotificationIsShown,
  selectNotificationStatus,
  selectNotificationText
} from "./store/reducers/notificationSlice.ts";

function App() {
  const dispatch = useAppDispatch();

  const notificationText = useAppSelector(selectNotificationText);
  const notificationIsShown = useAppSelector(selectNotificationIsShown);
  const notificationStatus = useAppSelector(selectNotificationStatus);

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
      <Notification
        text={notificationText}
        status={notificationStatus}
        onClose={(event: any, reason: any) => {
          if (reason === 'clickaway') {
            console.log(event);
            return;
          }
          dispatch(hide());
        }}
        isOpen={notificationIsShown}
      />

      {/*<Popup onClose={()=>dispatch(hidePopupAction())} data={popup} open={!!popup} />*/}

      <Routes>
        <Route path='/' element={<StartPage />}/>
        <Route path='/game/:gameId?' element={<Game />}/>
      </Routes>
    </>
  )
}

export default App
