import {useState} from 'react';
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";
import AuthController from "../../controllers/AuthController.ts";

function Login () {
    const [playerUsernameInput, setPlayerUsernameInput] = useState('');
    const [playerPasswordInput, setPlayerPasswordInput] = useState('');
    function setPlayerData(data: any){
        console.log(data);
        //dispatch(login(data));
    }

    return (
        <>

            <form onSubmit={
                (e) => {
                    e.preventDefault();
                    AuthController.login({
                        username: playerUsernameInput,
                        password: playerPasswordInput,
                    }).then(res => console.log(res));
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
