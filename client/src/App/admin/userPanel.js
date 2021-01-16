import React, { Component } from 'react';
import {FaAngleDown} from 'react-icons/fa';
import { authenticationService } from 'src/App/admin/authentication/authenticationService';
import {
  Link,
} from 'react-router-dom';

const layoutJson = require('src/App/layout.json');

class UserPanel extends Component{
    constructor(props) {
        super(props);
        this.logout=this.logout.bind(this);
    }


    logout(){
    	console.log("Logout");
    	authenticationService.logout();
    }

	render(){
		return(
			<div className='userpanel pageEditor'>
					<div className={`user-navbar ${layoutJson.menuStyle}`}>
						<ul className='user-navbar-links'>
							<li key='editInfo' className='user-navbar-link'><Link to="/editProfile" className='user-navbar-link'>My Profile Info</Link></li>
							<li key='editImages' className='user-navbar-link dropdown-link'>
								<div className='user-navbar-link dropbtn'>Images <FaAngleDown /></div>
								<div className='dropdown-content'>
									<Link className="user-dropwdown-link" to='/uploadImages'>Upload Images</Link>
									<Link className="user-dropwdown-link" to='/editImages'>Edit/Remove Images</Link>
								</div>
							</li>
							<li key='editPages' className='user-navbar-link dropdown-link'>
								<div className='user-navbar-link dropbtn'>Pages <FaAngleDown /></div>
								<div className='dropdown-content'>
									<Link className="user-dropwdown-link" to='/addPages'>Create New Page(s)</Link>
									<Link className="user-dropwdown-link" to='/editPages'>Edit/Remove Pages</Link>
								</div>
							</li>
							<li key='editLayout' className='user-navbar-link'>
								<Link to='/editLayout' className='user-navbar-link'>Edit Layout</Link>
							</li>	
							<li key='editFooter' className='user-navbar-link'>
								<Link to='/editFooter' className='user-navbar-link'>Edit Footer</Link>
							</li>	
							<li key='editStyle' className='user-navbar-link'>
								<Link to='/styleEditor' className='user-navbar-link'>Edit Style</Link>
							</li>
							<li key='logout' className='user-navbar-link'>
								<div onClick={this.logout}> Logout </div>
							</li>							
						</ul>
					</div>
			
				<h2 className="pageHeader">Welcome! You can edit your site using the options above</h2>
			</div>
		);
	}
}

export default UserPanel;

