
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { paginationContainerStyle, pagingArrowsStructure, textStructure } from './Style';
import { type JSX, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import React from 'react';
import { getTransactions } from './BackendCalls';
import { toast } from 'react-toastify';
import TransactionCard from './TransactionCard';

export type PaginationBoxRef = {
  onPageChanges: (index: number) => void;
  page: number;
};

const PaginationBox = forwardRef<PaginationBoxRef>((props, ref) => {
    const token = localStorage.getItem('accessToken')!;
    const defaultText = <Typography sx={{...textStructure, color:'red'}}>
        No Transactions for you
    </Typography>

    const [page, setPage] = useState(1);
    const [children, setChildren] = useState<JSX.Element[]>([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        onPageChanges(1);
    }, []);

    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1);
            onPageChanges(page - 1);
        };
    };

    const handleNext = () => {
        setPage(page + 1);
        onPageChanges(page + 1);
    };

    const onPageChanges = async (index: number) => {
        const result = await getTransactions(token, {index: index});
        
        if (result.success) {
            const transactions = result.transactions;
            const transactionCards = transactions.map((transaction: {
                amount: number;
                participantEmail: string;
                timestamp: string; 
            }) => (
                <TransactionCard
                    amount={transaction.amount}
                    participantEmail={transaction.participantEmail}
                    timestamp={transaction.timestamp}
                />
            ));

            setChildren(transactionCards);
            setTotalPages(result.totalPages);
        } else {
            toast.error(result.error);
        }

    }

    useImperativeHandle(ref, () => ({
        onPageChanges,
        page
    }))

    return (
        <>
            <Box sx={{...paginationContainerStyle('2em')}} >

                <Typography sx={{ ...textStructure, fontSize: '2em', marginRight: '60%' }}>
                    All Transactions:
                </Typography>

                <Box  sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1em',
                        paddingTop: '0.3em',
                        backgroundColor: 'transparent'
                        }}>
                    {React.Children.count(children) > 0? children :defaultText}
                </Box>
                
                <Box sx={{display: 'flex', gap: '1em'}}>
                    <IconButton disabled={page === 1} onClick={handlePrev} { ...pagingArrowsStructure }>
                        <ArrowBackIosNewIcon />
                    </IconButton>

                    <Typography sx={{fontSize: '1.5em'}}>
                        {page}
                    </Typography>

                    <IconButton disabled={page === totalPages} onClick={handleNext} { ...pagingArrowsStructure }>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>
            </Box>
        </>
    );
});

export default PaginationBox;
