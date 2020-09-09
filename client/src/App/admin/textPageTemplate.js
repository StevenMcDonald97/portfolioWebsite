import React, { Component } from 'react';
import axios from 'axios';
import { BackButton, UploadImage } from 'App/admin/helperComponents';
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
				mainText={this.state.description}
				subText={this.state.secondaryText}
				createPage={this.props.createPage}
				backPage={this.props.backPage}
				pageId={this.props.pageId}
				/>)
		} else {
			return(<OtherPageTemplate 
				title={this.state.name}
				image={this.state.mainImage}
				mainText={this.state.description}
				createPage={this.props.createPage}
				backPage={this.props.backPage}
				pageId={this.props.pageId}
				/>)
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
			img:this.props.image,
			title:'About the Artist',
			mainText:this.props.mainText,
			subText:this.props.subText,
			createPage:this.props.createPage
		}
		this.updateImage=this.updateImage.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
	}


	handleChange = (event) => {
		this.setState({[event.target.name]:event.target.value})
	}

	updateImage(file){
		this.setState({img:URL.createObjectURL(file)})
	}


	onSubmit(){
		const {createPage, ...PageData} = this.state;

		if (this.state.createPage) { 
			axios.post('/upload/uploadTextPage', PageData).then((response)=>console.log(response))
		} else {
			axios.post('/edit/editTextPage', {id:this.props.pageId, ...PageData}).then((response)=>console.log(response))
		};	
	}

	render(){
		return(
			<div className='pageEditor'>
				<form className='pageForm'>
					<BackButton backPage={this.props.backPage}/>
					<div className='inputGroup'>
						<label className='inputLabel'>Profile Picture:</label>
						<img className='pageImage' name='aboutImage' src={this.state.img}/>
						<UploadImage changeImage={this.updateImage} />
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
			img:this.props.image,
			title:this.props.title,
			mainText:this.props.mainText,
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
		this.setState({img:newUrl})
	}

	onSubmit(){
		const {createPage, ...PageData} = this.state;
		
		if (this.state.createPage) { 
			axios.post('/upload/uploadTextPage', PageData).then((response)=>console.log(response))
		} else {
			axios.post('/edit/editTextPage', {id:this.props.pageId, ...PageData}).then((response)=>console.log(response))
		};	
	}

	render(){
		return(
		<div className='pageEditor'>
			<BackButton backPage={this.props.backPage}/>
			<div className='inputGroup'>

				<label className='inputLabel' htmlFor='pageImage'>Main Image (optional):</label>
				<img className='pageImage' src={this.state.img}/>
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
					onChange={this.handleChange} />
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

