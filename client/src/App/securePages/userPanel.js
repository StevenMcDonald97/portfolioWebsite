import React, { Component } from 'react';
import {FaAngleDown} from "react-icons/fa"
import {
  Link,
} from "react-router-dom";


export default class UserPanel extends Component {

	render() {
		return(
			<div className="userpanel">
					<div className="navbar">
						<ul className="user-navbar-links">
							<li key="editInfo" className="user-navbar-link"><div className="user-navbar-link">Personal Info</div></li>
							<li key="editImages" className="user-navbar-link dropdown">
								<div className="user-navbar-link dropbtn">Images <FaAngleDown /></div>
								<div class="dropdown-content">
									<Link to="/uploadImages">Upload Images</Link>
									<Link to="/editImages">Edit/Remove Images</Link>
								</div>
							</li>
							<li key="editPages" className="user-navbar-link dropdown">
								<div className="user-navbar-link dropbtn">Pages</div>
								<div class="dropdown-content">
									<Link to="/addPages">Create New Page(s)</Link>
									<Link to="/editPages">Edit/Remove Pages</Link>
								</div>
							</li>
							<li key="editPortfolios" className="user-navbar-link dropdown">
								<div className="user-navbar-link dropbtn">Portfolios</div>
								<div class="dropdown-content">
									<Link to="/addPortfolios">Create Portfolio</Link>
									<Link to="/editPortfolios">Edit/Remove</Link>
								</div>							
							</li>
							<li key="editStyle" className="user-navbar-link">
								<Link to="/styleEditor" className="user-navbar-link">Edit Style</Link>
							</li>

						</ul>
					</div>
			
				<h2>Welcome! You can edit your site using the options above</h2>
			</div>
		)
	}

}