import axios from "axios";

const BoeApi = axios.create({
  baseURL: "/api",
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
});

export default BoeApi;
