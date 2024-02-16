import React, { useEffect, useState, useCallback } from "react";

import Filtro from '../filtros';

import Listado from '../../../components/Listado';
import Loading from "../../../components/Loading";
import Alerta from "../../../components/Alerta";
import ModalComponent from "../../../components/Modal";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import useStyles from "./index.css";

import { getAll, getAllWithFilters } from '../../../services/logs';
import { Button } from "react-bootstrap";

const Logs = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAlerta, setShowAlerta] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [dataAlerta, setDataAlerta] = useState({});
    const [detail, setDetail] = useState({});
    const [filters, setFilters] = useState({});
    const classes = useStyles();

    function buttonDetails(row) { return <Button variant="primary" onClick={() => handleOpenModal(row)}>Ver Detalles</Button> }
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
        {
            name: '',
            button: true,
            cell: row => buttonDetails(row),
        },
    ];

    function getTorneos(filters) {
        setLoading(true);
        (Object.keys(filters || {}).length ? getAllWithFilters(filters) : getAll())
            .then((({ data }) => {
                setLoading(false);
                setList(data);

                if (data.length === 0) {
                    setDataAlerta({
                        variant: 'info',
                        texto: 'no hay datos'
                    });

                    setShowAlerta(true);
                }
            }))
            .catch(() => {
                setLoading(false);

                setDataAlerta({
                    variant: 'danger',
                    texto: 'Error API'
                });

                setShowAlerta(true);
            });
    }

    useEffect(() => {
        getTorneos();
    }, []);

    const closeAlerta = useCallback(() => {
        setShowAlerta(false);
    }, [setShowAlerta]);

    const handleSearch = useCallback((filters) => {
        setFilters(filters);
        getTorneos(filters);
    }, []);

    const handleOpenModal = useCallback((row) => {
        setShowModal(true);
        setDetail(row);
    }, []);

    const handleCloseModal = useCallback(() => {
        setShowModal(false);
    }, []);

    return (
        <Container>
            <Row className={classes.boxSearch}>
                <Col>
                    <Filtro search={handleSearch} />
                </Col>
            </Row>
            <Row>
                {showAlerta &&
                    <Alerta dataAlerta={dataAlerta}
                        closeAlerta={closeAlerta} />}
                {loading ? <Loading /> : <Listado data={list} columns={columns} />}
            </Row>
            <Row>
                <Col>
                    <ModalComponent
                        showModal={showModal}
                        titleHeader="Estas Seguro?"
                        textContent={<Details row={detail} />}
                        closeModal={handleCloseModal} />
                </Col>
            </Row>
        </Container>
    );
}

const Details = ({ row }) => {
    return <Container>
        <Row>
            <Col>{row._id}</Col>
        </Row>
        <Row>
            <Col>{row.nameCommand}</Col>
        </Row>
        <Row>
            <Col>{row.type}</Col>
        </Row>
        <Row>
            <Col>{row.stacktrace}</Col>
        </Row>
    </Container>;
};

export default Logs;