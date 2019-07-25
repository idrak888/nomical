import React from 'react';

const Post = props => {
    return (
        <div className="Post">
            <img className="loader" src="https://www.drupal.org/files/issues/throbber_12.gif"/>
            <div className="post-container">
                <span className="text-primary">{props.writer}</span> <span className="date">{props.date}</span>
                <br/>
                <img src={props.mainImg} width="100%"/>
                <a href="#"><h3>{props.title}</h3></a>
                <p className="text-secondary">{props.subtitle}</p>
            </div>
        </div>
    );
}

export default Post;