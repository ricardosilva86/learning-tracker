import React from 'react'
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '../index.css';

const Header = props => {
    const { branding } = props;
    
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-3 py-3">
        <div className="container">
            <a href="/" className="navbar-brand">{branding}</a>
            <div>
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a href="/" className="nav-link">Home</a>
                    </li>
                    <li className="nav-item text-white"><p className="nav-link"><span className="branco">|</span></p></li>
                    <li className="nav-item">
                        <a href="/" className="nav-link">About</a>
                    </li>
                </ul>
            </div>
        </div>
      </nav>
    )
}

Header.defaultProps = {
    branding: "Learning Tracker"
}

Header.PropTypes = {
    branding: PropTypes.string.isRequired
}
export default Header;