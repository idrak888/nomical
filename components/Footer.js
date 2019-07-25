import React from 'react';

const Footer = props => {
    return (
        <div className="Footer">
            <nav className="navbar sticky-bottom navbar-expand-lg">
                <div className="row">
                    <div className="col-m-4">
                        <h2>N</h2>
                    </div>
                    <div className="col-m-4">
                        <ul>
                            <li><a href="/signup">Join nomical</a></li>
                            <li><a href="/">Newsletters</a></li>
                            <li><a href="/">Contact</a></li>
                            <li><a href="/">Developers</a></li>
                        </ul>
                    </div>
                    <div className="col-m-4">
                        <div className="social">
                            <img src="/static/facebook.png" width="55"/> <img src="/static/instagram.png" width="55"/> <img src="/static/pinterest.png" width="55"/>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Footer;