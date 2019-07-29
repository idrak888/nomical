import React, { Component } from 'react';
import Main from '../../layouts/main';

class NewPost extends Component {
    state = {
        user: "",
        post: {writer: "", title: "", subtitle: "", mainImg: "", content: "", date: "", postNumber: 0},
        content: []
    }
    componentDidMount() {
        const user = localStorage.getItem('user');
        this.setState({user});
        if (user == "") {
            window.location = "/";
        } 
    }
    loadPreview = (e) => {
        e.preventDefault();
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const title = document.getElementById('title').value;
        const subtitle = document.getElementById('subtitle').value;
        const content = document.getElementById('content').value;
        const d = new Date();
        const date = d.getDate() + " " + months[d.getMonth()];
        const writer = this.state.user;

        var post = {writer, date, title, subtitle, content, postNumber: 8, mainImg: "https://firebasestorage.googleapis.com/v0/b/nomical.appspot.com/o/postImages%2F1.jpg?alt=media&token=50478ab6-b3f3-4820-bff7-960f02f1ee78"};
        this.setState({post, content:this.formatString(content, 3)});

        const preview = document.querySelector('.preview');
        preview.style.display = 'block';
        preview.scrollIntoView();
    }
    formatString = (string, numlines) => {
        var length = string.length;
        var paraLength = Math.round((string.length)/numlines);
        var paragraphs = [];
        for (var i=0; i<numlines; i++) {
            var marker = paraLength;
            //if the marker is right after a space, move marker back one character
            if (string.charAt(marker-1) == " ") {
                marker--; 
            }
            //move marker to end of a word if it's in the middle
            while(string.charAt(marker) != " " && string.charAt(marker) != "") {
                marker++;
            }
            var nextPara = string.substring(0, marker)
            paragraphs.push(nextPara)
            string = string.substring((nextPara.length+1),string.length)
        }
        return paragraphs
    }
    render () {
        return (
            <div className="NewPost">
                <Main>
                    <div className="container">
                        <div className="head">
                            <h2>Writing time!</h2>
                            <h3>publishing as {this.state.user}</h3>
                        </div>
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
                            <br/>
                            <button onClick={this.loadPreview} className="btn btn-dark">Preview</button>
                        </form>
                    </div>
                    <br/>
                    <div className="container preview">
                        <div className="head">
                            <h2>Preview</h2>
                        </div>
                        <br/>
                        <hr/>
                        <div className="previewContent">
                            <a href="#">Written by: {this.state.post.writer}</a>
                            <h1>{this.state.post.title}</h1>
                            <p className="text-secondary">{this.state.post.subtitle}</p>
                            <div className="row">
                                <div className="col-sm-6">
                                    <img className="skeleton" src={this.state.post.mainImg} width="100%"/>
                                    <br/>
                                    <span className="text-danger">{this.state.post.date}</span>
                                    <p className="content first">{this.state.content[0]}</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="content">{this.state.content[1]}</p>
                                    <p className="content">{this.state.content[2]}</p>
                                </div>
                            </div>
                            
                        </div>
                        <br/>
                        <button className="btn btn-dark">Post!</button>
                    </div>
                </Main>
            </div>
        );
    }
}

export default NewPost;