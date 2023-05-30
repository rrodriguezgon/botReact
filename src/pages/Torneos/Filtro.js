import { useCallback, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import useStyles from "./Filtro.css";

function TorneosFiltros({ search, deleteAll }) {
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
        torneo: ''
      });
  
      handleSearch();
    }, [formData, handleSearch]);

    const handleDeleteAll = useCallback(()=> {
      console.log("eliminar");
      deleteAll();
    }, [deleteAll]);


    return (
        <Card>
            <Card.Header>Torneos</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre Torneo</Form.Label>
                            <Form.Control placeholder="Nombre Torneo" value={formData.torneo} name="torneo" onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Card.Text>
                <Button variant="primary" className={classes.boxBtnSearch} onClick={handleSearch}>SEARCH</Button>
                <Button variant="primary" className={classes.boxBtnSearch} onClick={handleClear}>CLEAR</Button>
                <Button variant="danger" onClick={handleDeleteAll} disabled>ELIMINAR TODOS</Button>
            </Card.Body>
        </Card>
    )
}

export default TorneosFiltros;