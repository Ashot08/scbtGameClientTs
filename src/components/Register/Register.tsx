import {useState} from 'react';
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";
import {setUser, signup} from "../../store/reducers/userSlice.ts";
import {show} from "../../store/reducers/notificationSlice.ts";
import {useAppDispatch} from "../../hooks.ts";
import Token from "../../utils/Token.ts";
import AuthController from "../../controllers/AuthController.ts";
import classes from "../Login/Login.module.scss";

function Register () {
  const [playerUsernameInput, setPlayerUsernameInput] = useState('');
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [playerEmailInput, setPlayerEmailInput] = useState('');
  const [playerPasswordInput, setPlayerPasswordInput] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className={classes.formWrapper}>
        <form onSubmit={
          (e) => {
            e.preventDefault();
            setSubmitDisabled(true);
            dispatch(signup({
              username: playerUsernameInput,
              password: playerPasswordInput,
              email: playerEmailInput,
              name: playerNameInput,
            }))
              .then((res: any) => {
                if (res.payload.errors) {
                  for (const i of res.payload.errors) {
                    dispatch(show({text: i.msg, status: res.payload.status}));
                  }
                } else {
                  dispatch(show({text: res.payload.text, status: res.payload.status}));
                }
                return res;
              })
              .then(() => {
                if (Token.getToken()) {
                  AuthController.fetchUser().then((res) => {
                    if (res.user.id) {
                      dispatch(setUser(res.user));
                    }
                  }).catch(e => console.log(e))
                }
              })
              .finally(() => {
                setSubmitDisabled(false);
              });
          }
        }>
          <TextField
            className={'input'}
            sx={{width: '100%', mb: 1.6}}
            required={true}
            onInput={(e: any) => setPlayerUsernameInput(e.target.value)}
            id="name-input"
            label="Логин"
            variant="outlined"
            type="text"
            name={'username'}
            value={playerUsernameInput}
          />
          <br/>
          <TextField
            className={'input'}
            sx={{width: '100%', mb: 1.6}}
            required={false}
            onInput={(e: any) => setPlayerNameInput(e.target.value)}
            id="name-input"
            label="Ваше имя"
            variant="outlined"
            type="text"
            name={'name'}
            value={playerNameInput}
          />
          <br/>
          <TextField
            className={'input'}
            sx={{width: '100%', mb: 1.6}}
            required={false}
            onInput={(e: any) => setPlayerEmailInput(e.target.value)}
            id="name-input"
            label="Ваше email"
            variant="outlined"
            type="email"
            name={'email'}
            value={playerEmailInput}
          />
          <br/>
          <TextField
            className={'input'}
            sx={{width: '100%'}}
            required={true}
            onInput={(e: any) => setPlayerPasswordInput(e.target.value)}
            id="name-input"
            label="Ваш пароль"
            variant="outlined"
            type="password"
            name={'password'}
            value={playerPasswordInput}
          />
          <br/>
          <br/>
          <Button sx={{width: '100%'}} type="submit" variant="contained" disabled={submitDisabled}>Регистрация</Button>
        </form>
      </div>
    </>
  )
}

export default Register;
