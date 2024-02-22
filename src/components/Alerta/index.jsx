import { useCallback } from 'react';

import { Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


export default function Alerta({ dataAlerta, closeAlerta }) {
  const handleClick = useCallback(() => {
    closeAlerta();
  }, [closeAlerta]);

  return (
    <Alert
      severity={dataAlerta.variant}
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={handleClick}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
      sx={{ mb: 2 }}
    >{dataAlerta.texto}
    </Alert>
  );
}

