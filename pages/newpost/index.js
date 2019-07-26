import React, { Component } from 'react';
import Main from '../../layouts/main';

class NewPost extends Component {
    state = {
        user: ""
    }
    componentDidMount() {
        const user = localStorage.getItem('user');
        this.setState({user});
        if (user == "") {
            window.location = "/";
        } 
    }
    render () {
        return (
            <div className="NewPost">
                <Main>
                    <div className="container">
                        <h2>Writing time!</h2>
                        <h3 className="text-secondary">publishing as {this.state.user}</h3>
                    </div>
                </Main>
            </div>
        );
    }
}

export default NewPost;