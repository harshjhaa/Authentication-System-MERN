import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import * as userApi from '../api/UserApi'

const Login = ({ history }) => {

    const [credentials, setCredentials] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        (async function anyNameFunction() {
            const token = localStorage.getItem('authToken')
            console.log(token)
            await userApi.tokenIsValid(token)
                .then(response => response.data)
                .then(data => {
                    // console.log(data)
                    // history.push('/home')
                    setIsLoggedIn(true)
                })
        })();
    }, [])

    const handleChangeEvent = (e, field) => {
        let fieldValue = e.target.value
        setCredentials({ ...credentials, [field]: fieldValue })
    }

    const handleLoginEvent = (e) => {
        e.preventDefault()
        userApi.doLogin(credentials)
            .then(response => response.data)
            .then(data => {
                let { token } = data
                localStorage.setItem('authToken', token)
                history.push('/home')
            })
    }

    const handleRegisterEvent = () => {
        history.push('/register')
    }

    const renderLoginForm = () => {
        if (isLoggedIn) {
            return (<Redirect to="/home" />)
        }
        return (
            <div className="row">
                <div className="col-6">
                    <div className="card">
                        <div className="card-header">Login</div>
                        <div className="card-body">
                            <form onSubmit={e => { handleLoginEvent(e) }}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input className="form-control" onChange={e => handleChangeEvent(e, 'email')} required />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" onChange={e => handleChangeEvent(e, 'password')} required />
                                </div>
                                <button style={{ width: '100%' }} type="submit" className="btn btn-info">Login</button>
                            </form>
                            <br />
                            <button style={{ width: '100%' }} onClick={e => handleRegisterEvent(e)} className="btn btn-info">Not Registered ?</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {renderLoginForm()}
        </div>
    );
};

export default Login;