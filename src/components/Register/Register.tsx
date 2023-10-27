import {useState} from 'react';
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";

function Register () {
  const [playerUsernameInput, setPlayerUsernameInput] = useState('');
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [playerEmailInput, setPlayerEmailInput] = useState('');
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
          setPlayerData({id: Math.random(), name: playerNameInput})
        }
      }>
        <TextField
          sx={{width: '100%', mb: 1}}
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
          sx={{width: '100%', mb: 1}}
          required={true}
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
          sx={{width: '100%', mb: 1}}
          required={true}
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
          sx={{width: '100%'}}
          required={true}
          onInput={(e: any) => setPlayerPasswordInput(e.target.value)}
          id="name-input"
          label="Ваше пароль"
          variant="outlined"
          type="password"
          name={'password'}
          value={playerPasswordInput}
        />
        <br/>
        <br/>
        <Button sx={{width: '100%'}} type="submit" variant="contained">Регистрация</Button>
      </form>
    </>
  )
}

export default Register;
