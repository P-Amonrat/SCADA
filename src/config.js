import { apiClient } from './api'
// import { token } from "./helpers";

export function CallApiClient(url, req) {
    return apiClient
        .post(url, req).then(data => data)
        .catch(response => response)
} 

export function Call_apipost(url, req, responseType, requesttype) {
    return apiClient
        .post(url, req, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-type': 'application/json; charset=UTF-8',
                'request-type': requesttype
            },
            responseType: responseType ? responseType : {}
        }).then(data => data)
        .catch(response => response)
}

export function Call_apiget(url, req) {
    return apiClient
        .get(url, req, {
            headers: {
                Authorization: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTE5LjYzLjcxLjExNDo5MzAxL2FwaS9sb2dpbiIsImlhdCI6MTY5NTI4NDA5NCwiZXhwIjoxNjk1Mjg3Njk0LCJuYmYiOjE2OTUyODQwOTQsImp0aSI6IkNEdWZFVGw0MlA1RE5mcXoiLCJzdWIiOiI1IiwicHJ2IjoiMDNkODFjMjUzMTA3N2NkNzhiNTliZjE0YmFkMzdiZjA0Mjg2ZWYwNiJ9.6WOQdGaXLUaYLa4GRL_BUMTIrgjRrHhIkxzMIW8ovlQ`,
                "Content-type": "application/json; charset=UTF-8",
                Accept: "application/json"
            }
        } 
        ).then(data => data)
        .catch(response => response)
}
