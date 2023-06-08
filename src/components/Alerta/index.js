import { useCallback } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

export default function Alerta({ dataAlerta, closeAlerta }) {
  const handleClick = useCallback(() => {
    closeAlerta();
  }, [closeAlerta]);

  return (
    <Alert data-testid="alerta" variant={dataAlerta.variant}>
      {dataAlerta.texto}
      <div className="d-flex justify-content-end">
        <Button data-testid="alertaButtonClose" onClick={handleClick} variant={dataAlerta.variant}>
          X
        </Button>
      </div>
    </Alert>
  );
}

