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
			subHeader:''
		}
		this.updateImage=this.updateImage.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
	}

	componentDidMount(){
        axios.get('/api/getHomePage')
        .then((response) => {
          this.setState({
            name:response.data.name, 
            image:response.data.image, 
            subHeader:response.data.subHeader, 
            });
        });
	    
	}

	handleChange = (event) => {
		this.setState({[event.target.name]:event.target.value})
	}

	updateImage(file){
		this.setState({mainImage:URL.createObjectURL(file)})
		this.setState({mainImageName:(file.name)})
	}

	onSubmit(){
		const PageData=this.state;
		axios.post('/edit/editHomePage', PageData).then((response)=>console.log(response));
	}


	render() {
		return(
			<div className='pageEditor'>
				<form className='pageForm'>
					<BackButton backPage={this.props.backPage}/>
					<div className='inputGroup'>
						<label className='inputLabel'>Home Page Picture:</label>
						<img className='pageImage' name='aboutImage' src={this.state.mainImage}/>
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
