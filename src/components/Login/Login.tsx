import {useState} from 'react';
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";
import {useAppDispatch} from "../../hooks.ts";
import {login} from "../../store/reducers/userSlice.ts";
import {show} from "../../store/reducers/notificationSlice.ts";
import classes from './Login.module.scss';

function Login () {
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [playerUsernameInput, setPlayerUsernameInput] = useState('');
    const [playerPasswordInput, setPlayerPasswordInput] = useState('');
    const dispatch = useAppDispatch();

    return (
        <>
            <div className={classes.formWrapper}>
                <form onSubmit={
                    (e) => {
                        e.preventDefault();
                        setSubmitDisabled(true);
                        dispatch(login({
                            username: playerUsernameInput,
                            password: playerPasswordInput,
                        })).then((res: any) => {
                            dispatch(show({text: res.payload.text, status: res.payload.status}));
                        }).finally(() => {
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
                      name={'name'}
                      value={playerUsernameInput}
                    />
                    <br/>
                    <TextField
                      className={'input'}
                      sx={{width: '100%'}}
                      required={true}
                      onInput={(e: any) => setPlayerPasswordInput(e.target.value)}
                      id="name-input"
                      label="Пароль"
                      variant="outlined"
                      type="password"
                      name={'name'}
                      value={playerPasswordInput}
                    />
                    <br/>
                    <br/>
                    <Button sx={{width: '100%'}} type="submit" variant="contained"
                            disabled={submitDisabled}>Войти</Button>
                </form>
            </div>
        </>
    )
}

export default Login;
