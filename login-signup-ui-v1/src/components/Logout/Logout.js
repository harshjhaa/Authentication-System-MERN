import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Logout = ({ history }) => {

    useEffect(() => {
        localStorage.removeItem("authToken");

    }, [])

    return (
        <div>
            <Redirect to="/" />
        </div>
    );
};

export default Logout;