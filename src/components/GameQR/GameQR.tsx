import {Chip, ListItem, ListItemButton} from "@mui/material";
import QRCode from "react-qr-code";
import {hidePopup} from "../../store/reducers/popupSlice.ts";
import {Link} from "react-router-dom";
import {useAppDispatch} from "../../hooks.ts";

interface GameQRProps {
  gameId: any,
}
export const GameQR = (props: GameQRProps) => {

  const dispatch = useAppDispatch();

  return <>
    <ListItem sx={{p: 2, justifyContent: 'center'}} disableGutters>
      <div>Идентификатор игры: <Chip variant="outlined" label={props.gameId} /></div>
    </ListItem>


    <ListItem sx={{p: 2, justifyContent: 'center'}} disableGutters>
      <div>
        <QRCode value={document.location.origin  + '/game/' + props.gameId} />
      </div>
    </ListItem>
    <ListItem disableGutters>
      <ListItemButton
        autoFocus
        onClick={() => dispatch(hidePopup())}
      >
        Ссылка на игру:
        <Link to={document.location.origin + '/game/' + props.gameId}>
          {document.location.origin + '/game/' + props.gameId}
        </Link>
      </ListItemButton>
    </ListItem>
  </>
}
