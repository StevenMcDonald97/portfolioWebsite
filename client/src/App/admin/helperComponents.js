import React, { Component, useState } from 'react';
import {FaArrowLeft} from "react-icons/fa";
import PropTypes from "prop-types";
import ImageErrorCatch from "src/App/pages/ImageErrorCatch";

const images = require.context('../images', true);
const defaultImage = images("./defaultImage.png");
const fs = require('fs');

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
    var image;

    try{
      image= (this.props.currentImage ? images(`./${this.props.currentImage}`) : defaultImage);
      console.log(this.props.currentImage);
    } catch (error) {
      console.log(error);
      image=defaultImage;
    }

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

/*create a component for each image to enable adding and removing from a portfolio*/
function ImageCheckBox(props) {
  const [checked, setChecked] = useState(props.checked);
    const toggle = React.useCallback(() => {
      setChecked(!checked);
      if (!checked) {
        props.addToPage(props.image.fileName)
      } else {
        props.removeFromPage(props.image.fileName)
      }
    });


  return (        
    <div className="imageSelection">
      <input type="checkbox" name={props.image.fileName} checked={checked} 
        onChange={toggle}/>
      <ImageErrorCatch imgClass="checkImage" src={props.image.fileName}/>
    </div>
  )
      
}

export { BackButton, UploadImage, ImageCheckBox};
