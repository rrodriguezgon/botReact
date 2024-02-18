import { useCallback, useState } from 'react';

import { Container, Grid, Card, CardContent, CardActions, TextField, FormGroup, FormControlLabel, Checkbox, Button } from '@mui/material';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import useStyles from "./index.css";

export default function Filtros({ search }) {
  const [filters, setFilters] = useState({});

  const classes = useStyles();

  const handleSearch = useCallback(() => {
    search(filters);
  }, [filters]);

  const handleChange = useCallback((event) => {
    const target = event.target;
    const { value, name, checked } = target;

    setFilters((prevState) => ({
      ...prevState,
      [name]: (checked ? checked : value)
    }));
  }, []);

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
                <FormControlLabel className={classes.boxMarginTop} control={<Checkbox name="terminado" onChange={handleChange} />} label="No terminado" />
              </FormGroup>
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
