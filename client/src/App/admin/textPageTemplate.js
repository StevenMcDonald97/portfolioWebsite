import React, { Component } from 'react';
import axios from 'axios';
import { BackButton, UploadImage } from 'src/App/admin/helperComponents';
import PropTypes from 'prop-types';

class TextPageTemplate extends Component{
	constructor(props){
		super(props)
		this.state ={
			type:'',
			mainImage:'',
			name:'',
			description:'',
			secondaryText:''
		}
		this.getPageData=this.getPageData.bind(this);
	}

	componentDidMount(){
		this.getPageData();
	}

    getPageData = () =>{
    	if (this.props.pageId){
	        axios.get('/api/getPage', { params: {pageId: this.props.pageId, pageType:'text' } })
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
		if (this.state.type==='about'){
			return(<AboutPageTemplate 
				image={this.state.mainImage}
				title={this.state.name}
				mainText={this.state.description}
				subText={this.state.secondaryText}
				createPage={this.props.createPage}
				backPage={this.props.backPage}
				pageId={this.props.pageId}
				/>)
		} else {
			return(this.state.name ? <OtherPageTemplate 
				title={this.state.name}
				image={this.state.mainImage}
				mainText={this.state.description}
				createPage={this.props.createPage}
				backPage={this.props.backPage}
				pageId={this.props.pageId}
				/> : <div>No page found</div>)
		}
	}
}

TextPageTemplate.propTypes ={
	pageId:PropTypes.string,
	createPage:PropTypes.bool,
	backPage:PropTypes.func
}


class AboutPageTemplate extends Component {
	constructor(props){
		super(props)
		this.state ={
			type:'about',
			imgName:this.props.image,
			imageFile:'',
			title:this.props.title,
			mainText:this.props.mainText,
			subText:(this.props.subText ? this.props.subText : ""),
			createPage:this.props.createPage
		}
		this.updateImage=this.updateImage.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
	}


	handleChange = (event) => {
		this.setState({[event.target.name]:event.target.value})
	}

	updateImage(file, name){
		console.log(name);
		this.setState({imgName:name, imageFile:file})
	}

	onSubmit(){
		const {createPage, imageFile, ...PageData} = this.state;
	    const imageData = new FormData();
	    imageData.append('file', imageFile);
	    axios.post("/upload/uploadImages", imageData).then(res => { // then print response status
	        console.log(`Image upload returned: ${res.statusText}`)
	    }).catch(err => console.log(err));

		if (this.state.createPage) { 
			axios.post('/upload/uploadTextPage', PageData).then((response)=>alert(response.data));
		} else {
			axios.post('/edit/editTextPage', {id:this.props.pageId, ...PageData}).then((response)=>console.log(response.data));
		};	
		alert("Updated Page, refresh to see your changes");
	}

	render(){
		return(
			<div className='pageEditor'>
				<form className='pageForm'>
					<BackButton backPage={this.props.backPage}/>
					<div className='inputGroup'>
						<label className='inputLabel'>Profile Picture:</label>
						<UploadImage changeImage={this.updateImage} />
					</div>
					<div className='inputGroup'>
						<label className='inputLabel' htmlFor='title'>Page Title:</label>
						<input type='text' className='smallPageField' name='title' 
							value={this.state.title} 
							onChange={this.handleChange}/>
					</div>
					<div className='inputGroup'>
						<label className='inputLabel' htmlFor='mainText'>Your Artist Statement:</label>
						<textarea className='pageField' name='mainText' 
							value={this.state.mainText} 
							onChange={this.handleChange} />
					</div>
					<div className='inputGroup'>
						<label className='inputLabel' htmlFor='subText'>Your Resume (optional):</label>
						<textarea className='pageField' name='subText' 
							value={this.state.subText} 
							onChange={this.handleChange} />
					</div>
					<div className='editSubmitButtons'>
						<button type='button' className='editSubmitButton' onClick={this.onSubmit}> Submit </button>
						<button type='button' className='editSubmitButton' onClick={this.props.backPage}> 
							Cancel 
						</button>
					</div>
				</form>
			</div>
		)
	}
}

AboutPageTemplate.propTypes={
	image:PropTypes.string,
	mainText:PropTypes.string,
	subText:PropTypes.string,
	pageId:PropTypes.string,
	createPage:PropTypes.bool,
	backPage:PropTypes.func
}

class OtherPageTemplate extends Component {
	constructor(props){
		super(props)
		this.state ={
			type:'other',
			imgName:this.props.image,
			imageFile:'',
			title:this.props.title,
			mainText:this.props.mainText,
			createPage:this.props.createPage,
		}
		this.updateImage=this.updateImage.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
	}

	handleChange = (event) => {
		this.setState({[event.target.name]:event.target.value})
	}

	updateImage(file, name){
		this.setState({imgName:name, imageFile:file})
	}

	onSubmit(){
		const {createPage, imageFile, ...PageData} = this.state;
	    const imageData = new FormData();
	    imageData.append('file', imageFile);
	    axios.post("/upload/uploadSingleImage", imageData).then(res => { // then print response status
	        console.log(`Image upload returned: ${res.statusText}`)
	    }).catch(err => console.log(err));

		if (this.state.createPage) { 
			axios.post('/upload/uploadTextPage', PageData).then(response=>alert(response));
		} else {
			axios.post('/edit/editTextPage', {id:this.props.pageId, ...PageData}).then(response=>alert(response));
		};	
		alert("Updated Page, refresh to see your changes");
	}

	render(){
		return(
		<div className='pageEditor'>
			<BackButton backPage={this.props.backPage}/>
			<div className='inputGroup'>
				<label className='inputLabel' htmlFor='pageImage'>Main Image (optional):</label>
				<UploadImage changeImage={this.updateImage} />
			</div>
			<div className='inputGroup'>
				<label className='inputLabel' htmlFor='title'>Page Title:</label>
				<input type='text' className='smallPageField' name='title' 
					value={this.state.title} 
					onChange={this.handleChange}/>
			</div>
			<div className='inputGroup'>
				<label className='inputLabel' htmlFor='mainText'>Page Description:</label>
				<textarea className='pageField' name='mainText' 
					value={this.state.mainText} 
					onChange={this.handleChange}/>
			</div>
			<div className='editSubmitButtons'>
				<button type='button' className='editSubmitButton' onClick={this.onSubmit}> Create </button>
				<button type='button' className='editSubmitButton' onClick={this.props.backPage}> Cancel </button>
			</div>
		</div>)
	}
}

OtherPageTemplate.propTypes={
	image:PropTypes.string,
	title:PropTypes.string,
	mainText:PropTypes.string,
	pageId:PropTypes.string,
	createPage:PropTypes.bool,
	backPage:PropTypes.func
}


export { TextPageTemplate, AboutPageTemplate, OtherPageTemplate };

