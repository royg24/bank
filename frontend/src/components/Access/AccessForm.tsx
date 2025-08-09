import { Box, TextField, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { fieldStructure, buttonStructure, formContainerStyle } from '../../css/Style.js';
import Toggle from './Toggle.js';
import PasswordIcon from './PasswordIcon.js';
import '../../css/style.css';
import { useLocation } from 'react-router-dom';
import { validateEmail, validatePassword, validatePhoneNumber, keepPhoneNumberFormat } from '../Validations.js';
import { access, sendCode } from '../BackendCalls.js'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import GoogleButton from './GoogleButton.js';
import { useSocket } from '../../context/SocketProvider.js'; 
import { useMode } from '../../context/ModeProvider.js';

type FormData = {
    email: string;
    password?: string;
    phoneNumber?: string;
};

function AccessForm() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const {mode, setMode} = useMode();
    const pageText = mode ? 'Sign Up' : 'Login';
    const { socket } = useSocket();

    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

    const [_, setFormData] = useState({
        email: '',
        password: '',
        phoneNumber: ''
    });

    useEffect(() => {
        document.title = pageText;
    });

    useEffect(() => {
        if (typeof location.state?.mode === 'boolean') {
            setMode(location.state.mode);
        }
    }, [location.state?.mode, setMode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const onSubmit = async (data: any, type: string) => {
        const route = mode ? 'sign-up' : 'login';
        const result = await access(route, data, type);

        if (result.success) {
            if (!mode) {
                registerToSocket(result.data.accessToken);
                localStorage.setItem('accessToken', result.data.accessToken);
                toast.success(result.data.message);
            } else {
                const sendResult = await sendCode({email: data.email || ''});
                if (!sendResult.success) {
                    toast.error(sendResult.error);
                    return;
                }
            }

            localStorage.setItem('email', data.email);
            navigate(getNavigationRoute(mode, type));
        } else {
            toast.error(result.error);
        }
    };

    function getNavigationRoute(mode: boolean, type: string) : string {
        if (mode) {
            return type === 'form' ? '/verify' : '/access';
        } else {
            return '/dashboard';
        }
    }

    function registerToSocket(accessToken: string) {
        if (!socket) {
            return
        }

        if (socket.connected) {
            socket.emit('register', accessToken);
        } else {
            const onConnect = () => {
            socket.emit('register', accessToken);
            socket.off('connect', onConnect);
            };
            socket.on('connect', onConnect);
        }
    }

    useEffect(() => {
        reset({
            email: '',
            phoneNumber: '',
            password: ''
        });
    }, [mode, reset]);

    return (
        <>
            <Box sx={{
                '@media (max-width:800px)': {
                    marginTop: '5rem',
                }
            }}>

            </Box>
            
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '100%',

                     '@media (max-width:1400px)': {
                        width: 'auto',
                     },
                }}
                >
                <Toggle leftText="Sign Up" rightText="Login" />
            </Box>

            <Box
                sx={formContainerStyle('1em')}
                component="form"
            >
                <Controller
                    name="email"
                    control={control}
                    rules={validateEmail}
                    render={({ field }) => (
                        <TextField
                            label="Email"
                            {...fieldStructure}
                            error={!!errors.email}
                            helperText={errors.email?.message || ''}
                            {...field}
                            value={field.value || ''}
                            onChange={(e) => {
                                field.onChange(e);
                                handleChange(e);
                            }}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    rules={validatePassword}
                    render={({ field }) => (
                        <TextField
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            slotProps={{
                                input: {
                                endAdornment: (
                                    <PasswordIcon 
                                    showPassword={showPassword}
                                    setShowPassword={setShowPassword}
                                    />),
                                },
                            }}
                            {...fieldStructure}
                            error={!!errors.password}
                            helperText={errors.password?.message || ''}
                            {...field}
                            value={field.value || ''}
                            onChange={(e) => {
                                field.onChange(e);
                                handleChange(e);
                            }}
                        />
                    )}
                />

                {mode && (
                    <Controller
                        name="phoneNumber"
                        control={control}
                        rules={validatePhoneNumber}
                        render={({ field }) => (
                            <TextField
                                label="Phone Number"
                                {...fieldStructure}
                                {...field}
                                onChange={(e) => {
                                    handleChange(e);
                                    keepPhoneNumberFormat(e, field.onChange);
                                }}
                                error={!!errors.phoneNumber}
                                helperText={errors.phoneNumber?.message || ''}
                                value={field.value || ''}
                            />
                        )}
                    />
                )}

                <Button {...buttonStructure} 
                    onClick={handleSubmit((data) => onSubmit(data, 'form'))}
                >{pageText}</Button>

                <GoogleButton 
                onGoogleSubmit={(data) => onSubmit(data, 'google')} ></GoogleButton>
            </Box>
        </>
    );
}

export default AccessForm;
