import axios from "axios"

export const apiClient = axios.create({
  baseURL: `http://119.63.71.114:9301/`
})