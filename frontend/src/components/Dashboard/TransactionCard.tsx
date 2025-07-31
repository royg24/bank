import { Card, Divider, useMediaQuery } from '@mui/material'
import { transactionCardStructure, dividerStyle } from '../../css/Style';
import Info from '../General/Info';

type Transaction = {
    amount: number,
    participantEmail: string,
    timestamp: string
}

function TransactionCard({amount, participantEmail, timestamp}: Transaction) {
    const divider = <Divider orientation="vertical" flexItem sx={dividerStyle} />;
    const participantLabel = amount >= 0 ? 'From' : 'To';
    const date = new Date(timestamp).toLocaleDateString('en-GB');
    const time = new Date(timestamp).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
    const color = amount >= 0 ? 'rgb(0, 88, 18)' : 'darkRed';
    const isSmallScreen = useMediaQuery('(max-width:800px)');

    return (
        <Card {...transactionCardStructure}>
            <Info labelContent={participantLabel} infoContent={participantEmail} isRow={isSmallScreen} />
            {divider}
            <Info labelContent='Amount' infoContent={Math.abs(amount).toString() + '$'} color={color} isRow={isSmallScreen} />
            {divider}
            <Info labelContent='Date' infoContent={date} isRow={isSmallScreen} />
            {divider}
            <Info labelContent='Time' infoContent={time} isRow={isSmallScreen} />
        </Card>
    );
}


export default TransactionCard;