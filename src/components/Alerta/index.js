import { useCallback } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function Alerta({ dataAlerta, closeAlerta }) {  
  const handleClick = useCallback(() => {
    closeAlerta();
  }, [closeAlerta]);

  return (
    <Alert variant={dataAlerta.variant}>
      {dataAlerta.texto}
      <div className="d-flex justify-content-end">
        <Button onClick={handleClick} variant={dataAlerta.variant}>
          X
        </Button>
      </div>
    </Alert>
  );
}

export default Alerta;