import React, { useCallback, useEffect, useState, useRef } from "react";
import {
    useParams,
    Link
} from "react-router-dom";
import moment from "moment/moment";

import { getById, updateById } from "../../services/usuarios";

import useStyles from "./Detalles.css";
import "react-datepicker/dist/react-datepicker.css";

import Loading from "../../components/Loading";
import ModalComponent from "../../components/Modal";
import Alerta from "../../components/Alerta";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';

export default function UsuariosDetalles() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [strikes, setStrikes] = useState();
    const [numEnlaces, setNumEnlaces] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showAlerta, setShowAlerta] = useState(false);
    const [dataAlerta, setDataAlerta] = useState({});
    const isRunned = useRef(false);

    const classes = useStyles();

    let { id } = useParams();

    useEffect(() => {
        if (isRunned.current) {
            return;
        }
        isRunned.current = true;

        setLoading(true);
        getById(id).then((result) => {
            setLoading(false);
            setData(result.data);
            setStrikes(result.data.strike);
            setNumEnlaces(result.data.numEnlaces);
        }).catch(() => {
            setDataAlerta({
                variant: 'error',
                texto: 'Error API'
            });

            setShowAlerta(true);
        });
    }, [id]);

    const handleSumarStrike = useCallback(() => {
        const sumar = strikes + 1;
        setStrikes(sumar);
    }, [strikes]);

    const handleRestarStrike = useCallback(() => {
        const restar = strikes - 1;
        setStrikes(restar);
    }, [strikes]);

    const handleSumarEnlaces = useCallback(() => {
        const sumar = numEnlaces + 1;
        setNumEnlaces(sumar);
    }, [numEnlaces]);

    const handleRestarEnlaces = useCallback(() => {
        const restar = numEnlaces - 1;
        setNumEnlaces(restar);
    }, [numEnlaces]);

    const handleOpenModal = useCallback(() => {
        setShowModal(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setShowModal(false);
    }, []);

    const handleCloseAlerta = useCallback(() => {
        setShowAlerta(false);
    }, [setShowAlerta]);

    const editarUsuario = useCallback(() => {
        setShowModal(false);

        data.strike = strikes;
        data.numEnlaces = numEnlaces;

        updateById(data).then((resultUpdate) => {
            setData(resultUpdate.data);
            setDataAlerta({
                variant: 'success',
                texto: 'Usuario Actualizado'
            });

            setShowAlerta(true);

        }).catch(() => {
            setDataAlerta({
                variant: 'error',
                texto: 'Error API'
            });

            setShowAlerta(true);
        });
    }, [strikes, numEnlaces, data]);

    return (
        <Container>
            <Row className={classes.boxMarginBotTop}>
                <Col md={{ span: 4, offset: 11 }}>
                    <Link to={`/usuarios`}><Button variant="primary">Volver</Button></Link>
                </Col>
            </Row>
            {showAlerta &&
                <Row>
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
                <Form>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Nick</Form.Label>
                                <Form.Control value={data.nick} disabled />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Numero Enlaces</Form.Label>
                                        <Form.Control value={numEnlaces} disabled />
                                    </Form.Group>
                                </Col>
                                <Col className={classes.boxBtnNumeros}>
                                    <Button onClick={() => handleSumarEnlaces()}>+</Button>
                                </Col>
                                <Col className={classes.boxBtnNumeros}>
                                    <Button onClick={() => handleRestarEnlaces()}>-</Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Strikes</Form.Label>
                                        <Form.Control value={strikes} disabled />
                                    </Form.Group>
                                </Col>
                                <Col className={classes.boxBtnNumeros}>
                                    <Button onClick={() => handleSumarStrike()}>+</Button>
                                </Col>
                                <Col className={classes.boxBtnNumeros}>
                                    <Button onClick={() => handleRestarStrike()}>-</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Entrada al Server</Form.Label>
                                <DatePicker selected={(data.tServer ? moment(data.tServer).toDate() : undefined)} disabled />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Entrada a discord</Form.Label>
                                <DatePicker selected={(data.tDiscord ? moment(data.tDiscord).toDate() : undefined)} disabled />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            )}
            <Row className={classes.boxMarginBotTop}>
                <Col md={{ span: 4, offset: 5 }}>
                    <Button variant="primary" onClick={() => handleOpenModal()}>Guardar</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ModalComponent
                        showModal={showModal}
                        titleHeader="Estas Seguro?"
                        textContent="Estas seguro que quieres guardar este Usuario?"
                        closeModal={handleCloseModal}
                        buttonAcceptFN={editarUsuario}
                        buttonCancelFN={handleCloseModal} />
                </Col>
            </Row>
        </Container>
    );
}
