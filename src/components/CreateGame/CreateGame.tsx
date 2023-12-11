import {
  Accordion, AccordionDetails, AccordionSummary,
  Checkbox,
  // Divider,
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
import {useEffect, useState} from "react";
import {useAppDispatch} from "../../hooks.ts";
import {createGame} from "../../store/reducers/gameSlice.ts";
import Token from "../../utils/Token.ts";
import {show} from "../../store/reducers/notificationSlice.ts";
import {useNavigate} from "react-router-dom";
import {showPopup} from "../../store/reducers/popupSlice.ts";
import {GameQR} from "../GameQR/GameQR.tsx";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionApi from "../../api/QuestionApi.ts";
import classes from './CreateGame.module.scss';

export const CreateGame = () => {
  const [playersCount, setPlayersCount] = useState(3);
  const [gameTitle, setGameTitle] = useState('');
  const [moderatorMode, setModeratorMode] = useState(false);
  // const [gameIdInput, setGameIdInput] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [cats, setCats] = useState([]);
  const [checkedCats, setCheckedCats] = useState([] as number[]);

  useEffect(() => {
    getCats();
  }, []);
  const getCats = async () => {
    const result: any = await QuestionApi.getQuestionsCats(Token.getToken().token);
    if(Array.isArray(result?.cats)) {
      setCats(result?.cats);
      setCheckedCats([...result.cats.map((c: any) => c.id)])

      return result?.cats;
    }
    setCats([]);
    return [];
  }

  const changeCheckbox = (e: any) => {
    if(e.target.checked) {
      setCheckedCats([
        ...checkedCats,
        +e.target.value
      ])
    } else {
      setCheckedCats([
        ...checkedCats.filter(id => id !== +e.target.value),
      ])
    }
  }
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
          moderatorMode,
          questionsCats: checkedCats,
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

  return (
    <>
      <div className={classes.createGame}>
        <List component="nav" aria-label="mailbox folders">
          <ListItem>
            <div>

              <h1>
                Новая игра
              </h1>

              <FormControl sx={{mb: 3.2}} fullWidth>
                <TextField
                  className={'input standard'}
                  sx={{width: '100%'}}
                  id="game-title-input"
                  label={'Название игры'}
                  variant="standard"
                  type="text"
                  name={'game-title'}
                  placeholder={'Введите название'}
                  value={gameTitle}
                  onChange={(e) => setGameTitle(e.target.value)}
                  required={true}
                />
              </FormControl>
              <FormControl className={'select'} sx={{mb: 1.6}} fullWidth>
                <InputLabel id="demo-simple-select-label">Количество игроков</InputLabel>
                <Select
                  className={'select'}
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
              </FormControl>

              <FormControl className={'select'} sx={{mb: 1.6}}>
                <FormControlLabel onChange={() => setModeratorMode(!moderatorMode)}
                                  control={<Checkbox checked={moderatorMode}/>}
                                  label="Модератор"
                />
              </FormControl>


              <Accordion className={classes.questionsCatsAccordion}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon/>}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Разделы вопросов</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <FormGroup>
                      {cats.map((c: any) => <FormControlLabel key={`${c.title}_${c.id}`}
                                                              control={<Checkbox onChange={changeCheckbox} value={c.id}
                                                                                 checked={checkedCats.includes(c.id)}/>}
                                                              label={c.title}/>)}
                    </FormGroup>
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <form onSubmit={onCreateGame}>
                <Button disabled={submitDisabled} sx={{my: 2, width: '100%', textAlign: 'center'}} type="submit"
                        variant="contained">Создать
                </Button>
              </form>
            </div>
          </ListItem>

          {/*<Divider/>*/}

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
      </div>
    </>
  );

}
