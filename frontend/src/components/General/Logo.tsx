import logoImg from '../../assets/Logo.png'
import { Box } from '@mui/material';

function Logo() {
    const box = <Box
        component="img"
        src={logoImg}
        alt="GoldBank"
        sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 'auto',
            height: 100,
            m: 1
    }}
    />

    return (box);
}

export default Logo;