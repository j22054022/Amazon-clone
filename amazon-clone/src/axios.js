import axios from "axios";

const instance = axios.create({
    // the API clound function URL
    baseURL: 'http://localhost:5001/clone-490fc/us-central1/api'
})

export default instance;