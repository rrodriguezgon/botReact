import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ModalComponent({
    showModal,
    closeModal,
    titleHeader = '',
    textContent = 'CONTENIDO BASE',
    buttonAcceptFN,
    buttonCancelFN,
}) {
    return (
        <>
            <Modal show={showModal} onHide={() => closeModal()}>
                {titleHeader !== '' &&
                    <Modal.Header closeButton>
                        <Modal.Title>{titleHeader}</Modal.Title>
                    </Modal.Header>
                }
                <Modal.Body> {textContent}</Modal.Body>
                {(buttonAcceptFN || buttonCancelFN) &&
                    <Modal.Footer>
                        {buttonCancelFN &&
                            <Button variant="secondary" onClick={() => buttonCancelFN()}>
                                Cancelar
                            </Button>
                        }
                        {buttonAcceptFN &&
                            <Button variant="primary" onClick={() => buttonAcceptFN()}>
                                Aceptar
                            </Button>
                        }
                    </Modal.Footer>
                }
            </Modal>
        </>
    );
}
