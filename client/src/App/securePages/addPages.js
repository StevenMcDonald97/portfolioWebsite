import React, { Component, useState } from 'react';
import axios from 'axios';
import {FaArrowLeft} from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";  // Font Awesome
import defaultImage from "../profileimages/default-image.png";


export default class UserPanel extends Component {
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
				return(<ChoosePage changePageType={this.changePageType} setPageData={this.setPageData}/>)
			} else if (this.state.pageType==="about"){
				return( <AboutPage name="" description="" resume="" defaultImage={defaultImage} backPage={this.returnToPageSelection} setPageData={this.setPageData}/>)
			} else if (this.state.pageType==="portfolio"){
				return( <PortfolioPage title="" description="" images={[]} defaultImage={defaultImage} backPage={this.returnToPageSelection} setPageData={this.setPageData}/>)
			} else if (this.state.pageType==="gallery"){
				return( <ListPage pageType="gallery" title="" description="" objects={[]} backPage={this.returnToPageSelection} setPageData={this.setPageData}/>)
			} else if (this.state.pageType==="event"){
				return( <ListPage pageType="event" title="" description="" objects={[]} backPage={this.returnToPageSelection} setPageData={this.setPageData}/>)
			} else if (this.state.pageType==="workshop"){
				return( <ListPage pageType="workshop" title="" description="" objects={[]} backPage={this.returnToPageSelection} setPageData={this.setPageData}/>)
			} else {
				return( <OtherPage backPage={this.returnToPageSelection}/>)
			}
		}

		return(
			<div>
		      { PageContents() };
		    </div>
		);
	}
}


const ChoosePage = (props) => {
	return (
		<div className="addPageMain">
			<h3>Select what type of page you want to add</h3>
			<button type="button" className="pageEditButton" name="about" onClick={props.changePageType}>About Page</button>
			<button type="button" className="pageEditButton" name="portfolio" onClick={props.changePageType}>Portfolio Page</button>
			<button type="button" className="pageEditButton" name="gallery" onClick={props.changePageType}>Gallery Page</button>
			<button type="button" className="pageEditButton" name="event" onClick={props.changePageType}>Events Page</button>
			<button type="button" className="pageEditButton" name="workshop" onClick={props.changePageType}>Workshop Page</button>
			<button type="button" className="pageEditButton" name="other" onClick={props.changePageType}>Other Page</button>
		</div>
	)
}

const BackButton = (props) => {
	// props.clearAllData
	return(
		<div className="backLink" onClick={props.backPage}><FaArrowLeft /> Back</div>
	)
}


class AboutPage extends Component {
	constructor(props){
		super(props)
		this.state ={
			mainImage:this.props.defaultImage,
			name:this.props.name,
			description:this.props.description,
			resume:this.props.resume
		}
	}

	handleChange = (event) => {
		this.setState({[event.target.name]:event.target.value})
	}

	onSubmit(){
		const PageData={name:this.state.name, image:this.state.mainImage, description:this.state.description, resume:this.state.resume};
		axios.post('/upload/about', PageData)
	}

	render(){
		return(
			<div className="pageEditor">
				<form>
					<BackButton backPage={this.props.backPage}/>
					<img src={this.state.mainImage}/>
					<label htmlFor="mainImage">Upload a Profile Picture</label>
					<input type="file" className="newPageField" name="mainImage" 
						onChange={this.handleChange}/>
					<label htmlFor="name">Your Name:</label>
					<input type="text" className="newPageField" name="name" 
						value={this.state.name} 
						onChange={this.handleChange}/>
					<label htmlFor="description">Your Artist Statement:</label>
					<textarea className="newPageField" name="description" 
						value={this.state.description} 
						onChange={this.handleChange} />
					<label htmlFor="resume">Your Resume (optional):</label>
					<textarea name="resume" 
						value={this.state.resume} 
						onChange={this.handleChange} />
					<button type="button"> Create </button>
					<button type="button" onClick={this.props.backPage}> Cancel </button>
				</form>
			</div>
		)
	}
}


class PortfolioPage extends Component {
	constructor(props){
		super(props)
		this.state ={
			title:this.props.title,
			mainImage:this.props.defaultImage,
			description:this.props.description,
			images:this.props.images,
			allImages:[]
		}
		this.loadImages=this.loadImages.bind(this);
		this.handleChange=this.handleChange.bind(this);
		// this.loadImages();
	}

	loadImages(){


		/* fetch all images from database */
		axios.get('/images/getAll')
		  .then((response) => {
		    console.log(response.data);
		    console.log(response.status);
		    console.log(response.statusText);
		    console.log(response.headers);
		    console.log(response.config);
		  });

	}

	addImageToPortfolio(imageId){
		const values = [...this.state.images];
		values.push(imageId);
		this.setState({images:values});
	}

	removeImageFromPortfolio(imageId){
 		const values = [...this.state.listObjects];
 		const index = values.indexOf(imageId);
		values.splice(index,1);
		this.setState({images:values});
	}

	handleChange = (event) => {
		this.setState({[event.target.name]:event.target.value})
	}

	onSubmit(){
		const PageData={title:this.state.title, image:this.state.mainImage, description:this.state.description, images:this.state.images};
		axios.post('/upload/portfolio', PageData)
	}

	render(){

		return(
		<div> 
			<BackButton backPage={this.props.backPage}/>
			<form>
				<label htmlFor="name">Portfolio Title:</label>
				<input type="text" className="newPageField" name="title" 
					value={this.state.title} 
					onChange={this.handleChange}/>
				<img src={this.state.mainImage}/>
				<label htmlFor="mainImage">Upload a Thumbnail Picture</label>
				<input type="file" className="newPageField" name="mainImage" 
					onChange={this.handleChange}/>
				<label htmlFor="description">Optional Description:</label>
				<textarea className="newPageField" 
					name="description" 
					value={this.state.description} 
					onChange={this.handleChange} />

				<div className="portfolioImageChoice">
					<h3> Add Images to this Portfolio </h3>
					{ this.state.allImages.map((image) =>

						<ImageCheckBox 
							image={image} 
							addToportfolio={this.addImageToPortfolio}
							removeFromPortfolio={this.removeImageFromPortfolio}
							isInPortfolio={image.portfolio===this.state.title}
						/>
					)}
				</div>

				<button type="button"> Create </button>
				<button type="button" onClick={this.props.backPage}> Cancel </button>
			</form>
		</div>)
	}
}

/*create a component for each image to enable adding and removing from a portfolio*/
function ImageCheckBox(props) {
	const [checked, setChecked] = useState(props.isInPortfolio);
  	const toggle = React.useCallback(() => {
  		setChecked(!checked);
  		if (checked) {
  			props.addToPortfolio(props.image.id)
  		} else {
  			props.removeFromPortfolio(props.image.id)
  		}
  	});


	return (			  
		<div className="imageSelection">
			<input type="checkbox" name={props.image.id} checked={checked} onChange={toggle}/>
			<img src={props.image.url}/>
			<div> {props.image.title} </div>
		</div>
	)
	    
}


class ListPage extends Component {
	constructor(props){
		super(props)
		this.state ={
			type:this.props.pageType,
			title:this.props.title,
			numObjs:this.props.objects.length,
			listObjects:this.props.objects
		}
		this.onChange=this.onChange.bind(this);
		this.addPageObject=this.addPageObject.bind(this);
		this.removePageObject=this.removePageObject.bind(this);
	}

	onChange(event){
		this.setState({[event.target.name]:event.target.value});
	}

	addPageObject(event){
	    const values = [...this.state.listObjects];
		values.push({"title":"","img":defaultImage, "description":"", num:this.state.numObjs});
		this.setState({listObjects:values}, ()=>this.setState({numObjs:this.state.numObjs+1}));
		

	}

	removePageObject(index){
	    const values = [...this.state.listObjects];
	    values.splice(index, 1);
	    for (var i=index; i<values.length; i++)	{
	    	values[i].num=values[i].num-1;
	    	console.log(values[i]);
	    }
	   	this.setState({numObjs:this.state.numObjs-1},()=>this.setState({listObjects:values}));
	}

	onSubmit(){
		const PageData={type:this.state.type, title:this.state.title, objs:this.state.listObjects};
		axios.post('/upload/portfolio', PageData)
	}

	render(){

		const create_inputs = this.state.listObjects.map((obj, index) =>  
	      <li key={index} className="pageEditingObject">
	    	<img src={obj.img} />
	      	<input type="text" value={this.state.listObjects[index].title} placeholder="Title" onChange={()=>console.log("change unimplemented yet")}/>
	      	<input type="text" value={this.state.listObjects[index].description} placeholder="Description" onChange={()=>console.log("change unimplemented yet")}/>
	      	<button type="button" name={obj.num} className="tooltip btn" onClick={index=>this.removePageObject(index)}>
	            <FaTrashAlt />
	            <span className="tooltiptext">Remove this {this.props.type}</span>
	       </button>
	      </li>

	    );

		return(
		<div> 
			<BackButton backPage={this.props.backPage}/>
			<form>
				{ create_inputs }
				<button type="button" onClick={this.addPageObject}> Add new {this.props.pageType} </button>
				<button type="button"> Create Page</button>
				<button type="button" onClick={this.props.backPage}> Cancel </button>
			</form>
		</div>)
	}
}


const PageObject = (props) => {
	return(
		<div className="pageObject">
			<img className="pageObjectImage" src={props.img} />
			<input type="text" className="pageObjectField" name="title" value={ props.title } placeholder="Title" onChange={ props.onChange } />
			<input type="text" className="pageObjectField" name="text" value={ props.description } placeholder="Description" onChange={ props.onChange } />
			
		</div>
	)
}


class OtherPage extends Component {
	constructor(props){
		super(props)
		this.state ={
			mainImage:this.props.defaultImage,
			title:this.props.title,
			description:this.props.description,
		}
	}

	render(){
		return(
		<div> 
			<BackButton backPage={this.props.backPage}/>

			<button type="button"> Create </button>
			<button type="button" onClick={this.props.backPage}> Cancel </button>
		</div>)
	}
}

