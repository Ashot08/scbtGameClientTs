import {useState} from 'react';
import Box from "@mui/material/Box";
import {Tab, Tabs} from "@mui/material";


function Lobby () {
  const [activeTabNumber, setActiveTabNumber] = useState(0);

  const handleChange = (event: any, newValue: number) => {
    console.log(event);
    setActiveTabNumber(newValue);
  };

  return (
    <>
      <div style={{marginTop: 120}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTabNumber} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Игры" />
            <Tab label="Рейтинг" />
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

            </Box>
          )}
        </div>
      </div>
    </>
  )
}

export default Lobby;
