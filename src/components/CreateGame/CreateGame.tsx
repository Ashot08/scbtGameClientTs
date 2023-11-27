import {
  Accordion, AccordionDetails, AccordionSummary,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel, FormGroup,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {createGame} from "../../store/reducers/gameSlice.ts";
import Token from "../../utils/Token.ts";
import {show} from "../../store/reducers/notificationSlice.ts";
import {useNavigate} from "react-router-dom";
import {showPopup} from "../../store/reducers/popupSlice.ts";
import {GameQR} from "../GameQR/GameQR.tsx";
import {selectUserLogin, selectUserName} from "../../store/reducers/userSlice.ts";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const CreateGame = () => {
  const [playersCount, setPlayersCount] = useState(3);
  const [gameTitle, setGameTitle] = useState('');
  const [moderatorMode, setModeratorMode] = useState(false);
  // const [gameIdInput, setGameIdInput] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onCreateGame = (e: any) => {
    e.preventDefault();
    setSubmitDisabled(true);

    try{
      const token = Token.getToken();
      const userId = token.id

      if(!userId || !token.token) {
        dispatch(show({text: 'Not authorized', status: 'error'}));
        return;
      }

      dispatch(createGame(
        {
          title: gameTitle,
          playersCount,
          moderator: userId,
          authorization: `Bearer ${token.token}`,
          moderatorMode
        }
      )).then((res: any) => {
        if(res.payload.errors) {
          for(const i of res.payload.errors){
            dispatch(show({text: i.msg, status: res.payload.status}));
          }
        }else{


          dispatch(show({text: res.payload.text, status: res.payload.status}));
          dispatch(showPopup({
            title: 'Игра создана',
            content: <GameQR gameId={res.payload.game_id} />
          }))
          if(res.payload.game_id) {
            navigate(`/game/${res.payload.game_id}`);
          }
        }
        return res;
      }).finally(() => {
        setSubmitDisabled(false);
      });
    } catch(error) {
      console.log(error);
    }


  }
  const player = useAppSelector(selectUserLogin);
  const playerName = useAppSelector(selectUserName);

  return (
    <>



      <List component="nav" aria-label="mailbox folders">
        <ListItem>
          <div>
            <TextField
              sx={{width: '100%'}}
              id="name-input"
              label="Добро пожаловать"
              variant="outlined"
              type="text"
              name={'name'}
              placeholder={'Добро пожаловать'}
              value={playerName ? playerName : player}
              disabled={true}
            />
            <FormControl sx={{my: 2}} fullWidth>
              <TextField
                sx={{width: '100%'}}
                id="game-title-input"
                label={'Название игры'}
                variant="outlined"
                type="text"
                name={'game-title'}
                placeholder={'Введите название'}
                value={gameTitle}
                onChange={(e) => setGameTitle(e.target.value)}
                required={true}
              />
            </FormControl>
            <FormControl sx={{my: 2}} fullWidth>
              <InputLabel id="demo-simple-select-label">Количество игроков</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={playersCount}
                label="Количество игроков"
                onChange={(e) => {
                  setPlayersCount(+e.target.value)
                }}
              >
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
              </Select>
              <FormControlLabel onChange={() => setModeratorMode(!moderatorMode)}
                                control={<Checkbox checked={moderatorMode}/>} label="Модератор"/>
            </FormControl>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Разделы вопросов</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Пожарная безопасность" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Первая помощь" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Охрана труда" />
                  </FormGroup>
                </Typography>
              </AccordionDetails>
            </Accordion>

            <form onSubmit={onCreateGame}>
              <Button disabled={submitDisabled} sx={{my: 2, width: '100%', textAlign: 'center'}} type="submit" variant="contained">Новая
                игра</Button>
            </form>
          </div>
        </ListItem>

        <Divider/>

        {/*<ListItem sx={{width: '100%'}} divider>*/}
        {/*  <div style={{width: '100%'}}>*/}
        {/*    <h4>Присоединиться к игре</h4>*/}
        {/*    <form onSubmit={joinGame} action="">*/}

        {/*      <div>*/}
        {/*        <label htmlFor="">*/}
        {/*          <TextField*/}
        {/*            sx={{width: "100%"}}*/}
        {/*            onInput={(e: any) => {*/}
        {/*              setGameIdInput('' + e.target.value);*/}
        {/*            }}*/}
        {/*            required={true}*/}
        {/*            id={'name-input'}*/}
        {/*            label={'Id игры'}*/}
        {/*            variant={'outlined'}*/}
        {/*            type={'text'}*/}
        {/*            name={'game_id'}*/}
        {/*          />*/}
        {/*        </label>*/}
        {/*      </div>*/}
        {/*      <Button disabled={submitDisabled} sx={{my: 2, width: '100%'}} type="submit"*/}
        {/*              variant="contained">Присоединиться</Button>*/}
        {/*    </form>*/}
        {/*  </div>*/}
        {/*</ListItem>*/}

      </List>

    </>
  );

}
