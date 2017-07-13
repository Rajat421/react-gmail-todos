/**
 * Created by Counter on 7/13/2017.
 */
import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios'
import './login.css'
class Login extends Component {
    constructor(props){
        super(props)
        this.responseGoogle=this.responseGoogle.bind(this)
    }
    responseGoogle(res){
        console.log(res)
        localStorage.setItem("token",JSON.stringify(res.tokenObj.token_type+" "+res.tokenObj.access_token))
        localStorage.setItem("user",JSON.stringify(res.profileObj))
        this.props.history.push('/todos')
    }
    render() {
        let responseGoogle=this.responseGoogle
        return (

                <div className="loginContainer">
                    <div className="loginContainer_header">
                        <h4>Login</h4>
                    </div>
                    <div className="loginContainer_body">
                        <form  >
                            <GoogleLogin
                                clientId="425641861034-93aa66pijlsdaf7d8dp3k4nds4k1lmb7.apps.googleusercontent.com"
                                responseType="token"
                                scope="https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/calendar openid email profile"
                                buttonText="Login With Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                fetchBasicProfile={true}

                            />
                        </form>
                    </div>
                </div>


        );
    }
}

export default Login;
