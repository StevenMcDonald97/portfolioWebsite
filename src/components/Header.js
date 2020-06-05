import React, { Component } from 'react';
import Portfolio from "./portfolioPage";
import HomePage from './homePage';
import ContentPage from './contentPage';

import aboutImg from "../profileimages/Profile-Pic.jpg";

export default class Header extends Component {

	createPage (type) {
		if (type==="portfolio"){
			this.props.setBodyState(openPortfolio());
		} else if (type==="home"){
			this.props.setBodyState(openHome());
		} else if (type==="about"){
			this.props.setBodyState(openAboutPage());
		}else {
			this.props.setBodyState(openHome());
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

  function openHome() {
	var homeText = `Steven is a nationally awarded plein air artist 
	living and working in the California Bay Area`;
	var HomeImage = "../testimages/home.jpg";
	var homeHeading = "Steven McDonald";
	var homeImageDescription="A Painting of Clouds over Marshland"
	
	  return <HomePage heading={homeHeading} homeText={homeText} imgDescription={homeImageDescription}></HomePage>;
  }

  function openText(textFields) {
	return <div></div>
  }


function openAboutPage(){
	console.log("here");
	var title="About Me";
	var imgDescription = "A picture of Steven"
	var imgTag = <img className="mainImage" src={aboutImg} alt={imgDescription} align="left"/>;
	var aboutText = "Steven is a professional artist working in the California Bay Area...";
	var resume = `Resume: \n
		Honorable mention 2018 \n
		First in show 2018 \n
		Second Place 2017
	`;
  
	return <ContentPage  title={title} image={imgTag} mainText={aboutText} secondaryText={resume}></ContentPage>
  
  }