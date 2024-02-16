import React, { useEffect, useState, useCallback } from "react";
import lodash from 'lodash';

import Filtro from '../filtros';

import Listado from '../../../components/Listado';
import Loading from "../../../components/Loading";
import Alerta from "../../../components/Alerta";
import ButtonDetalles from "../../../components/ButtonDetalles";
import ModalComponent from "../../../components/Modal";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CheckCircleFill, XCircleFill } from "react-bootstrap-icons";

import useStyles from "./index.css";

import { getAll, getAllWithFilters, deleteById, deleteAll } from '../../../services/torneos';

export default function Torneos() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAlerta, setShowAlerta] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [dataAlerta, setDataAlerta] = useState({});
    const [torneoIdDelete, setTorneoIdDelete] = useState();
    const [filters, setFilters] = useState({});
    const classes = useStyles();

    function checkIconType(field) { return (field ? <CheckCircleFill className={classes.checkTrue} /> : <XCircleFill className={classes.checkFalse} />) }
    function buttonDetails(field) { return <ButtonDetalles enlace={`/torneos/${field}`} /> }
    function buttonDelete(field) { return <Button variant="danger" onClick={() => handleOpenModal(field)}>Eliminar</Button> }

    const columns = [
        {
            name: 'Torneo',
            selector: row => row.nombre,
            sortable: true,
        },
        {
            name: 'Fecha Inicio',
            selector: row => row.fechaInicio,
            sortable: true,
        },
        {
            name: 'Fecha Fin',
            selector: row => row.fechaFin,
            sortable: true,
        },
        {
            name: 'terminado',
            selector: row => checkIconType(row.terminado),
            sortable: true,
        },
        {
            name: '',
            button: true,
            cell: row => buttonDetails(row._id),
        },
        {
            name: '',
            button: true,
            cell: row => buttonDelete(row._id),
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

    const eliminarTorneo = useCallback(() => {
        deleteById(torneoIdDelete).then(() => {
            setShowModal(false);
            getTorneos(filters);

            setDataAlerta({
                variant: 'success',
                texto: 'Torneo Eliminado'
            });

            setShowAlerta(true);
        }).catch(() => {
            setDataAlerta({
                variant: 'danger',
                texto: 'Error API'
            });

            setShowAlerta(true);
            setShowModal(false);
        });

        setTorneoIdDelete(undefined);

    }, [torneoIdDelete, filters]);

    const handleSearch = useCallback((filters) => {
        setFilters(filters);
        getTorneos(filters);
    }, []);

    const closeAlerta = useCallback(() => {
        setShowAlerta(false);
    }, [setShowAlerta]);

    const handleOpenModal = useCallback((id) => {
        setShowModal(true);
        setTorneoIdDelete(id);
    }, []);

    const handleCloseModal = useCallback(() => {
        setTorneoIdDelete(undefined);
        setShowModal(false);
    }, []);

    const handleDeleteAll = useCallback(() => {
        deleteAll().then(() => {
            getTorneos(filters);

            setDataAlerta({
                variant: 'success',
                texto: 'Torneos Eliminados'
            });
        });
    }, [filters]);

    return (
        <Container>
            <Row className={classes.boxSearch}>
                <Col>
                    <Filtro search={handleSearch} deleteAll={handleDeleteAll} />
                </Col>
            </Row>
            <Row>
                <Col>
                    {showAlerta &&
                        <Alerta dataAlerta={dataAlerta}
                            closeAlerta={closeAlerta} />}
                    {loading ? <Loading /> : <Listado data={list} columns={columns} />}
                </Col>
            </Row>
            <Row>
                <Col>
                    <ModalComponent
                        showModal={showModal}
                        titleHeader="Estas Seguro?"
                        textContent="Estas seguro que quieres eliminar este Torneo?"
                        closeModal={handleCloseModal}
                        buttonAcceptFN={eliminarTorneo}
                        buttonCancelFN={handleCloseModal} />
                </Col>
            </Row>
        </Container>
    );
}
