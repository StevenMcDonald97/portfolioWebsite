import React, { Component } from 'react';
import axios from 'axios';
import { BackButton, UploadImage, ImageCheckBox } from 'src/App/admin/helperComponents';
import PropTypes from "prop-types";

export default class PortfolioTemplate extends Component {
	constructor(props){
		super(props)
		this.state ={
			title:'',
			oldtitle:'',
			mainImage:'',
			imageFile:'',
			description:'',
			imageFileNames:[],
			allImages:[],
			createPage:this.props.createPage
		}

		this.loadImages=this.loadImages.bind(this);
		this.handleChange=this.handleChange.bind(this);
		this.addImageToPortfolio=this.addImageToPortfolio.bind(this);
		this.removeImageFromPortfolio=this.removeImageFromPortfolio.bind(this);
		this.getPageData=this.getPageData.bind(this);
		this.updateImage=this.updateImage.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
	}

	componentDidMount(){
		if (this.props.pageId){
			this.getPageData();
		} else {
			this.loadImages()
		}
	}

    getPageData = () =>{

    	if (this.props.pageId){
	        axios.get('/api/getPage', { params: {pageId: this.props.pageId, pageType:"portfolio" } })
	        .then((response) => {
	          this.setState({
	            title:response.data.title, 
	            oldTitle:response.data.title, 
	            mainImage:response.data.mainImage, 
	            description:response.data.description, 
	            imageFileNames:response.data.imageFileNames, 
	            }, ()=>{ this.loadImages()});
	        });
	    }
    }

	updateImage(file, name){
		this.setState({mainImage:name, imageFile:file})
	}

	loadImages(){
		/* fetch all images from database */
		axios.get('/image/getAll')
		  .then((response) => {
		  	this.setState({allImages:response.data})
		  });
	}

	addImageToPortfolio(imageName){
		console.log(`added image ${imageName} to portfolio`);
		const values = [...this.state.imageFileNames];
		values.push(imageName);
		this.setState({imageFileNames:values});
	}

	removeImageFromPortfolio(imageName){
		console.log(`removed image ${imageName} from portfolio`);
 		const values = [...this.state.imageFileNames];
 		const index = values.indexOf(imageName);
		values.splice(index,1);
		this.setState({imageFileNames:values});
	}

	handleChange = (event) => {
		this.setState({[event.target.name]:event.target.value})
	}

	onSubmit(){
		const PageData={"title":this.state.title, "oldTitle":this.state.oldTitle, "mainImage":this.state.mainImage, 
			"description":this.state.description, "imageFileNames":this.state.imageFileNames,
			"id":this.props.pageId};
		if (this.state.createPage) { 
			axios.post('/upload/uploadPortfolio', PageData).then((response)=>console.log(response))
		} else {
			axios.post('/edit/editPortfolio', PageData).then((response)=>console.log(response))
		};	
	}



	render(){

		return(
		<div className="pageEditor">
			<BackButton backPage={this.props.backPage}/>
			<form className="pageForm">
				<div className="inputGroup">
					<label className="inputLabel">Portfolio Thumbnail:</label>
					<UploadImage changeImage={this.updateImage} />
				</div>
				<div className="inputGroup">

					<label className="inputLabel" htmlFor="name">Portfolio Title:</label>
					<input type="text" className="smallPageField" name="title" 
						value={this.state.title} 
						onChange={this.handleChange}/>
				</div>
				<div className="inputGroup">
					<label className="inputLabel" htmlFor="description">Optional Description:</label>
					<textarea className="pageField" 
						name="description" 
						value={this.state.description} 
						onChange={this.handleChange} />
				</div>
				<div className="portfolioImageChoice">
					<h3>Choose images for this Portfolio </h3>
					{ (this.state.allImages).length !== 0 
						? (this.state.allImages).map((image) =>(
							<ImageCheckBox 
								key={image._id}
								checked={this.state.title===image.portfolio && this.state.title!==""}
								image={image} 
								title={this.state.title}
								addToPage={this.addImageToPortfolio}
								removeFromPage={this.removeImageFromPortfolio}
							/>
						)
					) : <div> Go to Add Images to upload images to your site </div>}
				</div>
				<div className="editSubmitButtons">
					<button type="button" className="editSubmitButton" onClick={this.onSubmit}> Submit </button>
					<button type="button" className="editSubmitButton" onClick={this.props.backPage}> Cancel </button>
				</div>
			</form>
		</div>)
	}
}

PortfolioTemplate.propTypes = {
	pageId:PropTypes.string,
	cratePage:PropTypes.string,
	backPage:PropTypes.func.isRequired
}
