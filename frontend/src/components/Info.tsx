import { Typography, Box } from '@mui/material';
import { textStructure, infoStructure } from './Style';

type InfoProps = {
  labelContent: string;
  infoContent: string;
  color?: string,
  width?:string
};

function Info({ labelContent, infoContent, color='white' }: InfoProps) {
  return (
    <Box sx={{padding: '0.2em', width: '20em'}}>
      <Typography variant="body1" {...textStructure} sx={{color: color}}>
        {labelContent}:
      </Typography>
      <Typography variant="body1" {...infoStructure} sx={{color: color}}>
        {infoContent}
      </Typography>
    </Box>
  );
}

export default Info;
