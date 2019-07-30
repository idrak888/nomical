import React, { Component } from 'react';
import Main from '../../layouts/main';
import * as firebase from 'firebase';
import axios from 'axios';

class NewPost extends Component {
    state = {
        user: "",
        post: {writer: "", title: "", subtitle: "", mainImg: "", content: "", date: "", postNumber: 0},
        content: [],
        mainImg: "",
        postcount: 0
    }
    componentDidMount() {
        const user = localStorage.getItem('user');
        this.setState({user});
        if (user == "") {
            window.location = "/";
        } 
        axios.get("https://nomical-api.herokuapp.com/posts/1")
        .then(doc => {
            this.setState({postcount:doc.data[0].postNumber+1});
        });
    }
    loadPreview = (e) => {
        e.preventDefault();
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const title = document.getElementById('title').value;
        const subtitle = document.getElementById('subtitle').value;
        const content = document.getElementById('content');
        const d = new Date();
        const date = d.getDate() + " " + months[d.getMonth()];
        const writer = this.state.user;

        var post = {writer, date, title, subtitle, content:content.value, postNumber: this.state.postcount, mainImg: "https://firebasestorage.googleapis.com/v0/b/nomical.appspot.com/o/postImages%2F8.jpg?alt=media&token=d69e0799-4d63-4116-9f6d-84312e519410"};
        this.setState({post, content:this.formatString(content.value, 3)});

        var inputs = document.querySelectorAll('.container input');
        var emptyInputs = false;
        for (let i=0;i<inputs.length;i++) {
            if (inputs[i].value == "") {
                inputs[i].style.borderColor = 'red';
                emptyInputs = true;
            } else {
                inputs[i].style.borderColor = 'rgb(165, 165, 165)';
            }
        }

        if (!emptyInputs) {
            if (content.value == "") {
                content.style.borderColor = 'red';
            } else {
                content.style.borderColor = 'rgb(165, 165, 165)';
                const preview = document.querySelector('.preview');
                preview.style.display = 'block';
                preview.scrollIntoView();
                console.log(this.state.post);
            }
        }
    }
    publish = e => {
        e.preventDefault();
        e.target.disabled = true;

        axios.post('https://nomical-api.herokuapp.com/posts/', this.state.post).then(doc => {
            console.log(doc.data);
            document.querySelector('.finished').style.display = 'block';
            document.querySelector('.finished .url').attributes.href = `https://nomical.herokuapp.com/post?id=${doc.data._id}`;
            document.querySelector('.finished .url').innerHTML = `https://nomical.herokuapp.com/post?id=${doc.data._id}`;

        }).catch((error) => {
            console.log(error);
        });
    }
    getImage = (file) => {
        let storageRef = firebase.storage().ref();
        var file = document.querySelector('#file').files;
        var mainImg = "";
        var metadata = {
            contentType: 'image/jpeg'
        };

        var uploadTask = storageRef.child(`postImages/${this.state.postcount}.jpg`).put(file[0], metadata);

        uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
            }
            }, function(error) {
            // Handle unsuccessful uploads
            }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                mainImg = downloadURL;
            });
        });
        this.setState({mainImg});
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
                            <input onChange={this.getImage} id="file" type="file"/>
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
                        <button onClick={this.publish} className="btn btn-dark">Publish</button>
                    </div>
                    <div className="container finished">
                        <p>Post published!</p>
                        <p>URL: <a className="url"></a></p>
                    </div>
                </Main>
            </div>
        );
    }
}

export default NewPost;