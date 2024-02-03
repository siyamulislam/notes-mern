import { Button, Center, Text } from '@chakra-ui/react';
import React from 'react'
import {GoogleLogin} from "react-google-login"
import { FcGoogle } from 'react-icons/fc';

const GoogleAuth = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

    const responseGoogle = (response) => {
        console.log(response);
        
      };


  return (
    <GoogleLogin
        clientId= {clientId}
        buttonText='Sign in with Google'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
    />
  )
}

export default GoogleAuth
