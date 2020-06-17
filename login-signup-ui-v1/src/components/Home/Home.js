import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import * as userApi from '../api/UserApi'

const Home = ({ history }) => {

    const [user, setUser] = useState({})

    const [showProfile, setShowProfile] = useState(false)

    const [isLoggedIn, setIsLoggedIn] = useState(true)

    useEffect(() => {
        (async function anyNameFunction() {
            await userApi.loadUserProfile()
                .then(response => response.data)
                .then(data => {
                    setUser(data)
                })
                .catch(error => {
                    setIsLoggedIn(false)
                })
        })();
    }, [])

    const handleLogoutEvent = () => {
        history.push('/logout')
    }

    const handleProfileEvent = () => {
        setShowProfile(!showProfile)
    }

    const renderProfile = (e) => {
        if (showProfile === true) {
            return (
                <div className="card">
                    <div className="card-body">
                        <div className=" col-md-6">
                            <label  ><b>Name</b></label>
                        </div>
                        <div className=" col-md-6">
                            <label  >{user.name}</label>
                        </div>
                        <div className=" col-md-3">
                            <label  ><b>Email</b></label>
                        </div>
                        <div className=" col-md-3">
                            <label  >{user.email}</label>
                        </div>
                        <div className=" col-md-6">
                            <label  ><b>Mobile</b></label>
                        </div>
                        <div className=" col-md-6">
                            <label  >{user.mobile}</label>
                        </div>
                    </div>
                </div>
            )
        }
    }

    const renderHome = (user) => {
        if (!isLoggedIn) {
            return (<Redirect to="/" />)
        }
        return (
            <div className="container">
                <hr />
                <h2 style={{ textAlign: 'center' }}>Hello {user.name}</h2>
                <hr />
                <p>You successfully logged in!</p>
                <button onClick={e => handleProfileEvent(e)} className="btn btn-info">View Profile</button>
                <br />
                <br />
                <button onClick={e => handleLogoutEvent(e)} className="btn btn-info">Logout</button>
            </div>
        )
    }

    return (
        <div>
            {renderHome(user)}
            <br />
            <br />
            {renderProfile()}
        </div>
    );
};

export default Home;