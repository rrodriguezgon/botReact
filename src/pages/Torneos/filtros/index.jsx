// Imports REACT
import { useCallback, useState } from 'react';
// Imports Material UI
import { Container, Grid, Card, CardContent, CardActions, TextField, FormGroup, FormControlLabel, MenuItem, Checkbox, Button, FormControl, Select, InputLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';

import useStyles from "./index.css";


export default function Filtros({ search, estadoOptions, typesOptions }) {
  const [filters, setFilters] = useState({ nombre: null, type: null, estado: null, date: null, terminado: null, circuito: null });

  const classes = useStyles();

  const handleSearch = useCallback(() => {
    search(filters);
  }, [filters]);

  const handleChange = useCallback((event) => {
    const target = event.target;
    const { value, name, className, checked } = target;

    setFilters((prevState) => ({
      ...prevState,
      [name]: (className?.includes('PrivateSwitchBase') ? checked : value)
    }));
  }, []);

  const handleChangeDate = useCallback((date) => {
    setFilters((prevState) => ({
      ...prevState,
      date: moment(date).toDate()
    }));
  }, []);

  const handleClear = useCallback(() => {
    setFilters({ nombre: '' });
  }, []);

  const circuitoOptions = ['fip', 'a1padel', 'upt'];

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
                <InputLabel id="select-label-estado">Estado</InputLabel>
                <Select
                  name="estado"
                  labelId='select-label-estado'
                  className={classes.boxMarginTop}
                  value={filters.estado}
                  label="Estado"
                  onChange={handleChange}
                  margin='dense'
                  fullWidth
                >
                  {estadoOptions.map(estado => <MenuItem value={estado}>{estado}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="select-label-tipo">Tipo</InputLabel>
                <Select
                  name="type"
                  labelId='select-label-tipo'
                  className={classes.boxMarginTop}
                  value={filters.type}
                  label="Tipo"
                  onChange={handleChange}
                  margin='dense'
                  fullWidth
                >
                  {typesOptions.map(tipo => <MenuItem value={tipo}>{tipo}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="select-label-circuito">Circuito</InputLabel>
                <Select
                  name="circuito"
                  labelId='select-label-circuito'
                  className={classes.boxMarginTop}
                  value={filters.circuito}
                  label="Circuito"
                  onChange={handleChange}
                  margin='dense'
                  fullWidth
                >
                  {circuitoOptions.map(circuito => <MenuItem value={circuito}>{circuito}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <DatePicker
                name="date"
                fullWidth
                className={classes.boxMarginTop}
                label="Fecha"
                format="DD-MM-YYYY"
                value={moment(filters.date)}
                onChange={(date) => handleChangeDate(date)}
                slotProps={{
                  field: { clearable: true },
                }} />
            </Grid>
            <Grid item xs={4}>
              <FormGroup>
                <FormControlLabel className={classes.boxMarginTop} control={<Checkbox name="terminado" checked={filters.terminado} onChange={handleChange} />} label="terminados" />
              </FormGroup>
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
