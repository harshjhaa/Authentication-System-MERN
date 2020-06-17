import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import * as userApi from '../api/UserApi'

const Register = ({ history }) => {

    let [user, setUser] = useState({})

    const handleChangeEvent = (e, field) => {
        let fieldValue = e.target.value
        setUser({ ...user, [field]: fieldValue })
    }

    const handleRegisterEvent = e => {
        e.preventDefault()
        userApi.doSave(user)
            .then(response => response.data)
            .then(user => {
                history.push('/')
                // return <Redirect to="/" />

            })
    }

    const handleLoginEvent = () => {
        history.push('/')
    }

    return (
        <div>
            <div className="row">
                <div className="col-6">
                    <div className="card">
                        <div className="card-header">Register</div>
                        <div className="card-body">
                            <form onSubmit={e => { handleRegisterEvent(e) }}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input required className="form-control" onChange={e => handleChangeEvent(e, 'email')} />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input required type="password" className="form-control" onChange={e => handleChangeEvent(e, 'password')} />
                                </div>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input required className="form-control" onChange={e => handleChangeEvent(e, 'name')} />
                                </div>
                                <div className="form-group">
                                    <label>Mobile</label>
                                    <input required className="form-control" onChange={e => handleChangeEvent(e, 'mobile')} />
                                </div>
                                <button style={{ width: '100%' }} type="submit" className="btn btn-info">Register</button>
                            </form>
                            <br />
                            <button style={{ width: '100%' }} onClick={e => handleLoginEvent(e)} className="btn btn-info">Already User ?</button>
                        </div>
                    </div>
                </div >
            </div >
        </div>
    );
};

export default Register;