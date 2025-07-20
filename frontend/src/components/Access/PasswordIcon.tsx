import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type PasswordIconProps = {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

function PasswordIcon({showPassword, setShowPassword} : PasswordIconProps) {
    return (
        <InputAdornment position="end">
            <IconButton
                sx={{color: 'white'}}
                onClick={() => {
                    setShowPassword(true);
                    setTimeout(async() => {
                        setShowPassword(false);
                    }, 1000)
                }}
                edge="end"
                aria-label="toggle password visibility"
            >
            {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        </InputAdornment>
    )
} 

export default PasswordIcon;