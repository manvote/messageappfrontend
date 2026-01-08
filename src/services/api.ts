import axios from 'axios';

// export const api = axios.create({
//   baseURL: 'https://localhost:5000',
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

export const api = axios.create({
  baseURL: 'http://10.0.2.2:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});
