import React from "react";
import PropTypes from "prop-types";

import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import "../index.css";

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
						<div className="nav-item dropdown">
							<a className="dropdown-toggle text-white" href="#" id="dropdownlink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Create</a>
							<div className="dropdown-menu" aria-labelledby="dropdownlink">
								<a href="/create/main" className="nav-link text-dark">Main Topic</a>
								<a href="/create/sub" className="nav-link text-dark">Sub Topic</a>
								<a href="/create/topic" className="nav-link text-dark">Topic</a>
							</div>
						</div>
						<li className="nav-item text-white"><p className="nav-link"><span className="branco">|</span></p></li>
						<li className="nav-item">
							<a href="/about" className="nav-link">About</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

Header.defaultProps = {
	branding: "Learning Tracker"
};

Header.propTypes = {
	branding: PropTypes.string.isRequired,
};
export default Header;