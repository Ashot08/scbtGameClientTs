import {useState} from 'react';
import Box from "@mui/material/Box";
import {Tab, Tabs} from "@mui/material";
import Login from "../Login/Login.tsx";
import Register from "../Register/Register.tsx";
import classes from './Account.module.css';

function Account () {
  const [activeTabNumber, setActiveTabNumber] = useState(0);

  const handleChange = (event: any, newValue: number) => {
    console.log(event)
    setActiveTabNumber(newValue);
  };

  return (
    <>
      <div className={classes.account}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTabNumber} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Авторизация" />
            <Tab label="Регистрация" />
          </Tabs>
        </Box>

        <div
          role="tabpanel"
          hidden={activeTabNumber !== 0}
          id={`simple-tabpanel-${0}`}
          aria-labelledby={`simple-tab-${0}`}
        >
          {activeTabNumber === 0 && (
            <Box sx={{ p: 3 }}>
              <Login />
            </Box>
          )}
        </div>

        <div
          role="tabpanel"
          hidden={activeTabNumber !== 1}
          id={`simple-tabpanel-${1}`}
          aria-labelledby={`simple-tab-${1}`}
        >
          {activeTabNumber === 1 && (
            <Box sx={{ p: 3 }}>
              <Register />
            </Box>
          )}
        </div>
      </div>
    </>
  )
}

export default Account;
