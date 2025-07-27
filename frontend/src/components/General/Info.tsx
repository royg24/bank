import { Typography, Box } from '@mui/material';
import { textStructure, infoStructure } from '../../css/Style';

type InfoProps = {
  labelContent: string;
  infoContent: string;
  isRow?:boolean,
  color?: string;
  width?: string;
};

function Info({ labelContent, infoContent, color = 'white', isRow=false }: InfoProps) {
  const flexDirection = isRow ? 'row' : 'column';

  return (
    <Box sx={{ padding: '0.2em', width: '100%', display: 'flex', flexDirection }}>

      <Typography variant="body1" sx={{ ...textStructure, color: color }}>
        {labelContent}:
      </Typography>

      <Typography variant="body1"sx={{ ...infoStructure, color: color }}>
        {" " + infoContent}
      </Typography>
      
    </Box>
  );
}

export default Info;
