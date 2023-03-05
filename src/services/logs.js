import axios from "axios";

const baseURL = "http://localhost:8080/logs";

export const getAll = () => axios.get(baseURL).then((response) => {
    return response;
  });


