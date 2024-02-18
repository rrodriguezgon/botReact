import { Link } from "react-router-dom";

import { Button } from '@mui/material';

export default function ButtonDetalles({ enlace }) {
    return (
        <Link to={ enlace }>
            <Button variant="contained">Detalles</Button>
        </Link>
    );
}

 