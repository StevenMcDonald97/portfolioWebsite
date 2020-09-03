import React, { Component } from 'react';
import {FaArrowLeft} from 'react-icons/fa';
// import defaultImage from 'App/admin/exampleImages⁩/defaultImage.png';
import { AboutPageTemplate, OtherPageTemplate } from 'App/admin/textPageTemplate';
import ListPageTemplate from 'App/admin/listPageTemplate';
import PortfolioTemplate from 'App/admin/portfolioTemplate';
import PropTypes from 'prop-types';
import ErrorBoundary from 'App/errorBoundary';

export default class AddPages extends Component {
	constructor(props){
		super(props);
		this.state={
			pageType:'none',
			pageData:{}
		};
		this.changePageType=this.changePageType.bind(this);
		this.setPageData=this.setPageData.bind(this);
		this.returnToPageSelection=this.returnToPageSelection.bind(this);

	}

	changePageType(event){
		this.setState({pageType:event.target.name});
	}

	setPageData(data){
		this.setState({pageData:data});
	}

	returnToPageSelection(){
		this.setState({pageType:'none'});
	}
	

	render() {
		const PageContents = () => {
			if (this.state.pageType==='none'){
				return(<ChoosePage changePageType={this.changePageType}/>);
			} else if (this.state.pageType==='about'){
				return( 
					<AboutPageTemplate 
					defaultImage={''} 
					backPage={this.returnToPageSelection} 
					createPage={true}/>);
			} else if (this.state.pageType==='portfolio'){
				return( <PortfolioTemplate 
					defaultImage={''} 
					backPage={this.returnToPageSelection} 
					createPage={true}/>);
			} else if (this.state.pageType==='gallery'){
				return( <ListPageTemplate pageType='Galleries'  
					backPage={this.returnToPageSelection} 
					createPage={true}/>);
			} else if (this.state.pageType==='event'){
				return( <ListPageTemplate pageType='Events'
					backPage={this.returnToPageSelection} 
					createPage={true}/>);
			} else if (this.state.pageType==='workshop'){
				return( <ListPageTemplate pageType='Workshops'
					backPage={this.returnToPageSelection} 
					createPage={true}/>);
			} else {
				return( <OtherPageTemplate backPage={this.returnToPageSelection}/>);
			}
		};

		return(
			<div>
				<ErrorBoundary>
		      		{ PageContents() }
		      	</ErrorBoundary>
		    </div>
		);
	}
}

const ChoosePage = (props) => {
	return (
		<div className='addPageMain pageEditor'>
			<h3 className='editingTitle'>Select what type of page you want to add</h3>
			<button type='button' className='pageEditButton' name='about' 
				onClick={props.changePageType}>About Page</button>
			<button type='button' className='pageEditButton' name='portfolio' 
				onClick={props.changePageType}>Portfolio Page</button>
			<button type='button' className='pageEditButton' name='gallery' 
				onClick={props.changePageType}>Gallery Page</button>
			<button type='button' className='pageEditButton' name='event' 
				onClick={props.changePageType}>Events Page</button>
			<button type='button' className='pageEditButton' name='workshop' 
				onClick={props.changePageType}>Workshop Page</button>
			<button type='button'  className='pageEditButton' name='other' 
				onClick={props.changePageType}>Other Page</button>
		</div>
	);
};

ChoosePage.propTypes= {
	changePageType:PropTypes.func.isRequired
};

const BackButton = (props) => {
	// props.clearAllData
	return(
		<div className='backLink' onClick={props.backPage}><FaArrowLeft /> Back</div>
	);
};

BackButton.propTypes = {
	backPage:PropTypes.func.isRequired
};

