import React, { Component } from 'react';
import axios from 'axios';
import { BackButton, UploadImage } from 'App/securePages/helperComponents';

class TextPageTemplate extends Component{
	constructor(props){
		super(props)
		this.state ={
			type:"",
			mainImage:"",
			name:"",
			description:"",
			secondaryText:""
		}
		this.getPageData=this.getPageData.bind(this);
	}

	componentDidMount(){
		this.getPageData();
	}

    getPageData = () =>{

    	if (this.props.pageId){
	        axios.get('/api/getPage', { params: {pageId: this.props.pageId, pageType:"text" } })
	        .then((response) => {

	          this.setState({
	          	type:response.data.type,
	            name:response.data.title, 
	            mainImage:response.data.imgUrl, 
	            description:response.data.mainText, 
	            secondaryText:response.data.subText, 
	            });
	        });
	    }
    }


	render() {
		if (this.state.type==="about"){
			return(<AboutPageTemplate 
				title={this.state.name}
				image={this.state.mainImage}
				description={this.state.description}
				secondaryText={this.state.secondaryText}
				createPage={this.props.createPage}
				backPage={this.props.backPage}
				/>)
		} else {
			return(<OtherPageTemplate 
				title={this.state.name}
				image={this.state.mainImage}
				description={this.state.description}
				createPage={this.props.createPage}
				backPage={this.props.backPage}
				/>)
		}
	}
}

class AboutPageTemplate extends Component {
	constructor(props){
		super(props)
		this.state ={
			mainImage:this.props.image,
			name:this.props.title,
			description:this.props.description,
			secondaryText:this.props.secondaryText,
			createPage:this.props.createPage
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
		 "subText":this.state.secondaryText};
		if (this.state.createPage) { 
			axios.post('/upload/uploadTextPage', PageData).then((response)=>console.log(response))
		} else {
			axios.post('/edit/editTextPage', PageData).then((response)=>console.log(response))
		};	
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
						<label className="inputLabel" htmlFor="secondaryText">Your Resume (optional):</label>
						<textarea className="pageField" name="secondaryText" 
							value={this.state.secondaryText} 
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

class OtherPageTemplate extends Component {
	constructor(props){
		super(props)
		this.state ={
			mainImage:this.props.image,
			title:this.props.title,
			description:this.props.description,
			createPage:this.props.createPage

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
			"img":this.state.mainImage, "mainText":this.state.description, 
			"subText":""};
		if (this.state.createPage) { 
			axios.post('/upload/uploadTextPage', PageData).then((response)=>console.log(response))
		} else {
			axios.post('/edit/editTextPage', PageData).then((response)=>console.log(response))
		};	
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

export { TextPageTemplate, AboutPageTemplate, OtherPageTemplate };

