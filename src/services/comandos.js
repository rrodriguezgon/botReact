import axios from "axios";

const baseURL = `${process.env.REACT_APP_BASE_URL_API}/api/v1/comandos`;

axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem("token")}`}

export const getAll = () =>
  axios.get(`${baseURL}`).then((response) => {
    return response;
  });

export const getAllWithFilters = (filters = {}) =>
  axios.post(`${baseURL}/filters`, filters).then((response) => {
    return response;
  });

export const getById = (id) =>
  axios.get(`${baseURL}/${id}`).then((response) => {
    return response;
  });

export const create = (torneo) =>
  axios.post(`${baseURL}`, torneo).then((response) => {
    return response;
  });

export const updateById = (id, torneo) =>
  axios.patch(`${baseURL}/${id}`, torneo).then((response) => {
    return response;
  });

export const deleteById = (id) =>
  axios.delete(`${baseURL}/${id}`).then((response) => {
    return response;
  });

export const deleteAll = () =>
  axios.delete(baseURL).then((response) => {
    return response;
  });
