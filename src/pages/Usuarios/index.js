import React, { useEffect, useState, useCallback, useRef } from "react";

import Listado from '../../components/Listado';
import Loading from "../../components/Loading";
import Alerta from "../../components/Alerta";
import ButtonDetalles from "../../components/ButtonDetalles";
import ModalComponent from "../../components/Modal";
import Filtro from "./UsuariosFiltros";

import useStyles from "./index.css";

import { getAll, deleteById } from '../../services/usuarios';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function Usuarios() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAlerta, setShowAlerta] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [dataAlerta, setDataAlerta] = useState({});
    const [formFilter, setFormFilter] = useState();
    const [userIdDelete, setUserIdDelete] = useState();
    const isRunned = useRef(false);

    const classes = useStyles();

    const columns = [
        {
            name: 'nick',
            selector: row => row.nick,
            sortable: true,
        },
        {
            name: 'numEnlaces',
            selector: row => row.numEnlaces,
            sortable: true,
        },
        {
            name: 'strike',
            selector: row => row.strike,
            sortable: true,
        },
        {
            name: '',
            button: true,
            cell: row => <ButtonDetalles enlace={`/usuarios/${row._id}`} />,
        },
        {
            name: '',
            button: true,
            cell: row => (
                <Button variant="danger" onClick={() => handleOpenModal(row._id)}>Eliminar</Button>
            ),
        },
    ];

    const getUsuarios = useCallback((_formFilter) => {
        setLoading(true);
        getAll(_formFilter).then((result) => {
            setLoading(false);
            setData(result.data);

            if (result.data.length === 0) {
                setDataAlerta({
                    variant: 'info',
                    texto: 'no hay datos'
                });
                setShowAlerta(true);
            }
        })
            .catch(() => {
                setData({});
                setLoading(false);

                setDataAlerta({
                    variant: 'danger',
                    texto: 'Error API'
                });

                setShowAlerta(true);
            });
    }, []);

    useEffect(() => {
        if (isRunned.current) {
            return;
        }
        isRunned.current = true;

        getUsuarios();
    }, [getUsuarios]);

    const eliminarUsuario = useCallback(() => {
        deleteById(userIdDelete).then(() => {
            setShowModal(false);
            getUsuarios(formFilter);

            setDataAlerta({
                variant: 'sucess',
                texto: 'Usuario Eliminado'
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

        setUserIdDelete(undefined);

    }, [formFilter, getUsuarios, userIdDelete]);

    const closeAlerta = useCallback(() => {
        setShowAlerta(false);
    }, [setShowAlerta]);

    const handleSearch = useCallback((formData) => {
        setFormFilter(formData);
        getUsuarios(formData);
    }, [getUsuarios]);

    const handleOpenModal = useCallback((id) => {
        setUserIdDelete(id);
        setShowModal(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setShowModal(false);
        setUserIdDelete(undefined);
    }, []);

    return (
        <Container>
            <Row className={classes.boxSearch}>
                <Col>
                    <Filtro search={handleSearch} />
                </Col>
            </Row>
            <Row>
                <Col className={classes.boxPrincipal}>
                    {showAlerta &&
                        <Alerta dataAlerta={dataAlerta}
                            closeAlerta={closeAlerta} />}
                    {loading ? <Loading /> : <Listado data={data} columns={columns} />}
                </Col>
            </Row>
            <Row>
                <Col>
                    <ModalComponent
                        showModal={showModal}
                        titleHeader="Estas Seguro?"
                        textContent="Estas seguro que quieres eliminar este Usuario?"
                        closeModal={handleCloseModal}
                        buttonAcceptFN={eliminarUsuario}
                        buttonCancelFN={handleCloseModal} />
                </Col>
            </Row>
        </Container>
    );
}
