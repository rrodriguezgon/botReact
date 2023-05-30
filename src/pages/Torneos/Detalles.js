import React, { useEffect, useState, useCallback, useRef } from "react";
import {
    useParams,
    Link
} from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Buffer } from "buffer";
//import moment from "moment/moment";
import moment from "moment-timezone";

import { getById, updateById } from "../../services/torneos";
import { getSnapshoot } from "../../services/selenium";

import useStyles from "./Detalles.css";

import Loading from "../../components/Loading";
import Alerta from "../../components/Alerta";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
// https://icons.getbootstrap.com/
import { CheckCircleFill, XCircleFill } from "react-bootstrap-icons";
import { deleteById } from '../../services/torneos';

export function TorneosDetalles() {
    const [data, setData] = useState();
    const [snapShoot, setSnapShoot] = useState();
    const [loading, setLoading] = useState(true);
    const [loadingIMG, setLoadingIMG] = useState(false);
    const [showAlerta, setShowAlerta] = useState(false);
    const [dataAlerta, setDataAlerta] = useState();
    const [timeZones, setTimeZones] = useState();
    const isRunned = useRef(false);

    const classes = useStyles();
    const navigate = useNavigate();

    let { id } = useParams();

    function getTorneo(id) {
        getById(id).then((result) => {
            setLoading(false);
            setData(result.data);
            setTimeZones(moment.tz.names());
        }).catch((ex) => {
            setDataAlerta({
                variant: 'danger',
                texto: 'Error API'
            });

            setShowAlerta(true);
        });
    }

    useEffect(() => {
        if (isRunned.current) return;
        isRunned.current = true;

        getTorneo(id);
    }, [id]);

    const handleCloseAlerta = useCallback(() => {
        setShowAlerta(false);
    }, [setShowAlerta]);

    const MostrarPagina = useCallback(() => {
        setLoadingIMG(true);
        getSnapshoot(data.linkTorneo)
            .then((result) => {
                setLoadingIMG(false);
                let base64ImageString = Buffer.from(result.data, 'binary').toString('base64');
                setSnapShoot(base64ImageString);
            });
    }, [data]);

    const marcarTerminado = useCallback(() => {
        data.terminado = true;

        updateById(data._id, data).then((result) => {
            setData(result.data);

            setDataAlerta({
                variant: 'success',
                texto: 'Editado Correctamente'
            });
        });
    }, [data]);

    const guardarTimeZone = useCallback(() => {
        updateById(data._id, data).then((result) => {
            setData(result.data);

            setDataAlerta({
                variant: 'success',
                texto: 'Editado Correctamente'
            });
        });
    }, [data]);

    const handleChangeTimeZone = useCallback((value) => {
        setData({
            ...data,
            timeZone: value.target.value
        });
    }, [data]);

    const eliminarTorneo = useCallback(() => {        
        deleteById(data._id).then(() => {
            navigate("/torneos");                  
        }).catch((ex) => {            
        });       
        
    }, [data._id,navigate]);

    return (
        <Container>
            <Row className={classes.boxMarginBotTop}>
                <Col>
                    <Button variant="danger" onClick={() => eliminarTorneo()}>Eliminar</Button>
                </Col>
                <Col>
                    <Link to={`/torneos`}><Button variant="primary">Volver</Button></Link>
                </Col>
            </Row>
            {showAlerta &&
                <Row className={classes.boxMarginBotTop}>
                    <Col>
                        <Alerta dataAlerta={dataAlerta}
                            closeAlerta={handleCloseAlerta} />
                    </Col>
                </Row>}
            {loading ? (<Row className={classes.boxMarginBotTop}>
                <Col className={classes.boxPrincipal}>
                    <Loading />
                </Col>
            </Row>
            ) : (
                <Row className={classes.boxMarginBotTop}>
                    <Form>
                        <Row className={classes.boxMarginBotTop}>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Nombre Torneo</Form.Label>
                                    <Form.Control value={data.nombreTorneo.replace('\n\t\t\t\t\t\t\t\t\t\t', ' ')} disabled />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Row className={classes.boxMarginBotTop}>
                                        <Col>
                                            <Form.Label>Cuadros Publicados</Form.Label>
                                        </Col>
                                    </Row>
                                    <Row className={classes.boxMarginBotTop}>
                                        <Col>
                                            {data.cuadrosOK ? <CheckCircleFill className={classes.checkTrue} /> : <XCircleFill className={classes.checkFalse} />}
                                        </Col>
                                    </Row>

                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Row className={classes.boxMarginBotTop}>
                                        <Col>
                                            <Form.Label>Entradas Publicadas</Form.Label>
                                        </Col>
                                    </Row>
                                    <Row className={classes.boxMarginBotTop}>
                                        <Col>
                                            {data.entradasOK ? <CheckCircleFill className={classes.checkTrue} /> : <XCircleFill className={classes.checkFalse} />}
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className={classes.boxMarginBotTop}>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Fecha Inicio</Form.Label>
                                    <Form.Control value={moment(data.infoTorneo.fechaInicioDate).format('DD/MM/YYYY')} disabled />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Fecha Fin</Form.Label>
                                    <Form.Control value={moment(data.infoTorneo.fechaFinDate).format('DD/MM/YYYY')} disabled />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Row className={classes.boxMarginBotTop}>
                                        <Col>
                                            <Form.Label>Terminado</Form.Label>
                                        </Col>
                                    </Row>
                                    <Row className={classes.boxMarginBotTop}>
                                        <Col>
                                            {data.terminado ? <CheckCircleFill className={classes.checkTrue} /> : <XCircleFill className={classes.checkFalse} />}
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Row className={classes.boxMarginBotTop}>
                                        <Col>
                                        </Col>
                                    </Row>
                                    <Row className={classes.boxMarginBotTopButton}>
                                        <Col>
                                            <Button onClick={() => marcarTerminado()}>Marcar Terminado</Button>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>TimeZone</Form.Label>
                                    <Form.Select value={data.timeZone} onChange={(value) => handleChangeTimeZone(value)} aria-label="Default select example">
                                        <option value=''>Elige una zona</option>
                                        {timeZones.map(opt => (
                                            <option value={opt}>{opt}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Row className={classes.boxMarginBotTop}>
                                        <Col>
                                        </Col>
                                    </Row>
                                    <Row className={classes.boxMarginBotTopButton}>
                                        <Col>
                                            <Button onClick={() => guardarTimeZone()}>Guardar TimeZone</Button>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className={classes.boxMarginBotTop}>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Url Torneo</Form.Label>
                                    <Form.Control value={data.linkTorneo} disabled />
                                </Form.Group>
                            </Col>
                        </Row>
                        {(data.linkEntradas &&
                            <Row className={classes.boxMarginBotTop}>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Url Entradas</Form.Label>
                                        <Form.Control value={data.linkEntradas} disabled />
                                    </Form.Group>
                                </Col>
                            </Row>)}
                        {(data.infoCuadros &&
                            <>
                                <Row>
                                    <Col>Cuadros</Col>
                                </Row>
                                <Row className={classes.boxMarginBotTop}>
                                    {data.infoCuadros.map((cuadro, x) => (
                                        <Col key={x}>
                                            <a target="_blank" rel='noreferrer' href={'https://worldpadeltour.com/' + cuadro.linkCatFase}><Button>{cuadro.NombreFase} - {cuadro.NombreCategoria}</Button></a>
                                        </Col>
                                    ))}
                                </Row>
                            </>
                        )}
                        <Row className={classes.boxMarginBotTop}>
                            <Col>
                                <Button onClick={() => MostrarPagina()}>Visualizar Pagina</Button>
                            </Col>
                        </Row>
                        {
                            loadingIMG ? (<Row className={classes.boxMarginBotTop} >
                                <Col className={classes.boxPrincipal}>
                                    <Loading />
                                </Col>
                            </Row>) : (
                                <Row className={classes.boxMarginBotTop}>
                                    <Col>
                                        <img alt='ImagenTorneo' src={`data:image/png;base64,${snapShoot}`} />
                                    </Col>
                                </Row>
                            )}

                    </Form>
                </Row >
            )
            }
        </Container >
    )
}