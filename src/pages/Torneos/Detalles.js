import React, { useEffect, useState, useCallback, useRef } from "react";
import {
    useParams,
    Link
} from "react-router-dom";
import { Buffer } from "buffer";
import moment from "moment/moment";

import { getById } from "../../services/torneos";
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

export function TorneosDetalles() {
    const [data, setData] = useState();
    const [snapShoot, setSnapShoot] = useState();
    const [loading, setLoading] = useState(true);
    const [loadingIMG, setLoadingIMG] = useState(false);
    const [showAlerta, setShowAlerta] = useState(false);
    const [dataAlerta, setDataAlerta] = useState();
    const isRunned = useRef(false);

    const classes = useStyles();

    let { id } = useParams();

    useEffect(() => {
        if (isRunned.current) return;
        isRunned.current = true;

        getById(id).then((result) => {
            setLoading(false);
            setData(result.data);
        }).catch((ex) => {
            setDataAlerta({
                variant: 'danger',
                texto: 'Error API'
            });

            setShowAlerta(true);
        });
    }, [data]);

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
    }, [data])

    return (
        <Container>
            <Row className={classes.boxMarginBotTop}>
                <Col md={{ span: 4, offset: 11 }}>
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
                                    <Form.Control value={data.nombreTorneo.replace('\n\t\t\t\t\t\t\t\t\t\t',' ')} disabled />
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
                                            <a target="_blank" href={'https://worldpadeltour.com/' + cuadro.linkCatFase}><Button>{cuadro.NombreFase} - {cuadro.NombreCategoria}</Button></a>
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
                                        <img src={`data:image/png;base64,${snapShoot}`} />
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