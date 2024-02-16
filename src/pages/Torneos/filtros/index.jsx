import { useCallback, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatePicker from "react-datepicker";

import useStyles from "./index.css";

export default function TorneosFiltros({ search, deleteAll }) {
  const [filters, setFilters] = useState({});

  const classes = useStyles();

  const handleChange = useCallback((event) => {
    const target = event.target;
    const {value, name, className, checked} = target;

    setFilters((prevState) => ({
      ...prevState,
      [name]: (className === 'form-check-input' ? checked : value)
    }));
  }, []);

  const handleSearch = useCallback(() => {
    search(filters);
  }, [filters]);

  const handleChangeDate = useCallback((date) => {
    setFilters((prevState) => ({
      ...prevState,
      date
    }));
  }, []);

  const handleDeleteAll = useCallback(() => {
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
                    <Form.Control placeholder="Nombre Torneo" value={filters.nombre} name="nombre" onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Label>Fecha Desde</Form.Label>
                  <DatePicker dateFormat="dd/MM/yyyy" selected={filters.date} onChange={(date) => handleChangeDate(date)} />
                </Col>
                <Col>
                  <Form.Label>No Terminado</Form.Label>
                  <Form.Check
                    type="checkbox"
                    name="terminado"
                    value={filters.terminado}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Form>
          </Container>
        </Card.Text>
        <Button variant="primary" className={classes.boxBtnSearch} onClick={handleSearch}>SEARCH</Button>
        <Button variant="danger" onClick={handleDeleteAll} disabled>ELIMINAR TODOS</Button>
      </Card.Body>
    </Card >
  );
}
