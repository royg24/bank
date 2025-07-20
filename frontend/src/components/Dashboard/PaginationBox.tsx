import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { paginationContainerStyle, pagingArrowsStructure, textStructure } from '../../css/Style';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { getTransactions } from '../BackendCalls';
import { toast } from 'react-toastify';
import TransactionCard from './TransactionCard';

export type PaginationBoxRef = {
  onPageChanges: (index: number) => void;
  page: number;
};

type Transaction = {
  amount: string;
  participantEmail: string;
  timestamp: string;
};

const PaginationBox = forwardRef<PaginationBoxRef>((_, ref) => {
  const token = localStorage.getItem('accessToken')!;
  const defaultText = (
    <Typography sx={{ ...textStructure, color: 'red', fontSize: '1.5em' }}>
      No Transactions for you
    </Typography>
  );

  const [page, setPage] = useState(1);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    onPageChanges(1);
  }, []);

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
      onPageChanges(page - 1);
    }
  };

  const handleNext = () => {
    setPage(page + 1);
    onPageChanges(page + 1);
  };

  const onPageChanges = async (index: number) => {
    const result = await getTransactions(token, { index });

    if (result.success) {
      setTransactions(result.transactions);
      setTotalPages(result.totalPages || 1);
    } else {
      toast.error(result.error);
    }
  };

  useImperativeHandle(ref, () => ({
    onPageChanges,
    page,
  }));

  return (
    <Box sx={{ ...paginationContainerStyle('2em') }}>
      <Typography sx={{ ...textStructure, fontSize: '2.5em', marginRight: '60%' }}>
        All Transactions:
      </Typography>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
          paddingTop: '0.3em',
          backgroundColor: 'transparent',
        }}
      >
        {transactions.length > 0 ? transactions.map((transaction) => {
              const key = `${transaction.timestamp}-${transaction.amount}`;

              return (
                <TransactionCard
                  key={key}
                  amount={Number(transaction.amount)}
                  participantEmail={transaction.participantEmail}
                  timestamp={transaction.timestamp}
                />
              );
            }) : defaultText}
      </Box>

      <Box sx={{ display: 'flex', gap: '1em' }}>
        <IconButton disabled={page === 1} onClick={handlePrev} {...pagingArrowsStructure}>
          <ArrowBackIosNewIcon />
        </IconButton>

        <Typography sx={{ fontSize: '1.5em' }}>{page}</Typography>

        <IconButton
          disabled={page === totalPages}
          onClick={handleNext}
          {...pagingArrowsStructure}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
});

export default PaginationBox;
