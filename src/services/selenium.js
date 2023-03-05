import axios from "axios";

const baseURL = "http://localhost:8080/selenium";

export const getSnapshoot = (url) =>
    axios({
        method: 'post',
        url: baseURL + '/getScreenshot',
        data: {
            'url': url
        },
        responseType: 'arraybuffer'
    }).then((response) => {
        return response;
    });
