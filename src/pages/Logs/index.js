import React, { useEffect, useState, useCallback } from "react";

import Listado from '../../components/Listado';
import Loading from "../../components/Loading";
import Alerta from "../../components/Alerta";

import { getAll } from '../../services/logs';

export function Logs() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAlerta, setShowAlerta] = useState(false);
    const [dataAlerta, setDataAlerta] = useState({});

    useEffect(() => {
        getAll().then(((result) => {
            setLoading(false);
            setData(result.data);

            if (result.data.length === 0){
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
            {loading ? <Loading /> : <Listado data={data} />}
        </>
    );
}
