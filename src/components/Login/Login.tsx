import {useState} from 'react';
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";
import {useAppDispatch} from "../../hooks.ts";
import {login} from "../../store/reducers/userSlice.ts";
import {show} from "../../store/reducers/notificationSlice.ts";

function Login () {
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [playerUsernameInput, setPlayerUsernameInput] = useState('');
    const [playerPasswordInput, setPlayerPasswordInput] = useState('');
    const dispatch = useAppDispatch();

    return (
        <>
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
                    sx={{width: '100%', mb: 1}}
                    required={true}
                    onInput={(e:any) => setPlayerUsernameInput(e.target.value)}
                    id="name-input"
                    label="Ваш Логин"
                    variant="outlined"
                    type="text"
                    name={'name'}
                    value={playerUsernameInput}
                />
                <br/>
                <TextField
                  sx={{width: '100%'}}
                  required={true}
                  onInput={(e:any) => setPlayerPasswordInput(e.target.value)}
                  id="name-input"
                  label="Ваш пароль"
                  variant="outlined"
                  type="password"
                  name={'name'}
                  value={playerPasswordInput}
                />
                <br/>
                <br/>
                <Button sx={{width: '100%'}} type="submit" variant="contained" disabled={submitDisabled}>Войти</Button>
            </form>

        </>
    )
}

export default Login;
