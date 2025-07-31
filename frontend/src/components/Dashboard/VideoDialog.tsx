import { Dialog, DialogTitle, Button, MenuItem,Select, 
    FormControl } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { buttonStructure, dialogStructure, menuItemStyle } from '../../css/Style';

export default function ViedoDialog() {
    const [open, setOpen] = useState(false);
    const [room, setRoom] = useState('');
    const navigate = useNavigate();
    const availableRooms = [1, 2, 3, 4, 5, 6, 7, 8];

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

               <FormControl sx={{ width: '30%' }}>
                    <Select
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                        displayEmpty
                        sx={{ fontSize: '1.5rem' }}
                        MenuProps={{
                            PaperProps: {
                            sx: {
                                fontSize: '1.5rem'
                            }
                            }
                        }}
                    >

                        <MenuItem value="" disabled>
                            Select a room
                        </MenuItem>

                        {availableRooms.map((roomName) => (
                            <MenuItem
                            key={roomName}
                            value={roomName}
                            sx={menuItemStyle}
                            >
                            {`Room ${roomName}`}
                            </MenuItem>
                        ))}
                    </Select>

                </FormControl>


                <Button onClick={startVideo} {...buttonStructure} disabled={!room}>Start</Button>

                <Button {...buttonStructure} onClick={() =>  setOpen(false)}>Close</Button>
            </Dialog>
        </>
    )
}