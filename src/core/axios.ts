import axios from "axios";

declare global {
    interface Window {
        axios: typeof axios;
    }
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

window.axios = axios;

export default axios;
