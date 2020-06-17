import axios from 'axios'

//register
export function doSave(user) {
    let apiUrl = 'http://localhost:8080/user/register'
    return axios.post(apiUrl, user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//login
export function doLogin(credentials) {
    let apiUrl = 'http://localhost:8080/user/login'
    return axios.post(apiUrl, credentials, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//retrieving user information
export function loadUserProfile() {
    const authToken = localStorage.getItem('authToken') || ''
    let apiUrl = `http://localhost:8080/profile`
    return axios.get(apiUrl, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
}

//retrieving user information
export function tokenIsValid(token) {
    let apiUrl = `http://localhost:8080/profile`
    return axios.get(apiUrl, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

//getting all users
export function getAllUsers(credentials) {
    let apiUrl = 'http://localhost:8080/get-users'
    return axios.get(apiUrl, credentials, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}