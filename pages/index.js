import React, { Component } from 'react';
import Main from '../layouts/main';
import Post from '../components/Post';
import axios from 'axios';
import { initGA, logPageView } from '../utils/analytics';

class Home extends Component {
    state = {
        posts: [
            {date: '', writer: 'Idrak', mainImg: 'https://www.economist.com/sites/default/files/imagecache/1000-width/images/articles/20190720_fnp501.jpg', title: 'China’s growth is the slowest in nearly three decades: get used to it ', subtitle: 'The trade war with America hurts, but the government is wary of stimulus'},
            {date: '', writer: 'Idrak', mainImg: 'https://www.economist.com/sites/default/files/imagecache/1000-width/20190706_BLP513.jpg', title:'What is libra? ', subtitle: 'Facebook’s digital currency could become one of the world’s biggest financial entities'},
            {date: '', writer: 'Idrak', mainImg: 'https://www.economist.com/sites/default/files/imagecache/1000-width/20190713_blp902.jpg', title: 'Argentina’s main presidential candidates are ignoring the biggest problems', subtitle:'Mauricio Macri doesn’t want to talk about the economy. Alberto Fernández wants to keep the focus off his running mate'}
        ],
        highlight : {}
    }
    componentDidMount() {
        if (!window.GA_INITIALIZED) {
            initGA();
            window.GA_INITIALIZED = true;
        }
        logPageView();

        const postContainers = document.querySelectorAll('.Post .post-container');
        const postLoaders = document.querySelectorAll('.Post .loader');

        axios.get('https://nomical-api.herokuapp.com/posts/4')
        .then(doc => {
            var trending = [];
            var highlight = doc.data[0];
            for (let i=1;i<4;i++) {
                trending.push(doc.data[i]);
            }
            this.setState({posts:trending, highlight});
            
            for (let i=0;i<postLoaders.length;i++) {
                postLoaders[i].style.display = 'none';
                postContainers[i].style.display = 'block';
            }   
        }).catch(e => {
            console.log(e);
        });
    }
    render () {
        return (
            <div className="Home">
                <Main>
                    <div className="row">
                        <div className="col-sm-7">
                            <Post className="highlight" id={this.state.highlight._id} date={this.state.highlight.dateCreated} mainImg={this.state.highlight.mainImg} title={this.state.highlight.title} subtitle={this.state.highlight.subtitle} writer={this.state.highlight.writer}/>
                            
                            <hr/> 
                            <h2>Welcoming Economists</h2>
                            <p><strong>Nomical</strong> is the globalized blog for economics enthusiasts, offering daily news, stock market highlights, academical insights, politics, macroeconomics, finance and many more.</p>
                            <p>Start by creating an account and joining the Nomical writers club. Contribute by sharing your invaluable knowledge with us. </p>
                            <br/>
                            <a href="/signup"><button className="btn btn-outline-primary">Join Nomical</button></a>
                        </div>
                        <div className="col-sm-5">
                            <h4>Trending</h4>
                            <div className="PostsHolder">
                                {this.state.posts.map((post, index) => {
                                    return <Post key={index} id={post._id} date={post.dateCreated} writer={post.writer} mainImg={post.mainImg} title={post.title} subtitle={post.subtitle}/>
                                })}
                            </div>
                        </div>
                    </div>
                </Main>
            </div>
        );
    }
}

export default Home;