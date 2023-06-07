import { useCallback, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import useStyles from "./Filtro.css";

function UsuariosFiltros({ search }) {
  const [formData, setFormData] = useState({});

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

  const handleClear = useCallback(() => {
    setFormData({
      ...formData,
      nick: ''
    });

    handleSearch();
  }, [formData, handleSearch]);

  return (
    <Card>
      <Card.Header>Usuarios</Card.Header>
      <Card.Body>
        <Card.Text>
          <Form>
            <Form.Group>
              <Form.Label>Nick</Form.Label>
              <Form.Control placeholder="Nick" value={formData.nick} name="nick" onChange={handleChange} />
            </Form.Group>
          </Form>
        </Card.Text>
        <Button variant="primary" className={classes.boxBtnSearch} onClick={handleSearch}>SEARCH</Button>
        <Button variant="primary" onClick={handleClear}>CLEAR</Button>
      </Card.Body>
    </Card>
  );
}

export default UsuariosFiltros;
