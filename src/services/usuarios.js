import axios from "axios";

const baseURL = "http://localhost:8080/usuarios";

export const getAll = (params = {}) =>
  axios.get(baseURL, { params }).then((response) => {
    return response;
  });

export const getByNick = (nick) =>
  axios.get(baseURL + `/nick/{nick}`).then((response) => {
    return response;
  });

export const getById = (id) =>
  axios.get(baseURL + `/${id}`).then((response) => {
    return response;
  });

 export const updateById = (user) =>
  axios.patch(baseURL + `/${user._id}`, user).then((response) => {
    return response;
  });

export const deleteById = (id) =>
  axios.delete(baseURL + `/${id}`).then((response) => {
    return response;
  });
