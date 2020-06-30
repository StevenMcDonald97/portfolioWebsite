// based on tutorial here: https://codeburst.io/image-uploading-using-react-and-node-to-get-the-images-up-c46ec11a7129

import React, { Component } from 'react';
import axios from 'axios';

export default class Contact extends Component {
	constructor(props) {
		super(props);
        this.state ={
            files: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
   	}



	onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImages', this.state.files);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        console.log(this.state.files);
        axios.post('/image/uploadimages',formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
            	alert("Error while uploading these images");
				console.error(error);
        	});
    }

    onChange(e) {
        this.setState({files:e.target.files});
    }


  render(){
  	return(

  		<div className="main-upload-container"> 
  			<h3 className="main-heading"> Upload Images </h3>
  			<div className ="image-container">
  				<form encType="multipart/form-data" onSubmit={this.onFormSubmit}>
  					<p className="process_details">Upload images to your portfolio(s)</p>
  					<input name="uploadForm" type="file" onChange= {this.onChange} multiple/>
  				    <button type="submit">Upload Images</button>
  				</form>
  			</div>
  		</div>



  		)
  }

 }

