import React, { Component } from 'react';
import axios from 'axios';
import { BackButton, UploadImage } from 'App/admin/helperComponents';
import PropTypes from 'prop-types';

export default class HomePageTemplate extends Component{
	constructor(props){
		super(props)
		this.state ={
			image:'',
			name:'',
			subHeader:'',
			imageFile:''
		}
		this.updateImage=this.updateImage.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
	}

	componentDidMount(){
        axios.get('/api/getHomePage')
        .then((response) => {
          this.setState({
            name:response.data.name, 
            imgName:response.data.image, 
            imageFile:'',
            subHeader:response.data.subHeader, 
            });
        });
	    
	}

	handleChange = (event) => {
		this.setState({[event.target.name]:event.target.value})
	}

	updateImage(file, name){
		console.log(name);
		this.setState({image:name, imageFile:file})
	}

	onSubmit(){
		const {imageFile, ...PageData}=this.state;
		const imageData = new FormData();
	    imageData.append('file', imageFile);
	    axios.post("/upload/uploadImages", imageData).then(res => { // then print response status
	        console.log(`Image upload returned: ${res.statusText}`)
	    }).catch(err => console.log(err));
		axios.post('/edit/editHomePage', PageData).then((response)=>console.log(response));
		this.props.history.push('/userPanel');
	}


	render() {
		return(
			<div className='pageEditor'>
				<form className='pageForm'>
					<BackButton backPage={this.props.backPage}/>
					<div className='inputGroup'>
						<label className='inputLabel'>Home Page Picture:</label>
						<UploadImage changeImage={this.updateImage} />
					</div>
					<div className='inputGroup'>
						<label className='inputLabel' htmlFor='name'>Your Name:</label>
						<input type='text' className='smallPageField' name='name' 
							value={this.state.name || ''} 
							onChange={this.handleChange}/>
					</div>
					<div className='inputGroup'>
						<label className='inputLabel' htmlFor='subHeader'>Tagline: </label>
						<textarea className='pageField' name='subHeader' 
							value={this.state.subHeader} 
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

HomePageTemplate.propTypes ={
	backPage:PropTypes.func
}
