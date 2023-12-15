import axios from "axios"

export const apiClient = axios.create({
  baseURL: `http://10.161.1.3:8081/api/`
  // baseURL: `http://119.63.71.114:9301/api/`
})