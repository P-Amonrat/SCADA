import useJwt from '@src/helper/auth/jwt/jwtDefaultConfig'
import APIHandler from "@src/helper/httpService/axiosConfig"

const apiEndPoint = useJwt.apiEndPoint

const searchProfileManual = (payload) => {
  return APIHandler.post(`${apiEndPoint}/profile/searchProfileManual`, payload)
}

const getRtuDropdown = () => {
  return APIHandler.get(`${apiEndPoint}/profile/getRtu`)
}

const saveProfile = (payload) => {
  return APIHandler.post(`${apiEndPoint}/profile/save`, payload)
}

const getProfileByUser = () => {
  return APIHandler.get(`${apiEndPoint}/profile/getProfileByUser`)
}

const deleteProfile = (id) => {
  return APIHandler.delete(`${apiEndPoint}/profile/delete/${id}`)
}

const getProfileByProfileId = (id) => {
  return APIHandler.get(`${apiEndPoint}/profile/getProfileByProfileId/${id}`)
}

const authenProfile = (payload) => {
  return APIHandler.post(`${apiEndPoint}/authen/authProfile`, payload)
}

const getUserForAuthen = () => {
  return APIHandler.get(`${apiEndPoint}/users/getForAuthenPage`)
}

const ProfileService = {
  searchProfileManual,
  getRtuDropdown,
  saveProfile,
  getProfileByUser,
  deleteProfile,
  getProfileByProfileId,
  authenProfile,
  getUserForAuthen
}

export default ProfileService