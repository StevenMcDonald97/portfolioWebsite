import React, { Component } from 'react';
import Portfolio from "./portfolioPage";

export default class Header extends Component {

	createPage (type) {
		if (type=="portfolio"){
			this.props.setBodyState(openPortfolio());
		} else {
			this.props.setBodyState(<div></div>);
		}
	}

	render() {
		// extract the header links from props
		const header_links = this.props.links;
		// render a link in the navbar for each link in props
		const  create_links = header_links.map((link) =>  
			<li key={link.name} className="navbar-link"><a onClick={() => this.createPage(link.type)}>{link.name} </a></li>
		);
	
		return ( 
			<div >
				<div className="header">
					<h1 className="page-title">{this.props.name}</h1>
					<div className="navbar">
						<ul className="navbar-links">
							{ create_links }
						</ul>
					</div>
				</div>
			</div>
		);
	}
}


function openPortfolio(){
	return <Portfolio imgDirectory='../testimages/'></Portfolio>
  }
