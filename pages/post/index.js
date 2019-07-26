import { useRouter } from 'next/router';
import Layout from '../../layouts/main';
import axios from 'axios';
import React, { Component } from 'react';

class Post extends Component {
    state = {
        post: {},
        content: []
    }
    componentDidMount() {
        const loader = document.querySelector('.loader');
        setTimeout(() => {
            var id = this.props.url.query.id;
            axios.get(`https://nomical-api.herokuapp.com/post/${id}`)
            .then(doc => {
                this.setState({
                    post:doc.data[0],
                    content:this.formatString(doc.data[0].content, 3)
                });
                loader.style.display = 'none';
            });
        }, 500);
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
            <Layout>
                <div className="PostPage">
                    <div className="container">
                        <p className="text-primary">Written by: {this.state.post.writer}</p>
                        <h2>{this.state.post.title}</h2>
                        <p className="text-secondary">{this.state.post.subtitle}</p>
                        <div className="row">
                            <div className="col-sm-6">
                                <img src={this.state.post.mainImg} width="100%"/>
                                <br/>
                                <span className="text-danger">{this.state.post.dateCreated}</span>
                                <p className="content first">{this.state.content[0]}</p>
                            </div>
                            <div className="col-sm-6">
                                <p className="content">{this.state.content[1]}</p>
                                <p className="content">{this.state.content[2]}</p>
                            </div>
                        </div>
                        <img className="loader" src="https://www.drupal.org/files/issues/throbber_12.gif"/>
                    </div>
                </div>
            </Layout>
        );
    }
};

export default Post;