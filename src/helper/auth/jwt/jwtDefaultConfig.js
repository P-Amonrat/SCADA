// ** Auth Endpoints
export default {
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',
  commuEndPoint: 'http://192.168.10.27:8285/api',
  otpEndPoint: 'http://119.63.68.140:8282', //dev 
  // otpEndPoint: 'https://localhost:44378', //localhost
  analyzeEndPoint: 'https://analyze.ants.co.th/AnalystData/Analyst',
  // britzEndPoint: 'https://localhost:7285/api', //localhost
  britzEndPoint: 'http://119.63.68.140:8281/api', //dev 

  apiEndPoint: "http://119.63.71.114:9301/api", //localhost

  // tokenMainEndPoint: 'https://localhost:7064/api', //localhost
  tokenMainEndPoint: 'http://119.63.68.140:8051/api', //dev 
  apiSmsEndPoint: 'http://localhost:64428/api', //localhost 
  apiPrivatEndPoint: 'http://localhost:64428/api',

  // apiAccountSetting: 'https://localhost:44378/api', //localhost 
  apiAccountSetting: 'http://192.168.10.27:8284/api', //dev 

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
}
