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
    const color = amount >= 0 ? 'rgb(0, 88, 18)' : 'darkRed';
    const isSmallScreen = useMediaQuery('(max-width:800px)');

    return (
        <>
            <Card {...transactionCardStructure}>
                <Info labelContent={participantLabel} infoContent={participantEmail}
                isRow={isSmallScreen}></Info>
                {divider}
                <Info labelContent='Amount' infoContent={Math.abs(amount).
                    toString() + '$' } color={color} isRow={isSmallScreen}></Info>
                {divider}
                <Info labelContent='Date' infoContent={date} isRow={isSmallScreen}></Info>
                {divider}
                <Info labelContent='Time' infoContent={timestamp.slice(11, 19)}
                isRow={isSmallScreen}></Info>
            </Card>
        </>
    );
}

export default TransactionCard;