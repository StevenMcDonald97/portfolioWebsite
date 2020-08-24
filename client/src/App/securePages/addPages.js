import React, { Component, useState } from 'react';
import axios from 'axios';
import {FaArrowLeft} from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";  // Font Awesome
import defaultImage from "App/securePages/exampleImages/default-image.png";
import { AboutPageTemplate, OtherPageTemplate } from 'App/securePages/textPageTemplate';
import ListPageTemplate from 'App/securePages/listPageTemplate';
import PortfolioTemplate from 'App/securePages/portfolioTemplate'

// const d = new Date();
const images = require.context('App/upload', true);

export default class AddPages extends Component {
	constructor(props){
		super(props);
		this.state={
			pageType:"none",
			pageData:{}
		}
		this.changePageType=this.changePageType.bind(this);
		this.setPageData=this.setPageData.bind(this);
		this.returnToPageSelection=this.returnToPageSelection.bind(this);

	}

	changePageType(event){
		this.setState({pageType:event.target.name});
	}

	setPageData(data){
		this.setState({pageData:data})
	}

	returnToPageSelection(event){
		this.setState({pageType:"none"});
	}
	

	render() {
		const PageContents = () => {
			if (this.state.pageType==="none"){
				return(<ChoosePage changePageType={this.changePageType}/>)
			} else if (this.state.pageType==="about"){
				return( <AboutPageTemplate 
					defaultImage={defaultImage} 
					backPage={this.returnToPageSelection} 
					createPage={true}/>)
			} else if (this.state.pageType==="portfolio"){
				return( <PortfolioTemplate 
					defaultImage={defaultImage} 
					backPage={this.returnToPageSelection} 
					createPage={true}/>)
			} else if (this.state.pageType==="gallery"){
				return( <ListPageTemplate pageType="Galleries"  
					backPage={this.returnToPageSelection} 
					createPage={true}/>)
			} else if (this.state.pageType==="event"){
				return( <ListPageTemplate pageType="Events"
					backPage={this.returnToPageSelection} 
					createPage={true}/>)
			} else if (this.state.pageType==="workshop"){
				return( <ListPageTemplate pageType="Workshops"
					backPage={this.returnToPageSelection} 
					createPage={true}/>)
			} else {
				return( <OtherPageTemplate backPage={this.returnToPageSelection}/>)
			}
		}

		return(
			<div>
		      { PageContents() }
		    </div>
		);
	}
}

const ChoosePage = (props) => {
	return (
		<div className="addPageMain pageEditor">
			<h3 className="editingTitle">Select what type of page you want to add</h3>
			<button type="button" className="button" className="pageEditButton" name="about" 
				onClick={props.changePageType}>About Page</button>
			<button type="button" className="button" className="pageEditButton" name="portfolio" 
				onClick={props.changePageType}>Portfolio Page</button>
			<button type="button" className="button" className="pageEditButton" name="gallery" 
				onClick={props.changePageType}>Gallery Page</button>
			<button type="button" className="button" className="pageEditButton" name="event" 
				onClick={props.changePageType}>Events Page</button>
			<button type="button" className="button" className="pageEditButton" name="workshop" 
				onClick={props.changePageType}>Workshop Page</button>
			<button type="button" className="button" className="pageEditButton" name="other" 
				onClick={props.changePageType}>Other Page</button>
		</div>
	)
}

const BackButton = (props) => {
	// props.clearAllData
	return(
		<div className="backLink" onClick={props.backPage}><FaArrowLeft /> Back</div>
	)
}

