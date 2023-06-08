import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Detalles from './detalles.js';
import { BrowserRouter } from "react-router-dom";

import axios from 'axios';

jest.mock('axios');

describe("<Detalles />", () => {
    beforeEach(() => jest.clearAllMocks());

    const fakeResponse = {
        "_id": "6475a646be90d675729e8127",
        "nombreTorneo": "Modon\n\t\t\t\t\t\t\t\t\t\tAbu Dhabi Master 2023",
        "linkTorneo": "https://worldpadeltour.com/torneos/modon-abu-dhabi-master-2023/2023",
        "infoTorneo": {
            "localizacion": "Bab Al Nojoum, Hudayriyat Island",
            "fechaInicioDate": "2023-02-18T00:00:00.000+00:00",
            "fechaFinDate": "2023-02-26T00:00:00.000+00:00"
        },
        "cuadrosOK": true,
        "entradasOK": true,
        "linkEntradas": "https://abu-dhabi.platinumlist.net/event-tickets/85949/world-padel-tour-modon-abu-dhabi-master",
        "circuito": "WPT",
        "infoCuadros": [
            {
                "NombreCategoria": "Masculino",
                "NombreFase": "Previa",
                "linkCatFase": "/assets/themes/worldpadeltour.com/docs/torneos_cuadros_es/1547.pdf",
                "_id": {
                    "timestamp": 1686236855,
                    "date": "2023-06-08T15:07:35.000+00:00"
                }
            },
            {
                "NombreCategoria": "Masculino",
                "NombreFase": "Cuadro",
                "linkCatFase": "/assets/themes/worldpadeltour.com/docs/torneos_cuadros_es/1546WEB.pdf",
                "_id": {
                    "timestamp": 1686236855,
                    "date": "2023-06-08T15:07:35.000+00:00"
                }
            },
            {
                "NombreCategoria": "Femenino",
                "NombreFase": "Previa",
                "linkCatFase": "/assets/themes/worldpadeltour.com/docs/torneos_cuadros_es/1549.pdf",
                "_id": {
                    "timestamp": 1686236855,
                    "date": "2023-06-08T15:07:35.000+00:00"
                }
            },
            {
                "NombreCategoria": "Femenino",
                "NombreFase": "Cuadro",
                "linkCatFase": "/assets/themes/worldpadeltour.com/docs/torneos_cuadros_es/1548WEB.pdf",
                "_id": {
                    "timestamp": 1686236855,
                    "date": "2023-06-08T15:07:35.000+00:00"
                }
            }
        ],
        "terminado": null,
        "timeZone": null
    };

    test("render component", async () =>{
        axios.get.mockResolvedValue({
            data: fakeResponse,
        });

        render( <BrowserRouter><Detalles /></BrowserRouter>);
        await waitFor(() => {
            screen.getByText("Nombre Torneo");
        });
    });

})