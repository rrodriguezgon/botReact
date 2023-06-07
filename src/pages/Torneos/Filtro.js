import { useCallback, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatePicker from "react-datepicker";

import useStyles from "./Filtro.css";

function TorneosFiltros({ search, deleteAll }) {
  const [formData, setFormData] = useState({terminado: false});

  const classes = useStyles();

  const handleChange = useCallback((event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value
    });
  }, [formData]);

  const handleSearch = useCallback(() => {
    search(formData);
  }, [formData, search]);

  const handleChangeDate = useCallback((date) => {
    setFormData({
      ...formData,
      date,
    });
  }, [formData]);

  const handleClear = useCallback(() => {
    setFormData({
      torneo: '',
      date: undefined,
    });

    handleSearch();
  }, [formData, handleSearch]);

  const handleDeleteAll = useCallback(() => {
    console.log("eliminar");
    deleteAll();
  }, [deleteAll]);


  return (
    <Card>
      <Card.Header>Torneos</Card.Header>
      <Card.Body>
        <Card.Text>
          <Container>
            <Form>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Nombre Torneo</Form.Label>
                    <Form.Control placeholder="Nombre Torneo" value={formData.torneo} name="nombre" onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Label>Fecha Desde</Form.Label>
                  <DatePicker dateFormat="dd/MM/yyyy" selected={formData.date} onChange={(date) => handleChangeDate(date)} />
                </Col>
                <Col>
                  <Form.Label>No Terminado</Form.Label>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    name="terminado"
                    value={formData.terminado}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Form>
          </Container>
        </Card.Text>
        <Button variant="primary" className={classes.boxBtnSearch} onClick={handleSearch}>SEARCH</Button>
        <Button variant="primary" className={classes.boxBtnSearch} onClick={handleClear}>CLEAR</Button>
        <Button variant="danger" onClick={handleDeleteAll} disabled>ELIMINAR TODOS</Button>
      </Card.Body>
    </Card >
  )
}

export default TorneosFiltros;