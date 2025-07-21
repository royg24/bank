import { Card, Divider } from '@mui/material'
import { cardStructure, dividerStyle } from '../../css/Style';
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

    return (
        <>
            <Card sx={{
                ...cardStructure.sx, 
                width: '60em',
                height: '1.8em',
                gap: '1em',
                fontSize: '0.8em',
                padding: '0.7em'
            }}>
                <Info labelContent={participantLabel} infoContent={participantEmail}></Info>
                {divider}
                <Info labelContent='Amount' infoContent={Math.abs(amount).
                    toString() + '$' } color={color}></Info>
                {divider}
                <Info labelContent='Date' infoContent={date}></Info>
                {divider}
                <Info labelContent='Time' infoContent={timestamp.slice(11, 19)}></Info>
            </Card>
        </>
    );
}

export default TransactionCard;