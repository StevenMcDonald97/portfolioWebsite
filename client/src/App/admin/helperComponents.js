import React, { Component } from 'react';
import {FaArrowLeft} from "react-icons/fa";
import PropTypes from "prop-types";
const images = require.context('App/upload', true);
const defaultImage = images("./defaultImage.png");

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
    var image = (this.props.currentImage ? images(`./${this.props.currentImage}`) : defaultImage);
    this.state ={
      selectedFile:null,
      image:image
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
            <img name="mainImage" className="pageImageUpload" src={this.state.image} alt=""/>
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
