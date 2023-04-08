import axios from "axios";

const BoeApi = axios.create({
  baseURL: "/api",
});

export default BoeApi;
