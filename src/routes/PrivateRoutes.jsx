import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({children}) => {
    
    const {user, loading} = useAuth();
    const location = useLocation();
    // console.log(location);

    // from where the user was coming from ? 
    // const from = location.pathname;
    
    // console.log(from);


    if(loading) {
        return  <span className="loading loading-spinner loading-xl"></span>

    }

    if(!user) {
        return <Navigate state={{from: location.pathname}} to="/login" ></Navigate>
    }
    
    return children;
};

export default PrivateRoutes;