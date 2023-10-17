import useJwt from '@src/helper/auth/jwt/jwtDefaultConfig'
import APIHandler from "@src/helper/httpService/axiosConfig"

const apiEndPoint = useJwt.apiEndPoint

const getRole = () => {
  return APIHandler.get(`${apiEndPoint}/getRoles`)
}

const GetRoleService = {
  getRole
}

export default GetRoleService