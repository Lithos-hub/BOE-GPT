import axios from "axios";

const boeApi = axios.create({
  baseURL: "/api",
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
});

export default boeApi;
