import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function ModalComponent({
    showModal,
    closeModal,
    titleHeader = '',
    textContent = 'CONTENIDO BASE',
    buttonAcceptFN,
    buttonCancelFN,
}) {
    return (
        <Dialog
            onClose={closeModal}
            aria-labelledby="customized-dialog-title"
            open={showModal}
        >
            <DialogTitle>{titleHeader}</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={closeModal}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers>
                {textContent}
            </DialogContent>
            <DialogActions>
                {buttonCancelFN &&
                    <Button onClick={() => buttonCancelFN()}>
                        Cancelar
                    </Button>
                }
                {buttonAcceptFN &&
                    <Button onClick={() => buttonAcceptFN()}>
                        Aceptar
                    </Button>
                }
            </DialogActions>
        </Dialog>
    );
}
