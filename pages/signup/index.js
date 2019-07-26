import React, { Component } from 'react';
import Main from '../../layouts/main';
import * as firebase from 'firebase';

class Signup extends Component {
    signup = e => {
        e.preventDefault();

        //get input fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const password2 = document.getElementById('password2');

        //load, validate and verify
        const err = document.querySelector('.err');
        const btn = document.querySelector('.btn-login');

        if (password.value !== password2.value) {
            err.innerHTML = "Passwords don't match";
            setTimeout(() => {
                err.innerHTML = '';
            }, 2000);
        }
        else if (name.value.length < 1) {
            err.innerHTML = "Please fill all inputs";
            setTimeout(() => {
                err.innerHTML = '';
            }, 2000);
        } else {
            btn.innerHTML = 'Signing up...';
            btn.disabled = true;
            
            //create user with firebase
            firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
            .then((user) => {
                btn.innerHTML = 'Sign up';
                btn.disabled = false;
                user.updateProfile({
                    displayName: name.value
                }).then(() => {
                    console.log(user);
                    window.location = "/";
                }, (error) => {
                    
                });
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                err.innerHTML = errorMessage;

                btn.innerHTML = 'Sign up';
                btn.disabled = false;

                setTimeout(() => {
                    err.innerHTML = '';
                }, 2000);
            });
        }
    }
    render () {
        return (
            <Main>
                <div className="Signup">
                    <h2>Join Nomical</h2>
                    <p>Welcome to <strong>Nomical</strong>, fill up some information and get started!<br/>Already have an account? <a href="/login">Login</a>.</p>
                    <div className="container">
                        <form onSubmit={this.signup}>
                            <input id="name" type="text" placeholder="Your name"/>
                            <br/>
                            <input id="email" type="text" placeholder="Email"/>
                            <br/>
                            <hr/>
                            <input id="password" type="password" placeholder="New password"/>
                            <br/>
                            <input id="password2" type="password" placeholder="Confirm password"/>
                            <br/>
                            <button onClick={this.signup} className="btn btn-login btn-primary">Sign up</button>
                        </form>
                        <br/>
                        <span className="text-danger err"></span>
                    </div>
                </div>
            </Main>
        );
    }
}

export default Signup;