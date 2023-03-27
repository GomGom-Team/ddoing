import axios from "axios";

export function axiosInitializer() {
  let instance = axios.create({
    baseURL: "http://localhost:8080",
    // baseURL: "https://j8a103.p.ssafy.io",
  });
  return instance;
}
