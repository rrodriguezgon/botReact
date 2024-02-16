import axios from "axios";

const baseURL = "http://217.182.129.103:4000";
// const baseURL = "http://localhost:4000";

export const getAll = () =>
  axios.get(`${baseURL}/api/v1/torneos`).then((response) => {
    return response;
  });

export const getAllWithFilters = (filters = {}) =>
  axios.post(`${baseURL}/api/v1/torneos/filters`, filters).then((response) => {
    return response;
  });

export const getById = (id) =>
  axios.get(`${baseURL}/api/v1/torneos/${id}`).then((response) => {
    return response;
  });

export const updateById = (id, torneo) =>
  axios.patch(`${baseURL}/api/v1/torneos/${id}`, torneo).then((response) => {
    return response;
  });

export const deleteById = (id) =>
  axios.delete(`${baseURL}/api/v1/torneos/${id}`).then((response) => {
    return response;
  });

export const deleteAll = () =>
  axios.delete(baseURL).then((response) => {
    return response;
  });
