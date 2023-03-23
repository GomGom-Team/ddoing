import axios from "axios";

export function axiosInitializer() {
  let instance = axios.create({
    baseURL: "http://localhost:8080",
  });
  return instance;
}
