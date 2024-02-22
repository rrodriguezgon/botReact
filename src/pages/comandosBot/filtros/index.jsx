// Imports REACT
import { useCallback, useState } from 'react';

// Imports Material UI
import { Container, Grid, Card, CardContent, CardActions, TextField, FormControl, InputLabel, Select, Button, MenuItem } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import useStyles from "./index.css";


export default function Filtros({ search }) {
  const [filters, setFilters] = useState({ nombre: null, tipo: null });

  const classes = useStyles();

  const handleSearch = useCallback(() => {
    search(filters);
  }, [filters]);

  const handleChange = useCallback((event) => {
    const target = event.target;
    const { value, name, className, checked } = target;

    setFilters((prevState) => ({
      ...prevState,
      [name]: (className.includes('PrivateSwitchBase') ? checked : value)
    }));
  }, []);

  const handleClear = useCallback(() => {
    setFilters({});
  }, []);

  const tipoOptions = ['lanzador', 'observador'];

  return (
    <Card>
      <CardContent>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                name="nombre"
                label="Nombre"
                value={filters.nombre}
                onChange={handleChange}
                margin="dense"
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="select-label-tipo">Tipo</InputLabel>
                <Select
                  name="tipo"
                  labelId='select-label-tipo'
                  className={classes.boxMarginTop}
                  value={filters.tipo}
                  label="Tipo"
                  onChange={handleChange}
                  margin='dense'
                  fullWidth
                >
                  {tipoOptions.map(tipo => <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Container>
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={handleSearch}>Search</Button>
        <Button variant="contained" color="secondary" onClick={handleClear}>Clear</Button>
      </CardActions>
    </Card >
  );
}
