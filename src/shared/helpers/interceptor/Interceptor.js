// import core modules
import axios from "axios";
import { warning } from "../alerts/Toast";
// import styles
import "./Interceptor.scss";


// custom exception display messages
const customException = response => {
    if (response && response?.status) {
        switch (response.status) {
            case 0:
                break;
            case 200:
                if (response.data.user) {
                    sessionStorage.setItem("user", JSON.stringify(response.data.user));
                }
                break;
            case 201:
                break;
            default:
                break;
        }
    } else {
        switch (response?.response?.status) {
            case 401:
                warning(response.response.data.error.message);
                break;
            case 400:
                warning(response.response.data.message);
                return response;
            case 404:
                warning(response.response.data.message);
                break;
            case 500:
                warning("Oops! something went wrong. Please try again!");
                break;
            case 409:
                warning(response.response.data.error.message);
                break;
            default:
                break;
        }
    }
    return null;
};

export default function AxiosInterceptor() {
    // Add a request interceptor
    axios.interceptors.request.use(
        request => {
            return request;
        },
        error => {
            // Do something with request error
            customException(error); // custom exception while request error occurred
            return Promise.reject(error);
        }
    );

    // Add a response interceptor
    axios.interceptors.response.use(
        response => {
            // Do something after response is received
            customException(response); // custom exception incoming success response
            return response;
        },
        error => {
            // Do something with request error
            customException(error); // custom exception incoming response error occurred
            return Promise.reject(error);
        }
    );
}
