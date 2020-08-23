import React, { Component, useState } from 'react';
import {FaArrowLeft} from "react-icons/fa";

const BackButton = (props) => {
	// props.clearAllData
	return(
		<div className="backLink" onClick={props.backPage}><FaArrowLeft /> Back</div>
	)
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

export { BackButton, UploadImage };
