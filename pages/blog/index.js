import React, { Component } from 'react';
import Main from '../../layouts/main';
import Post from '../../components/Post';
import axios from 'axios';

class Blog extends Component {
    state = {
        highlight: {mainImg: 'https://www.economist.com/sites/default/files/imagecache/1000-width/20190720_EUP502_0.jpg', title: 'Ursula von der Leyen is elected European Commission president', subtitle: 'Her narrow majority betokens less personal weakness than political fragmentation', writer: 'Idrak'},
        trending: [
            {mainImg: 'https://www.economist.com/sites/default/files/imagecache/1000-width/20190720_IRP001.jpg', title: 'Space law is inadequate for the boom in human activity there', subtitle: 'The law has big gaps. Who is liable for space debris? And is space mining even legal?', writer: 'Media'},
            {mainImg: 'https://www.economist.com/sites/default/files/imagecache/1000-width/20190720_WBP001.jpg', title: 'Taking sides in Hong Kong’s protests presents opportunities for firms', subtitle: 'But it also carries risks', writer: 'Media'},
            {mainImg: 'https://www.economist.com/sites/default/files/imagecache/1000-width/20190720_FND000.jpg', title: 'Should university be free?', subtitle: 'A debate is under way about the cost of higher education', writer: 'Free exchange'},
            {mainImg: 'https://www.economist.com/sites/default/files/imagecache/1000-width/20190720_STP503.jpg', title: 'Elon Musk wants to link brains directly to machines', subtitle: 'A device worn behind the ear might send your thoughts to your devices', writer: 'Brain machines'}
        ],
        popular: [
            {mainImg: 'https://www.economist.com/sites/default/files/imagecache/1000-width/20190720_blp902.jpg', title: 'America closes the doors to asylum-seekers from the South', subtitle: 'A new rule issued by the White House effectively prevents Latin Americans from claiming asylum at the southern border', writer: 'Media'},
            {mainImg: 'https://www.economist.com/sites/default/files/imagecache/1000-width/images/print-edition/20190713_CND001_0.jpg', title: 'China’s Silicon Valley is transforming China, but not yet the world', subtitle: 'A huge portion of China’s brain power is concentrated in Zhongguancun', writer: 'Home grown'},
            {mainImg: 'https://www.economist.com/sites/default/files/imagecache/1000-width/20190720_WOC985_0.png', title: 'Calls to rein in the tech titans are getting louder', subtitle: 'The big five technology firms have spent billions buying rivals in recent years', writer: 'Media'},
            {mainImg: 'https://www.economist.com/sites/default/files/imagecache/1000-width/d-a9pojw4aatofi_2_0_0.jpg', title: 'Unreliable evidence—a forensic look at identification', subtitle: 'Our transatlantic podcast collaboration examines clues to the future lurking in the past', writer: 'Machines'},
            {mainImg: 'https://www.economist.com/sites/default/files/imagecache/1000-width/20190720_BLP511.jpg', title: 'Novak Djokovic wins the most thrilling men’s tennis match ever', subtitle: 'His epic victory over Roger Federer at Wimbledon had more crucial points than famous matches of yesteryear', writer: 'Boringnews.com'},
            {mainImg: 'https://www.economist.com/sites/default/files/imagecache/1000-width/20190720_BKP505.jpg', title: 'The industry and poetry of David Smith', subtitle: 'In the mid-20th century the American artist charted a new direction for sculpture', writer: 'Poetry?'}   
        ]
    }
    componentDidMount() {
        const postContainers = document.querySelectorAll('.Post .post-container');
        const postLoaders = document.querySelectorAll('.Post .loader');
        axios.get("https://nomical-api.herokuapp.com/posts/11")
        .then(doc => {
            var highlight = {};
            var trending = [];
            var popular = [];
            highlight = doc.data[0];
            for (let i=1;i<5;i++) {
                trending.push(doc.data[i]);
            }
            for (let i=5;i<11;i++) {
                popular.push(doc.data[i]);
            }
            console.log(popular);
            this.setState({highlight, trending, popular});

            for (let i=0;i<postLoaders.length;i++) {
                postLoaders[i].style.display = 'none';
                postContainers[i].style.display = 'block';
            }   
        });

    }
    render () {
        return (
            <div className="Blog">
                <Main>
                    <div className="row">
                        <div className="col-sm-7">
                            <Post id={this.state.highlight._id} date={this.state.highlight.dateCreated} mainImg={this.state.highlight.mainImg} title={this.state.highlight.title} subtitle={this.state.highlight.subtitle} writer={this.state.highlight.writer}/>
                        </div>
                        <div className="col-sm-5">
                            <h4>Trending</h4>
                            <div className="PostsHolder">
                                {this.state.trending.map((post, index) => {
                                    return <Post id={post._id} key={index} date={post.dateCreated} writer={post.writer} mainImg={post.mainImg} title={post.title} subtitle={post.subtitle}/>
                                })}
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="row row2">
                        <div className="col-sm-4">
                            <Post id={this.state.popular[0]._id} mainImg={this.state.popular[0].mainImg} title={this.state.popular[0].title} subtitle={this.state.popular[0].subtitle} writer={this.state.popular[0].writer}/>
                        </div>
                        <div className="col-sm-4">
                            <Post id={this.state.popular[1]._id} mainImg={this.state.popular[1].mainImg} title={this.state.popular[1].title} subtitle={this.state.popular[1].subtitle} writer={this.state.popular[1].writer}/>
                        </div>
                        <div className="col-sm-4">
                            <Post id={this.state.popular[2]._id} mainImg={this.state.popular[2].mainImg} title={this.state.popular[2].title} subtitle={this.state.popular[2].subtitle} writer={this.state.popular[2].writer}/>
                        </div>
                    </div>
                    <div className="row row2">
                        <div className="col-sm-4">
                            <Post id={this.state.popular[3]._id} mainImg={this.state.popular[3].mainImg} title={this.state.popular[3].title} subtitle={this.state.popular[3].subtitle} writer={this.state.popular[3].writer}/>
                        </div>
                        <div className="col-sm-4">
                            <Post id={this.state.popular[4]._id} mainImg={this.state.popular[4].mainImg} title={this.state.popular[4].title} subtitle={this.state.popular[4].subtitle} writer={this.state.popular[4].writer}/>
                        </div>
                        <div className="col-sm-4">
                            <Post id={this.state.popular[5]._id} mainImg={this.state.popular[5].mainImg} title={this.state.popular[5].title} subtitle={this.state.popular[5].subtitle} writer={this.state.popular[5].writer}/>
                        </div>
                    </div>
                </Main>
            </div>   
        );
    }
}

export default Blog;