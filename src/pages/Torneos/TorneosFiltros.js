import { useCallback, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatePicker from "react-datepicker";

import useStyles from "./Filtro.css";

export default function TorneosFiltros({ search, deleteAll }) {
  const [formData, setFormData] = useState({});

  const classes = useStyles();

  const handleChange = useCallback((event) => {
    const target = event.target;
    const {value, name, className, checked} = target;

    setFormData({
      ...formData,
      [name]: (className === 'form-check-input' ? checked : value)
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
    setFormData({});

    handleSearch();
  }, [handleSearch]);

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
                    type="checkbox"
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
  );
}
