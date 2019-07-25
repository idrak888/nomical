import React, { Component } from 'react';
import Main from '../../layouts/main';
import * as firebase from 'firebase';

class Login extends Component {
    login = e => {
        e.preventDefault();

        const email = document.querySelector('#email');
        const password = document.querySelector('#password');
        const err = document.querySelector('.err');
        const btn = document.querySelector('.btn-login');

        btn.innerHTML = 'Logging in...';
        btn.disabled = true;

        if (email.value.length < 1 || password.value.length < 1) {
            err.innerHTML = 'Please fill up all inputs';
            btn.disabled = false;
            btn.innerHTML = 'Login';
            setTimeout(() => {
                err.innerHTML = '';
            }, 2000);
        } else {
            firebase.auth().signInWithEmailAndPassword(email.value, password.value)
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                
                btn.innerHTML = 'Login';
                btn.disabled = false;

                err.innerHTML = errorMessage;
                setTimeout(() => {
                    err.innerHTML = '';
                }, 2000);
            });
        }
    }
    render() {
        return (
            <Main>
                <div className="Login">
                    <h2>Login with Nomical</h2>
                    <p>Login with your <strong>Nomical</strong> account.<br/> New to Nomical? <a href="/signup">Sign up</a> now.</p>
                    <div className="container">
                        <form onSubmit={this.login}>
                            <input id="email" type="text" placeholder="Email"/>
                            <br/>
                            <input id="password" type="password" placeholder="Password"/>
                            <br/>
                            <button onClick={this.login} className="btn btn-login btn-primary">Login</button>
                        </form>
                        <br/>
                        <span className="text-danger err"></span>
                    </div>
                </div>
            </Main>
        );
    }
}

export default Login;