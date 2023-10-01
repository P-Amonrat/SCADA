import useJwt from '@src/helper/auth/jwt/jwtDefaultConfig'
import APIHandler from "@src/helper/httpService/axiosConfig"

const apiEndPoint = useJwt.apiEndPoint

const getUserList = () => {
  return APIHandler.get(`${apiEndPoint}/users/get`)
}

const saveUser = (payload) => {
  return APIHandler.post(`${apiEndPoint}/users/save`, payload)
}

const getUserById = (id) => {
  return APIHandler.get(`${apiEndPoint}/users/get/${id}`)
}

const deleteUser = (id) => {
  return APIHandler.delete(`${apiEndPoint}/users/delete/${id}`)
}

const UsersService = {
  getUserList,
  saveUser,
  getUserById,
  deleteUser
}

export default UsersService