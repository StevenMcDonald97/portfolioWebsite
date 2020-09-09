import React, { Component } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';  // Font Awesome
import defaultImage from 'App/admin/exampleImages/defaultImage.png';
import HomePageTemplate from 'App/admin/homePageTemplate';
import {TextPageTemplate } from 'App/admin/textPageTemplate';
import ListPageTemplate from 'App/admin/listPageTemplate';
import PortfolioTemplate from 'App/admin/portfolioTemplate';
import ErrorBoundary from 'App/errorBoundary';

export default class EditPages extends Component {
	constructor(props){
		super(props);
		this.state={
			pageData:{},
			pages:[],
			currentPageId:'',
			currentPageStyle:'none'

		};
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
		  this.setState({pages:response.data});
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
		
		axios.post('/remove/removePage', page, { 
		// receive two    parameter endpoint url ,form data
		}).then(res => { // then print response status
			console.log(`Removing page returned: ${res.statusText}`);
		}).catch(err => console.log(err));

	}

	selectPage(event){
		if (event.target.name==='home') {
 			this.setState({currentPageStyle:'home'});		
 		} else {
			this.setState({currentPageId:event.target.name},
			()=>{
				for(let i=0; i< this.state.pages.length; i++){
					if (this.state.pages[i]._id===this.state.currentPageId) this.setState({currentPageStyle:this.state.pages[i].type});
				}
			});
		}
	}


	returnToPageSelection(){
		this.setState({currentPageStyle:'none'});
	}
	

	render() {
		const PageList = this.state.pages.map((page) =>
			<div className='pageEditElement' key={page._id}> 
				<div className='pageEditTitle'>{page.title} </div>
				<button type='button' name={page._id} className='pageEditorButton' onClick={this.selectPage}>
					Edit
				</button>
				<button type='button' className='tooltip pageEditorButton' onClick={()=>this.removePage(page)}>
					<FaTrashAlt />
					<span className='tooltiptext'>
						Remove this Page
					</span>
				</button>
			</div>
		);

		if (this.state.currentPageStyle==='none'){
			return(
				<div>
					<h3 className='editingTitle'>Select a Page to Edit</h3>
					<ErrorBoundary>
						<div className='pageEditElement'> 
							<div className='pageEditTitle'>Home Page</div>
							<button type='button' name='home' className='pageEditorButton' onClick={this.selectPage}>
								Edit
							</button>
						</div>
						{ PageList }
					</ErrorBoundary>
				</div>
			);
		} else if (this.state.currentPageStyle==='home'){
			return( 
				<ErrorBoundary>
					<HomePageTemplate
					defaultImage={defaultImage} 
					backPage={this.returnToPageSelection} 
				/>
				</ErrorBoundary>
			);
		} else if (this.state.currentPageStyle==='text'){
			return( 
				<ErrorBoundary>

					<TextPageTemplate
					defaultImage={defaultImage} backPage={this.returnToPageSelection} 
					pageId={this.state.currentPageId}
					createPage={false}/>
				</ErrorBoundary>
			);
		} else if (this.state.currentPageStyle==='portfolio'){
			return( 
				<ErrorBoundary>
					<PortfolioTemplate 
					defaultImage={defaultImage} backPage={this.returnToPageSelection} 
					imageNames={[]}
					pageId={this.state.currentPageId}
					createPage={false}/>
				</ErrorBoundary>
					);
		} else if (this.state.currentPageStyle==='list'){
			return( 
				<ErrorBoundary>
					<ListPageTemplate pageType={this.state.pageData.type} backPage={this.returnToPageSelection} 
					pageId={this.state.currentPageId}
					createPage={false}/>
				</ErrorBoundary>
				);
		} else { 
			return(
				<div>
					<h3 className='editingTitle'>Select a Page to Edit</h3>
					<ErrorBoundary>
						{ PageList }
					</ErrorBoundary>
				</div>
			);
		} 
	}
}

