import React, { Component, useState } from 'react';
import axios from 'axios';
import {FaArrowLeft} from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";  // Font Awesome
import defaultImage from "App/securePages/exampleImages/default-image.png";
import {TextPageTemplate } from 'App/securePages/textPageTemplate';
import ListPageTemplate from 'App/securePages/listPageTemplate';
import PortfolioTemplate from 'App/securePages/portfolioTemplate'

// const d = new Date();
const images = require.context('App/upload', true);

export default class EditPages extends Component {
	constructor(props){
		super(props);
		this.state={
			pageData:{},
			pages:[],
			currentPageId:"",
			currentPageStyle:"none"

		}
		this.removePage=this.removePage.bind(this);
		this.getPageList=this.getPageList.bind(this);
		this.selectPage=this.selectPage.bind(this);
		this.returnToPageSelection=this.returnToPageSelection.bind(this);

	}

	componentDidMount() {
		this.getPageList();
	}

	getPageList = () =>{
		axios.get('/api/getPageInfo').then((response) => {
		  this.setState({pages:response.data})
		});
	}

	removePage(page){
		let pageValues =this.state.pages;

		for (let i=0; i<pageValues.length; i++){
			if (pageValues[i]._id===page._id){
				pageValues.splice(i, 1);
			}
		}
		this.setState({pages:pageValues});
		
		axios.post("/remove/removePage", page, { 
		      // receive two    parameter endpoint url ,form data
		}).then(res => { // then print response status
		    console.log(`Removing page returned: ${res.statusText}`)
		}).catch(err => console.log(err));

	}

	selectPage(event){

		this.setState({currentPageId:event.target.name},
			()=>{
				for(let i=0; i< this.state.pages.length; i++){
					if (this.state.pages[i]._id===this.state.currentPageId) this.setState({currentPageStyle:this.state.pages[i].type});
				}
			});
	}


	returnToPageSelection(event){
		this.setState({currentPageStyle:"none"});
	}
	

	render() {
		const PageList = this.state.pages.map((page) =>
			<div className="pageListElement" key={page._id}> 
				{page.title} 
				<button type="button" name={page._id} className="pageEditorButton" onClick={this.selectPage}>
					Edit
				</button>
				<button type="button"className="tooltip btn" onClick={()=>this.removePage(page)}>
					<FaTrashAlt />
					<span className="tooltiptext">
						Remove this Image
					</span>
				</button>
			</div>
		)

		if (this.state.currentPageStyle==="none"){
			return(
				<div>
					<h3 className="editingTitle">Select a Page to Edit</h3>
					{ PageList }
				</div>
			)
		} else if (this.state.currentPageStyle==="text"){
			return( <TextPageTemplate
				defaultImage={defaultImage} backPage={this.returnToPageSelection} 
				pageId={this.state.currentPageId}
				createPage={false}/>)
		} else if (this.state.currentPageStyle==="portfolio"){
			return( <PortfolioTemplate 
				defaultImage={defaultImage} backPage={this.returnToPageSelection} 
				imageNames={[]}
				pageId={this.state.currentPageId}
				createPage={false}/>)
		} else if (this.state.currentPageStyle==="list"){
			return( <ListPageTemplate backPage={this.returnToPageSelection} 
				pageId={this.state.currentPageId}
				createPage={false}/>)
		} else { 
			return(
				<div>
					<h3 className="editingTitle">Select a Page to Edit</h3>
					{ PageList }
				</div>
			)
		} 
	}
}

