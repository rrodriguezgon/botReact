import axios from "axios";

const baseURL = "http://217.182.129.103:4000/api/v1/comandos";
// const baseURL = "http://localhost:4000/api/v1/comandos";

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
