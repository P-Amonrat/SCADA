import useJwt from '@src/helper/auth/jwt/jwtDefaultConfig'
import APIHandler from "@src/helper/httpService/axiosConfig"

const apiEndPoint = useJwt.apiEndPoint

const getHistoricalReport = (payload) => {
  return APIHandler.post(`${apiEndPoint}/historical/getReport`, payload)
}

const getRtuNameByRegion = (id) => {
  return APIHandler.get(`${apiEndPoint}/gmdr/getRtuName?region=${id}`)
}

const getFlowCampByRegion = (name) => {
  return APIHandler.get(`${apiEndPoint}/gmdr/getFlowCamp?rtu=${name}`)
}

const getDailyReport = (payload) => {
  return APIHandler.post(`${apiEndPoint}/gmdr/getReportDaily`, payload)
}

const getHourlyReport = (payload) => {
  return APIHandler.post(`${apiEndPoint}/gmdr/getReportHourly`, payload)
}

const getCheckGmdrReport = (payload) => {
  return APIHandler.post(`${apiEndPoint}/gmdr/getReportCheckGmdr`, payload)
}

const ReportService = {
  getHistoricalReport,
  getRtuNameByRegion,
  getFlowCampByRegion,
  getDailyReport,
  getHourlyReport,
  getCheckGmdrReport
}

export default ReportService