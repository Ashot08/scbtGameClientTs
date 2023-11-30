import './App.css'
import ButtonAppBar from "./components/ButtonAppBar/ButtonAppBar.tsx";
import Notification from "./components/Notification/Notification.tsx";
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
import {hidePopup, selectPopupContent, selectPopupIsShown} from "./store/reducers/popupSlice.ts";
import Popup from "./components/Popup/Popup.tsx";
import GameController from "./controllers/GameController.ts";
import Lobby from "./components/Lobby/Lobby.tsx";
import Personal from "./components/Personal/Personal.tsx";

function App() {
  const dispatch = useAppDispatch();
  const notificationText = useAppSelector(selectNotificationText);
  const notificationIsShown = useAppSelector(selectNotificationIsShown);
  const notificationStatus = useAppSelector(selectNotificationStatus);
  const popupContent = useAppSelector(selectPopupContent);
  const popupIsShown = useAppSelector(selectPopupIsShown);

  const [loading, setLoading] = useState(false);
  const isLogin = useAppSelector(selectUserIsLogin);
  const [games, setGames] = useState([]);
  const auth = () => {
    if(Token.getToken()) {
      setLoading(true);
      AuthController.fetchUser().then((res) => {
        if(res.user.id){
          dispatch(setUser(res.user));
        }
      }).catch(e => console.log(e))
        .finally(() => {
          setLoading(false);
        })
    }
  }

  async function getGames() {
    if(Token.getToken().id) {
      const games: any = await GameController.getGamesByPlayerId(Token.getToken().id);
      setGames(games.games.games);
    }
  }

  useEffect( () => {
    auth();

    getGames();

  }, []);


  return (
    <>

      <ButtonAppBar
        buttonText={isLogin ? 'Выйти' : 'Войти'}
        buttonHandler={()=>{ dispatch(logout()) }}
        games={games as never}
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

      {<Popup onClose={()=>dispatch(hidePopup())} data={popupContent} open={popupIsShown} />}

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
          <Route path='/game/:gameId?' element={<Game />} />
          <Route path='/lobby/' element={<Lobby />} />
          <Route path='/personal/' element={<Personal />} />
        </Routes>
      }
    </>
  )
}

export default App
