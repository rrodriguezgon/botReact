import { useCallback, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

import useStyles from "./Filtro.css";

function TorneosFiltros({ search }) {
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
    }, [formData]);
  
    const handleClear = useCallback(() => {
      setFormData({
        ...formData,
        torneo: ''
      });
  
      handleSearch();
    }, []);


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
                <Button variant="primary" onClick={handleClear}>CLEAR</Button>
            </Card.Body>
        </Card>
    )
}

export default TorneosFiltros;