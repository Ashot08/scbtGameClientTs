import {useState} from 'react';
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";
import AuthController from "../../controllers/AuthController.ts";
import {useAppDispatch} from "../../hooks.ts";
import {show} from "../../store/reducers/notificationSlice.ts";

function Login () {
    const [playerUsernameInput, setPlayerUsernameInput] = useState('');
    const [playerPasswordInput, setPlayerPasswordInput] = useState('');
    const dispatch = useAppDispatch();
    // function setPlayerData(data: any){
    //     dispatch(login(data));
    // }

    return (
        <>
            <form onSubmit={
                (e) => {
                    e.preventDefault();
                    AuthController.login({
                        username: playerUsernameInput,
                        password: playerPasswordInput,
                    }).then(res => {
                        dispatch(show({text: res.text, status: res.status}))
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
                <Button sx={{width: '100%'}} type="submit" variant="contained">Войти</Button>
            </form>

        </>
    )
}

export default Login;
