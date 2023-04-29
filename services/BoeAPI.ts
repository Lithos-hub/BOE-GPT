import axios from "axios";

const boeApi = axios.create({
  baseURL: "/api",
});

export default boeApi;
