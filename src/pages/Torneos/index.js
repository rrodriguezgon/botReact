import React, { useEffect, useState, useCallback, useRef } from "react"

import Filtro from './Filtro';

import Listado from '../../components/Listado';
import Loading from "../../components/Loading";
import Alerta from "../../components/Alerta";
import ButtonDetalles from "../../components/ButtonDetalles";
import ModalComponent from "../../components/Modal";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CheckCircleFill, XCircleFill } from "react-bootstrap-icons";

import moment from "moment";

import useStyles from "./index.css";

import { getAll, deleteById, deleteAll } from '../../services/torneos';

export function Torneos() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const [showAlerta, setShowAlerta] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [dataAlerta, setDataAlerta] = useState({});
    const [formFilter, ] = useState({});
    const [torneoIdDelete, setTorneoIdDelete] = useState();
    const isRunned = useRef(false);
    const classes = useStyles();

    const columns = [
        {
            name: 'Torneo',
            selector: row => row.nombreTorneo,
            sortable: true,            
        },    
        {
            name: 'Fecha Inicio',
            selector: row => moment(row.infoTorneo.fechaInicioDate).format('DD/MM/YYYY'),
            sortable: true,
        },
        {
            name: 'Fecha Fin',
            selector: row => moment(row.infoTorneo.fechaFinDate).format('DD/MM/YYYY'),
            sortable: true,
        },
        {
            name: 'cuadros',
            selector: row => (row.cuadrosOK ? <CheckCircleFill className={classes.checkTrue} /> : <XCircleFill className={classes.checkFalse} />),
            sortable: true,
        },
        {
            name: 'entradas',
            selector: row => (row.entradasOK ? <CheckCircleFill className={classes.checkTrue} /> : <XCircleFill className={classes.checkFalse} />),
            sortable: true,
        },
        {
            name: 'terminado',
            selector: row => (row.terminado ? <CheckCircleFill className={classes.checkTrue} /> : <XCircleFill className={classes.checkFalse} />),
            sortable: true,
        },
        {
            name: '',
            button: true,
            cell: row => <ButtonDetalles enlace={`/torneos/${row._id}`} />,
        },
        {
            name: '',
            button: true,
            cell: row => (
                <Button variant="danger" onClick={() => handleOpenModal(row._id)}>Eliminar</Button>
            ),
        },
    ];

    function getTorneos(formFilter){
        setLoading(true);
        getAll(formFilter).then(((result) => {
            setLoading(false);
            setData(result.data);

            if (result.data.length === 0) {
                setDataAlerta({
                    variant: 'info',
                    texto: 'no hay datos'
                })
                
                setShowAlerta(true);
            }
        }))
            .catch((ex) => {
                setLoading(false);

                setDataAlerta({
                    variant: 'danger',
                    texto: 'Error API'
                });
                
                setShowAlerta(true);
            });
    }

    useEffect(() => {
        if(isRunned.current) return;
        isRunned.current = true;
        
        getTorneos();
    }, []);

    const eliminarTorneo = useCallback(() => {        
        deleteById(torneoIdDelete).then(() => {
            setShowModal(false);
            getTorneos(formFilter); 
            
            setDataAlerta({
                variant: 'success',
                texto: 'Torneo Eliminado'
            });

            setShowAlerta(true);            
        }).catch((ex) => {
            setDataAlerta({
                variant: 'danger',
                texto: 'Error API'
            });
            
            setShowAlerta(true);
            setShowModal(false);
        });

        setTorneoIdDelete(undefined);
        
    }, [torneoIdDelete, formFilter]);

    const handleSearch = useCallback((formData) => {        
        getTorneos(formData);
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

    const handleDeleteAll = useCallback (() => {
        console.log("borrar todo")
        
        deleteAll().then(() => {
            getTorneos(formFilter); 
            
            setDataAlerta({
                variant: 'success',
                texto: 'Torneos Eliminados'
            });
        });
    }, [formFilter])

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
                    {loading ? <Loading /> : <Listado data={data} columns={columns} />}
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
    )
}