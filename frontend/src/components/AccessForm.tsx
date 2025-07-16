import { Box, TextField, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { fieldStructure, buttonStructure, formContainerStyle } from './Style.js';
import Toggle from './Toggle.js';
import PasswordIcon from './PasswordIcon.js';
import '../css/style.css';
import { useLocation } from 'react-router-dom';
import { validateEmail, validatePassword, validatePhoneNumber, keepPhoneNumberFormat } from './Validations.js';
import { access, sendCode } from './BackendCalls.js'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

type FormData = {
    email: string;
    password: string;
    phoneNumber?: string;
};

function SignUpForm() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const initialMode = useLocation().state?.mode ?? true;
    const [mode, setMode] = useState(initialMode);
    const pageText = mode ? 'Sign Up' : 'Login';

    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        phoneNumber: ''
    });

    useEffect(() => {
        document.title = pageText;
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const onSubmit = async (data: FormData) => {
        const route = mode ? 'sign-up' : 'login';
        const navigateRoute = mode ? '/verify' : '/dashboard';

        const result = await access(route, data);

        if (result.success) {
            if (!mode) {
                localStorage.setItem('accessToken', result.data.accessToken);
                toast.success(result.data.message);
            } else {
                sendCode({phoneNumber: data.phoneNumber || ''});
            }
            localStorage.setItem('email', data.email);
            navigate(navigateRoute);
        } else {
            toast.error(result.error);
        }
    };

    useEffect(() => {
        reset({
            email: '',
            phoneNumber: '',
            password: ''
        });
    }, [mode, reset]);

    return (
        <>
            <Toggle mode={mode} setMode={setMode} leftText="Sign Up" rightText="Login" />

            <Box
                sx={formContainerStyle('3em')}
                component="form"
                onSubmit={handleSubmit(onSubmit)}
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

                <Button {...buttonStructure} type="submit">
                    {pageText}
                </Button>

            </Box>
        </>
    );
}

export default SignUpForm;
