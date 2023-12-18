import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from './img/Menu.svg';
import Logo from './img/Logo.svg';
import HomeIcon from '@mui/icons-material/Home';
import TableBarIcon from '@mui/icons-material/TableBar';
import PersonIcon from '@mui/icons-material/Person';
import './ButtonAppBar.scss';

import {
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
} from "@mui/material";
import {useState} from "react";
import {ExpandLess, ExpandMore, StarBorder} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../hooks.ts";
import {selectUserIsLogin, selectUserLogin, selectUserName} from "../../store/reducers/userSlice.ts";

interface ButtonAppBarProps {
    games: [['one', {title: 'game 1'}], ['two', {title: 'game 1'}], ['three', {title: 'game 1'}]] | [],
    buttonText: string,
    buttonHandler: ()=>void,
}
export default function ButtonAppBar(props: ButtonAppBarProps) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const player = useAppSelector(selectUserLogin);
    const playerName = useAppSelector(selectUserName);
    const isLogin = useAppSelector(selectUserIsLogin);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenu = (event: any) => {
        if(event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="fixed">
                <div className={'container'}>
                    <Toolbar>
                        <IconButton
                          size="large"
                          edge="start"
                          color="inherit"
                          aria-label="menu"
                          sx={{mr: 2}}
                          onClick={handleMenu}
                        >
                            <img src={MenuIcon} alt="Меню"/>
                        </IconButton>

                        {(!isLogin)
                        ?
                        <img src={Logo} alt="Сибтруд Логотип компании"/>
                        :
                        <span className={'playerName'}>{playerName || player}</span>
                        }

                        <Menu
                          id="menu-appbar"
                          anchorEl={anchorEl}
                          anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                          }}
                          keepMounted
                          transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                          }}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >

                            <List
                              sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                              component="nav"
                              aria-labelledby="nested-list-subheader"
                            >
                                <ListItemButton onClick={() => {
                                    setOpen(!open);
                                }}>
                                    <ListItemIcon>
                                        <StarBorder/>
                                    </ListItemIcon>
                                    <ListItemText primary="Игры"/>
                                    {open ? <ExpandLess/> : <ExpandMore/>}
                                </ListItemButton>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {props.games && props.games.map((g: any) => {
                                            return (
                                              <ListItemButton key={'game' + g.id} sx={{pl: 4}}>
                                                  <Link to={'/game/' + g.id}>
                                                      <ListItemText primary={'Игра ' + g.title}/>
                                                  </Link>
                                              </ListItemButton>
                                            );
                                        })}

                                    </List>
                                </Collapse>

                                <Link to={'/lobby'}>
                                    <ListItemButton onClick={handleClose}>
                                        <ListItemIcon>
                                            <TableBarIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Лобби"/>
                                    </ListItemButton>
                                </Link>
                                <Link to={'/'}>
                                    <ListItemButton onClick={handleClose}>

                                        <ListItemIcon>
                                            <HomeIcon/>
                                        </ListItemIcon>
                                        <ListItemText sx={{color: 'rgba(0, 0, 0, 0.87)'}} primary="Главная"/>

                                    </ListItemButton>
                                </Link>
                                <Link to={'/personal'}>
                                    <ListItemButton onClick={handleClose}>
                                        <ListItemIcon>
                                            <PersonIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary="Личный кабинет"/>
                                    </ListItemButton>
                                </Link>
                            </List>

                        </Menu>

                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>

                        </Typography>

                        {props.buttonText === 'Войти'
                          ?
                          <Link to={'/'}>
                              <Button sx={{color: '#fff', fontFamily: 'Oswald'}} color="inherit">{props.buttonText}</Button>
                          </Link>
                          :
                          <Button sx={{color: '#fff', fontFamily: 'Oswald'}} onClick={props.buttonHandler} color="inherit">{props.buttonText}</Button>
                        }


                    </Toolbar>
                </div>
            </AppBar>
        </Box>
    );
}
