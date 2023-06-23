import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';

export default function ButtonDetalles({ enlace }) {
    return (
        <Link to={ enlace }>
            <Button variant="primary">Detalles</Button>
        </Link>
    );
}

 