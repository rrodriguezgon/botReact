import axios from "axios";

const baseURL = "https://botapi-z8u7.onrender.com/selenium";

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
