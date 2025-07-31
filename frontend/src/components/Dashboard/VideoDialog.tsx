import { Dialog, DialogTitle, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { buttonStructure, dialogStructure, fieldStructure } from '../../css/Style';

export default function ViedoDialog() {
    const [open, setOpen] = useState(false);
    const [room, setRoom] = useState('');
    const navigate = useNavigate();

    function startVideo() {
        Cookies.set('room', room, { expires:  new Date(new Date().getTime() + 5 * 60 * 1000)});
        navigate('/video');
    }

    return (
        <>
            <Button {...buttonStructure} variant='contained' onClick={() => setOpen(true)}>
                Go To Video
            </Button>

            <Dialog {...dialogStructure} open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Choose Room For Video</DialogTitle>

                <TextField
                    {...fieldStructure}
                    label="Room"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                />

                <Button onClick={startVideo} {...buttonStructure}>Start</Button>

                <Button {...buttonStructure} onClick={() =>  setOpen(false)}>Close</Button>
            </Dialog>
        </>
    )
}