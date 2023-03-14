import axios from 'axios'

export function axiosInitializer() {
  let instance = axios.create({
    baseURL: ""
  });
  return instance;
}