import React, { Component, useState } from 'react';
import {FaArrowLeft} from "react-icons/fa";
import PropTypes from "prop-types";
const defaultImage = require("App/upload/defaultImage.png");

const BackButton = (props) => {
	// props.clearAllData
	return(
		<div className="backLink" onClick={props.backPage}><FaArrowLeft /> Back</div>
	)
}

BackButton.propTypes = {
    backPage:PropTypes.func.isRequired
}

class UploadImage extends Component {
  constructor(props) {
		super(props);
      this.state ={
        selectedFile:null,
        image:defaultImage
      };
      this.changeImage = this.changeImage.bind(this);
   	}

  changeImage(e) {
    const file = e.target.files[0];
    this.setState({
      image:URL.createObjectURL(file),
      selectedFile: file
    }, ()=>{
      this.props.changeImage(file, file.name);
    });
  }

  render(){
      return(
        <div className="main-upload-container"> 
          <div className="form-group">
            <img name="mainImage" className="pageImageUpload" src={this.state.image}/>
            <input type="file" name="image" className="fileInput" 
              	onChange={this.changeImage}/>
          </div>
        </div>
      )
  }
}

UploadImage.propTypes={
  changeImage:PropTypes.func.isRequired
}

export { BackButton, UploadImage };
