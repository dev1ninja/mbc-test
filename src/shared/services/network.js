import axios from 'axios';
import Cookies from 'js-cookie';

class Network {
    constructor(props = {}) {
        const {headersProvider, baseUrl} = props;
        const defaultHeadersProvider = () => {
            return {};
        };

        this.getProvidedHeaders = headersProvider || defaultHeadersProvider;
        this.baseUrl = baseUrl;
    }

    async get(url, config) {
        const preparedConfig = this.getConfig(config);
        return axios.get(url, preparedConfig);
    }

    async post(url, data, config) {
        const preparedConfig = this.getConfig(config);
        return axios.post(url, data, preparedConfig);
    }

    async put(url, data, config) {
        const preparedConfig = this.getConfig(config);
        return axios.put(url, data, preparedConfig);
    }

    async delete(url, data, config) {
        const preparedConfig = this.getConfig(config);
        return axios.delete(url, {...preparedConfig, data});
    }

    getConfig(config = {}) {
        const {headers = {}} = config;
        const providedHeaders = this.getProvidedHeaders();
        const baseUrl = this.getBaseUrl();

        return {
            ...baseUrl,
            ...config,
            headers: {
                ...headers, ...providedHeaders,
            },
        };
    }

    getBaseUrl() {
        return this.baseUrl ? {baseURL: this.baseUrl} : {};
    }
}


function getDefaultHeaders() {
    const tokenName = 'token';

    const tokenFromCookie = Cookies.get(tokenName);
    const tokenFromSessionStorage = sessionStorage.getItem(tokenName);

    return {
        token: tokenFromCookie || tokenFromSessionStorage,
    };
}

const {REACT_APP_API} = process.env;

const internalNetwork = new Network({headersProvider: getDefaultHeaders, baseUrl: REACT_APP_API});
const externalNetwork = new Network();

export default Network;
export {internalNetwork, externalNetwork};
