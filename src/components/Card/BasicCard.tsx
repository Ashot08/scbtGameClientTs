import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// const bull = (
//     <Box
//         component="span"
//         sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//     >
//         •
//     </Box>
// );

export default function BasicCard(props: any) {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {props.name}
                </Typography>
                <Typography variant="body2">
                    {props.id}
                </Typography>

                {props.content}

            </CardContent>
            {/*<CardActions>*/}
            {/*    <Button size="small">Learn More</Button>*/}
            {/*</CardActions>*/}
        </Card>
    );
}
