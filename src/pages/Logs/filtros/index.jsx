import { useCallback, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DatePicker from "react-datepicker";

import useStyles from "./index.css";

export default function Filtros({ search }) {
  const [filters, setFilters] = useState({});

  const classes = useStyles();

  const handleChange = useCallback((event) => {
    const target = event.target;
    const { value, name, className, checked } = target;

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
                    <Form.Label>Comando</Form.Label>
                    <Form.Select name="comando" value={filters.comando} onChange={handleChange}>
                      <option value="">Comando</option>
                      <option value="lanzarComando">lanzarComando</option>
                      <option value="ready">ready</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Tipo</Form.Label>
                    <Form.Select name="type" value={filters.type} onChange={handleChange}>
                      <option value="">Tipo</option>
                      <option value="Error">Error</option>
                      <option value="Info">Info</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
              <Col>
                  <Form.Label>Fecha Desde</Form.Label>
                  <DatePicker dateFormat="dd/MM/yyyy" selected={filters.date} onChange={(date) => handleChangeDate(date)} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Orden Fecha</Form.Label>
                    <Form.Select name="orden" value={filters.orden} onChange={handleChange}>
                      <option>Orden</option>
                      <option value="asc">ascendente</option>
                      <option value="desc">descendente</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            <Row>
              <Col>
                <Button variant="primary" className={classes.boxBtnSearch} onClick={handleSearch}>SEARCH</Button>
              </Col>
            </Row>
          </Container>
        </Card.Text>
      </Card.Body>
    </Card >
  );
}
