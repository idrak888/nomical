import React from 'react';
import * as firebase from 'firebase';

const Header = props => {
    const logout = e => {
        e.preventDefault();

        firebase.auth().signOut().then(() => {
            window.location.reload();
        });
    }
    return (
        <div className="Header">
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark">
                <div className="navbar-left">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <img src="/static/bars.png" width="25"/>
                    </button>
                    <a class="navbar-brand" href="/">Nomical</a>
                </div>
                
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/blog">Blog</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/signup">Join Nomical</a>
                    </li>
                    </ul>
                    <form class="form-inline my-2 my-lg-0">
                        <img className="searchIcon" src="/static/search.png"/> <input class="form-control mr-sm-2" type="search" placeholder="Search posts or writers" aria-label="Search"/>
                    </form>
                    <span className="navbar-text">
                        <a className="nav-link header-login" href="/login">Login</a>
                        <button className="btn btn-outline-danger header-logout" onClick={logout}>Log out</button>
                    </span>
                </div>
            </nav>
        </div>
    );
}

export default Header;
