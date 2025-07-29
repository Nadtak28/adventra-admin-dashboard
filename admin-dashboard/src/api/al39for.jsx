// src/api/axiosInstance.js
import axios from "axios";

const al39for = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Accept":"application/json",
    "Content-Type":"application/json",
    "Accept-Language":"er"
  },
});

export default al39for;
