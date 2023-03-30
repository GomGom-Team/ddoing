import axios from "axios";

export function axiosInitializer() {
  let instance = axios.create({
    baseURL: "http://localhost:8081",
    // baseURL: "http://j8a103.p.ssafy.io:8081",
    // baseURL: "https://j8a103.p.ssafy.io",
  });
  return instance;
}
