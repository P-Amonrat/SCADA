// ** JWT Service Import
import JwtService from './jwtService'

// ** Export Service as useJwt
export default function useJwt(jwtOverrideConfig) {
  // console.log('useJwt === > ', jwtOverrideConfig)
  const jwt = new JwtService(jwtOverrideConfig)
  // console.log('====== ', jwt)

  return {
    jwt
  }
}
