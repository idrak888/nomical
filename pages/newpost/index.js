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
                        <br/>
                        <hr/>
                        <br/>
                        <form>
                            <input id="title" type="text" placeholder="Title"/>
                            <input id="subtitle" type="text" placeholder="Subtitle"/>
                            <br/>
                            Upload a thumbnail: 
                            <input id="file" type="file"/>
                            <textarea rows="12" cols="50" id="content" placeholder="Body (min. 30 characters)" scalable="no"></textarea>
                            <span className="text-secondary">Complete post ></span>
                        </form>
                    </div>
                </Main>
            </div>
        );
    }
}

export default NewPost;