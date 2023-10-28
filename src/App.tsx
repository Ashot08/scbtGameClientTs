import './App.css'
import ButtonAppBar from "./components/ButtonAppBar/ButtonAppBar.tsx";
import Notification from "./components/Notification/Notification.tsx";
//import Popup from "./components/Popup/Popup.tsx";
import {Route, Routes} from "react-router-dom";
import {logout, selectUserIsLogin, setUser} from "./store/reducers/userSlice.ts";
import {useAppDispatch, useAppSelector} from "./hooks.ts";
import StartPage from "./components/StartPage/StartPage.tsx";
import Game from "./components/Game/Game.tsx";
import {
  hide,
  selectNotificationIsShown,
  selectNotificationStatus,
  selectNotificationText
} from "./store/reducers/notificationSlice.ts";
import AuthController from "./controllers/AuthController.ts";
import {useEffect, useState} from "react";
import Token from "./utils/Token.ts";

function App() {
  const dispatch = useAppDispatch();
  const notificationText = useAppSelector(selectNotificationText);
  const notificationIsShown = useAppSelector(selectNotificationIsShown);
  const notificationStatus = useAppSelector(selectNotificationStatus);
  const [loading, setLoading] = useState(false);
  const isLogin = useAppSelector(selectUserIsLogin);
  const auth = () => {
    if(Token.getToken()) {
      setLoading(true);
      AuthController.fetchUser().then((res) => {
        console.log(res);
        if(res.user.id){
          dispatch(setUser(res));
        }
      }).catch(e => console.log(e))
        .finally(() => {
          setLoading(false);
        })
    }
  }

  useEffect(() => {
    auth();
  }, []);


  return (
    <>

      <ButtonAppBar
        buttonText={isLogin ? 'Выйти' : 'Войти'}
        buttonHandler={()=>{ dispatch(logout()) }}
        games={[]}
        //buttonHandler={isLogin ? () => dispatch(logout()) : ()=>{} }
        //games={games}
      />
      <Notification
        text={notificationText}
        status={notificationStatus}
        onClose={() => {
          dispatch(hide());
        }}
        isOpen={notificationIsShown}
      />

      {/*<Popup onClose={()=>dispatch(hidePopupAction())} data={popup} open={!!popup} />*/}
      {loading ?
        <div style={
          {
            position: 'absolute',
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }
        }>Loading...</div>
        :
        <Routes>
          <Route path='/' element={<StartPage />}/>
          <Route path='/game/:gameId?' element={<Game />}/>
        </Routes>
      }
    </>
  )
}

export default App
