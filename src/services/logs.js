import axios from "axios";

const baseURL = "http://217.182.129.103:4000/api/v1/logs";

export const getAll = () => axios.get(baseURL).then((response) => {
    return response;
  });


