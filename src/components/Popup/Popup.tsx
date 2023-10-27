import List from '@mui/material/List';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';

interface PopupProps {
  onClose: () => void,
  data: {
    content?: JSX.Element,
    title?: JSX.Element,
  },
  open: boolean,
}
export default function Popup (props: PopupProps) {
    const { onClose, data, open } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle sx={{textAlign: 'left'}}>{data?.title}</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <List sx={{ pt: 0 }}>

                {data?.content}

            </List>
        </Dialog>
    );
}


