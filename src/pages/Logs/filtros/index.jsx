import { useCallback, useState } from 'react';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import useStyles from "./index.css";
import { Container, Grid, Card, CardContent, CardActions, Select, InputLabel, MenuItem, FormControl, Button } from '@mui/material';

export default function Filtros({ search, comandosOptions, typesOptions }) {
  const [filters, setFilters] = useState({});

  const classes = useStyles();

  const handleChange = useCallback((evt) => {
    const { name, value } = evt.target;
    setFilters((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }, []);

  const handleSearch = useCallback(() => {
    search(filters);
  }, [filters]);

  const handleChangeDate = useCallback((date) => {
    setFilters((prevState) => ({
      ...prevState,
      date: dayjs(date).toDate()
    }));
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
                  name="Comando"
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
        <Button variant="contained" onClick={() => handleSearch()}>Search</Button>
      </CardActions>
    </Card >
  );
}
