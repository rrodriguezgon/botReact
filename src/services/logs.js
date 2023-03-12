import axios from "axios";

const baseURL = "https://botapi-z8u7.onrender.com/logs";

export const getAll = () => axios.get(baseURL).then((response) => {
    return response;
  });


