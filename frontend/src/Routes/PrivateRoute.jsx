import React from 'react'
import { useSelector } from "react-redux";
import { Navigate, useLocation } from 'react-router-dom';
import { getItemLS } from '../localStorage/localStorage';


const PrivateRoute = ({children}) => {

    //Redux Store
    const isAuth = getItemLS("auth")?.isAuth || false;
    
    if(!isAuth){
        return <Navigate to={"/login"} />
    }

  return children;
}

export default PrivateRoute
