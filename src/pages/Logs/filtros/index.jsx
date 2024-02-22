// Imports REACT
import { useCallback, useState } from 'react';

// Imports Material UI
import { Container, Grid, Card, CardContent, CardActions, Select, InputLabel, MenuItem, FormControl, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import useStyles from "./index.css";


export default function Filtros({ search, comandosOptions, typesOptions }) {
  const [filters, setFilters] = useState({comando: null, tipo: null, orden: null, date: null});

  const classes = useStyles();

  const handleSearch = useCallback(() => {
    search(filters);
  }, [filters]);
  
  const handleChange = useCallback((evt) => {
    const { name, value } = evt.target;
    setFilters((prevState) => ({
      ...prevState,
      [name]: value
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
              <FormControl fullWidth>
                <InputLabel id="select-label-comando">Comando</InputLabel>
                <Select
                  name="comando"
                  labelId='select-label-comando'
                  value={filters.type}
                  label="Tipo"
                  onChange={handleChange}
                  margin='dense'
                  fullWidth
                >
                  {comandosOptions.map(comando => <MenuItem value={comando}>{comando}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="select-label-tipo">Tipo</InputLabel>
                <Select
                  name="type"
                  labelId='select-label-tipo'
                  value={filters.type}
                  label="Tipo"
                  onChange={handleChange}
                  margin='dense'
                  fullWidth
                >
                  {typesOptions.map(type => <MenuItem value={type}>{type}</MenuItem>)}
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
              <FormControl fullWidth>
                <InputLabel id="select-label-orden">Orden</InputLabel>
                <Select
                  name="orden"
                  labelId='select-label-orden'
                  defaultValue={filters.orden}
                  value={filters.orden}
                  onChange={handleChange}
                  margin='dense'
                  fullWidth
                >
                  <MenuItem value="asc">ascendente</MenuItem>
                  <MenuItem value="desc">descendente</MenuItem>
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
