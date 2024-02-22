import { useCallback, useState } from 'react';

import { Container, Grid, Card, CardContent, CardActions, TextField, FormGroup, FormControlLabel, MenuItem, Checkbox, Button, FormControl, Select, InputLabel } from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import useStyles from "./index.css";

export default function Filtros({ search, estadoOptions, typesOptions }) {
  const [filters, setFilters] = useState({nombre: null, type: null, estado: null, date: null, terminado: null});

  const classes = useStyles();

  const handleSearch = useCallback(() => {
    search(filters);
  }, [filters]);

  const handleChange = useCallback((event) => {
    const target = event.target;
    const { value, name, checked } = target;

    setFilters((prevState) => ({
      ...prevState,
      [name]: ( checked ? checked : value)
    }));
  }, []);

  const handleChangeDate = useCallback((date) => {
    setFilters((prevState) => ({
      ...prevState,
      date: dayjs(date).toDate()
    }));
  }, []);

  const handleClear = useCallback(() => {
    setFilters({});
  }, []);

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
              <DatePicker
                name="date"
                fullWidth
                className={classes.boxMarginTop}
                label="Fecha"
                format="DD-MM-YYYY"
                value={dayjs(filters.date)}
                onChange={(date) => handleChangeDate(date)}
                slotProps={{
                  field: { clearable: true },
                }} />
            </Grid>
            <Grid item xs={4}>
              <FormGroup>
                <FormControlLabel className={classes.boxMarginTop} control={<Checkbox name="terminado" value={filters.terminado} onChange={handleChange} />} label="terminados" />
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
