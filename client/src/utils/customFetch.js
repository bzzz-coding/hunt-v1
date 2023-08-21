import axios from "axios";

// Create an instance
const customFetch = axios.create({
  baseURL: "/api/v1",
});

export default customFetch;

/*
// fetch('/api/v1/test')
//   .then((res) => res.json())
//   .then((data) => console.log(data));

// import axios from "axios";
// const response = await axios.get('/api/v1/test'); // response object, where 'data' contains the data responded by the server instructed by API. No need to call response.json()

import customFetch from "./utils/customFetch";

const response = await customFetch.get('/test');
console.log(response);
*/
