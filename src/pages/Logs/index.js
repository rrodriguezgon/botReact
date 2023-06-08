import React, { useEffect, useState, useCallback } from "react";

import Listado from '../../components/Listado';
import Loading from "../../components/Loading";
import Alerta from "../../components/Alerta";

import { getAll } from '../../services/logs';

export default function Logs() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAlerta, setShowAlerta] = useState(false);
    const [dataAlerta, setDataAlerta] = useState({});

    const columns = [
        {
            name: 'Tipo',
            selector: row => row.type,
            sortable: true,
        },
        {
            name: 'Comando',
            selector: row => row.nameCommand,
            sortable: true,
        },
        {
            name: 'Fecha',
            selector: row => row.date,
            sortable: true,
        },
    ];

    useEffect(() => {
        getAll().then(((result) => {
            setLoading(false);
            setData(result.data);

            if (!result.data.length){
                setDataAlerta({
                    variant: 'info',
                    texto:'no hay datos'
                });
                setShowAlerta(true);
            }
        }))
            .catch(() => {
                setLoading(false);

                setDataAlerta({
                    variant: 'danger',
                    texto:'Error API'
                });
                setShowAlerta(true);
            });
    }, [setShowAlerta]);

    const closeAlerta = useCallback(() => {
        setShowAlerta(false);
    },[setShowAlerta]);

    return (
        <>
            {showAlerta &&
                <Alerta dataAlerta={dataAlerta}
                    closeAlerta={closeAlerta} />}
            {loading ? <Loading /> : <Listado data={data} columns={columns} />}
        </>
    );
}
