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

class AboutPage extends Component {
	constructor(props){
		super(props)
		this.state ={
			mainImage:this.props.defaultImage,
			mainImageName:'',
			name:this.props.name,
			description:this.props.description,
			secondaryText:this.props.resume
		}
		this.updateImage=this.updateImage.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
	}

	handleChange = (event) => {
		this.setState({[event.target.name]:event.target.value})
	}

	updateImage(file){
		this.setState({mainImage:URL.createObjectURL(file)})
		this.setState({mainImageName:(file.name)})
	}


	onSubmit(){
		const PageData={"type":"about", "title":"About the Artist",
		 "img":this.state.mainImageName, "mainText":this.state.description,
		 "subText":this.state.resume};
		axios.post('/upload/uploadTextPage', PageData)
	}

	render(){
		return(
			<div className="pageEditor">
				<form className="pageForm">
					<BackButton backPage={this.props.backPage}/>
					<div className="inputGroup">
						<label className="inputLabel">Profile Picture:</label>
						<img className="pageImage" name="aboutImage" src={this.state.mainImage}/>
						<UploadImage changeImage={this.updateImage} />
					</div>
					<div className="inputGroup">
						<label className="inputLabel" htmlFor="name">Your Name:</label>
						<input type="text" className="smallPageField" name="name" 
							value={this.state.name} 
							onChange={this.handleChange}/>
					</div>
					<div className="inputGroup">
						<label className="inputLabel" htmlFor="description">Your Artist Statement:</label>
						<textarea className="pageField" name="description" 
							value={this.state.description} 
							onChange={this.handleChange} />
					</div>
					<div className="inputGroup">
						<label className="inputLabel" htmlFor="resume">Your Resume (optional):</label>
						<textarea className="pageField" name="resume" 
							value={this.state.resume} 
							onChange={this.handleChange} />
					</div>
					<div className="editSubmitButtons">
						<button type="button" className="editSubmitButton" onClick={this.onSubmit}> Create </button>
						<button type="button" className="editSubmitButton" onClick={this.props.backPage}> 
							Cancel 
						</button>
					</div>
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
			imageFileNames:[],
			allImages:[]
		}
		this.loadImages=this.loadImages.bind(this);
		this.handleChange=this.handleChange.bind(this);
		this.addImageToPortfolio=this.addImageToPortfolio.bind(this);
		this.removeImageFromPortfolio=this.removeImageFromPortfolio.bind(this);

		this.updateImage=this.updateImage.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
	}

	updateImage(file){
		this.setState({mainImage:URL.createObjectURL(file)})
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
		const PageData={"title":this.state.title, "mainImage":this.state.mainImage, 
			"description":this.state.description, "imageFileNames":this.state.imageFileNames};
		axios.post('/upload/uploadPortfolio', PageData).then((response)=>console.log(response));
	}

	componentDidMount(){
		this.loadImages();
	}

	render(){

		return(
		<div className="pageEditor">
			<BackButton backPage={this.props.backPage}/>
			<form className="pageForm">
				<div className="inputGroup">
					<label className="inputLabel">Portfolio Thumbnail:</label>
					<img name="mainImage" className="pageImage" src={this.state.mainImage}/>
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
					{ this.state.allImages.length !== 0 
						? this.state.allImages.map((image) =>
						<ImageCheckBox 
							key={image._id}
							image={image} 
							addToPortfolio={this.addImageToPortfolio}
							removeFromPortfolio={this.removeImageFromPortfolio}
							isInPortfolio={false}
						/>
					) : <div> Go to Add Images to upload images to your site </div>}
				</div>
				<div className="editSubmitButtons">
					<button type="button" className="editSubmitButton" onClick={this.onSubmit}> Create </button>
					<button type="button" className="editSubmitButton" onClick={this.props.backPage}> Cancel </button>
				</div>
			</form>
		</div>)
	}
}

/*create a component for each image to enable adding and removing from a portfolio*/
function ImageCheckBox(props) {
	const [checked, setChecked] = useState(props.isInPortfolio);
  	const toggle = React.useCallback(() => {
  		setChecked(!checked);
  		if (!checked) {
  			props.addToPortfolio(props.image.fileName)
  		} else {
  			props.removeFromPortfolio(props.image.fileName)
  		}
  	});


	return (			  
		<div className="imageSelection">
			<input type="checkbox" name={props.image.fileName} checked={checked} 
				onChange={toggle}/>
			<img className="checkImage" src={images(`./${props.image.fileName}`)}/>
			<div> {props.image.title} </div>
		</div>
	)
	    
}


class ListPage extends Component {
	constructor(props){
		super(props)
		this.state ={
			type:this.props.pageType,
			title:this.props.pageType,
			numObjs:this.props.objects.length,
			listObjects:this.props.objects
		}
		this.onChange=this.onChange.bind(this);
		this.addPageObject=this.addPageObject.bind(this);
		this.updatePageObject=this.updatePageObject.bind(this);
		this.removePageObject=this.removePageObject.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
	}

	onChange(event){
		this.setState({[event.target.name]:event.target.value});
	}



	addPageObject(event){
	    const values = [...this.state.listObjects];
		values.push({"title":"","img":defaultImage, "description":"", 
			num:this.state.numObjs});
		this.setState({listObjects:values}, 
			()=>this.setState({numObjs:this.state.numObjs+1}));

	}

	updatePageObject(index, field, value){
	    const values = [...this.state.listObjects];
	    values[index][field]=value;
		this.setState({listObjects:values});
	}

	removePageObject(index){
	    const values = [...this.state.listObjects];
	    values.splice(index, 1);
	    for (var i=index; i<values.length; i++)	{
	    	values[i].num=values[i].num-1;
	    	console.log(values[i]);
	    }
	   	this.setState({numObjs:this.state.numObjs-1},
	   		()=>this.setState({listObjects:values}));
	}

	onSubmit(){
		const PageData={"type":this.state.type, "title":this.state.type, "text":"",
			"objs":this.state.listObjects};
		axios.post('/upload/uploadListPage', PageData)
	}

	render(){

		const create_inputs = this.state.listObjects.map((obj, index) =>  
	     	<ListObjectEditor key={index} img={obj.img} num={obj.num} 
	     		title={this.state.listObjects[index].title} 
	     		description={this.state.listObjects[index].description}
	     		updatePageObject={this.updatePageObject}
	     		removePageObject={this.removePageObject}
	     	/>
	    );

		return(
		<div className="pageEditor">
			<BackButton backPage={this.props.backPage}/>
			<form className="pageForm">
				{ create_inputs }
				<button type="button" className="button" onClick={this.addPageObject}> 
					Add new {this.props.pageType} 
				</button>
				<div className="editSubmitButtons">
					<button type="button" className="editSubmitButton" onClick={this.onSubmit}> Create Page</button>
					<button type="button" className="editSubmitButton" onClick={this.props.backPage}>
						Cancel 
					</button>
				</div>
			</form>
		</div>)
	}
}


class ListObjectEditor extends Component {
	constructor(props){
		super(props);
		this.state={
			image:''
		}
		this.updateIamge=this.updateImage.bind(this);
		this.updateObject=this.updateObject.bind(this);
	}


	updateImage = (file) =>{
		this.setState({image:file});
		this.props.updatePageObject(this.props.num, "image", file);
	}

	updateObject = (event) =>{
		if(event){
			this.props.updatePageObject(this.props.num, event.target.name, event.target.value);
		}
	}

	render(){
		return(
	 		<li className="pageEditingObject">
	 			<div className="inputGroup">
					<img className="listObjectImage" src={this.state.image} />
					<UploadImage changeImage={this.updateImage}/>
				</div>
				<div className="inputGroup">
					<input type="text" name="title" value={this.props.title} placeholder="Title" 
						onChange={this.updateObject}/>
				</div>
				<div className="inputGroup">
					<input type="text" name="description" value={this.props.description} placeholder="Description" 
						onChange={this.updateObject}/>
				</div>
				<button type="button" name={this.props.num} className="tooltip btn" 
					onClick={index=>this.props.removePageObject(index)}>
			    	<FaTrashAlt />
				    <span className="tooltiptext">Remove this</span>
				</button>
			</li>
		)
	}
}


class OtherPage extends Component {
	constructor(props){
		super(props)
		this.state ={
			mainImage:this.props.defaultImage,
			title:this.props.title,
			description:this.props.description,
		}
		this.updateImage=this.updateImage.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
	}

	handleChange = (event) => {
		this.setState({[event.target.name]:event.target.value})
	}

	updateImage(file){
		let newUrl=URL.createObjectURL(file);
		this.setState({mainImage:newUrl})
	}

	onSubmit(){
		const PageData={"type":"other", "title":this.state.title, 
			"img":this.state.mainImage, "description":this.state.description, 
			"subText":""};
		axios.post('/upload/uploadTextPage', PageData)
	}

	render(){
		return(
		<div className="pageEditor">
			<BackButton backPage={this.props.backPage}/>
			<div className="inputGroup">

				<label className="inputLabel" htmlFor="pageImage">Main Image (optional):</label>
				<img className="pageImage" src={this.state.mainImage}/>
				<UploadImage changeImage={this.updateImage} />
			</div>
			<div className="inputGroup">
				<label className="inputLabel" htmlFor="title">Page Title:</label>
				<input type="text" className="smallPageField" name="title" 
					value={this.state.name} 
					onChange={this.handleChange}/>
			</div>
			<div className="inputGroup">
				<label className="inputLabel" htmlFor="description">Page Description:</label>
				<textarea className="pageField" name="description" 
					value={this.state.description} 
					onChange={this.handleChange} />
			</div>
			<div className="editSubmitButtons">
				<button type="button" className="editSubmitButton" onClick={this.onSubmit}> Create </button>
				<button type="button" className="editSubmitButton" onClick={this.props.backPage}> Cancel </button>
			</div>
		</div>)
	}
}


class UploadImage extends Component {
  constructor(props) {
		super(props);
      this.state ={
        selectedFile:null,
      };
      this.uploadImage = this.uploadImage.bind(this);
   	}

  uploadImage(e) {
    this.setState({
      selectedFile: (e.target.files[0]),
    });
    this.props.changeImage(e.target.files[0]);
  }


  render(){
      return(
        <div className="main-upload-container"> 
          <div className="form-group">
              <input type="file" name="image" className="fileInput" 
              	onChange={this.uploadImage}/>
          </div>
        </div>
      )
  }
 }

