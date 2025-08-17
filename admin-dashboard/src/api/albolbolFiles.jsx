import axios from "axios";
import {tokenStore} from "../utils/dataStore.js";

const albolbolFiles = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        "Accept":"application/json",
        "Content-Type": "multipart/form-data",
        "Accept-Language":"en",
        "Authorization":`Bearer ${tokenStore.getToken()}`,
    },
});

export default albolbolFiles;
