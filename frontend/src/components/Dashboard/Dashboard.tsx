import { Box, Card, TextField, Button, Divider } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useSocket } from '../../context/SocketProvider';
import Info from '../General/Info';
import PaginationBox, {type PaginationBoxRef} from './PaginationBox';
import { fieldStructure, formContainerStyle, dashboardCardStrucutre, buttonStructure, 
    dividerStyle, logoutStyle } from '../../css/Style';
import { validateEmail, validateAmount } from '../Validations';
import { getBalance, transferMoney, logout } from '../BackendCalls';
import ViedoDialog from './VideoDialog';

type DashboardFormData = {
    email: string;
    amount?: string;
};

function Dashboard() {
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken')!;
    const [balance, setBalance] = useState(0);
    const [email, setEmail] = useState('');
    const paginationRef = useRef<PaginationBoxRef>(null);
    const { socket } = useSocket();

    const { control, handleSubmit, formState: { errors }, reset } = useForm<DashboardFormData>({
        defaultValues: {
            email: '',
            amount: ''
        }
    });

    function getFormattedBalance(balance: number | bigint) {
        return new Intl.NumberFormat('en-US', { 
            minimumFractionDigits: 0,
            maximumFractionDigits: 4
        }).format(balance);
    }

    useEffect(() => {
        document.title = 'Account';
        setEmail(localStorage.getItem('email') || '');

        const fetchBalance = async () => {
            const result = await getBalance(token);
            if (result.success) {
                setBalance(result.balance);
            } else {
                toast.error(result.error);
            }
        };

        fetchBalance();
    }, [token]);

    const onSubmit = async (data: DashboardFormData) => {
        const body = {
            receiverEmail: data.email,
            amount: data.amount!
        };

        const result = await transferMoney(token, body);
        if (result.success) {
            const balanceResult = await getBalance(token);
            if (balanceResult.success) {
                setBalance(balanceResult.balance);
            }
            reset();
            paginationRef.current?.onPageChanges(paginationRef.current?.page);
            toast.success(result.message);
            
        } else {
            toast.error(result.error);
        }
    };

    // handle notification about transaction that transders money to this user
    useEffect(() => {
        if (!socket) {
            return;
        }

        const handler = (data: any) => {
            if (data && typeof data.amount === 'number') {
                toast.info(`You have recieved ${getFormattedBalance(data.amount)}$ to your account`);
                paginationRef.current?.onPageChanges(paginationRef.current?.page);
            }
        };

        socket.on('new transaction',handler);

        return () => {
            socket.off('new transaction', handler);
        }
    }, [socket?.id]);

    return (
        <>
            <Box {...logoutStyle} onClick={() => {
                logout(localStorage.getItem('accessToken'));
                navigate('/')
                }}>

                <Button {...buttonStructure}>Logout</Button>

            </Box>

            <Box sx={{ marginTop: '2em' }}>

                <Card {...dashboardCardStrucutre}>

                    <Info labelContent="User" infoContent={email} />

                    <Divider orientation="vertical" flexItem sx={dividerStyle} />

                    <Info labelContent="Balance" infoContent={`${getFormattedBalance(balance)}$`} />

                </Card>

            </Box>

            <Box sx={formContainerStyle('2em')} component="form" onSubmit={handleSubmit(onSubmit)}>

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
                        />
                    )}
                />

                <Controller
                    name="amount"
                    control={control}
                    rules={validateAmount}
                    render={({ field }) => (
                        <TextField
                            label="Amount"
                            {...fieldStructure}
                            error={!!errors.amount}
                            helperText={errors.amount?.message || ''}
                            {...field}
                        />
                    )}
                />

                <Button type='submit' {...buttonStructure}>Transfer Money</Button>
                
                <ViedoDialog></ViedoDialog>

            </Box>

            <PaginationBox ref={paginationRef} />
        </>
    )
}

export default Dashboard;
