import axios from "axios";

const instance = axios.create({
  baseURL: "https://data.covid19india.org/v4/min" 
});

export default instance