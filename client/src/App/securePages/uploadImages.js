// based on tutorial here: https://codeburst.io/image-uploading-using-react-and-node-to-get-the-images-up-c46ec11a7129

import React, { Component} from 'react';
import axios from 'axios';
import ImageUploader from "react-images-upload";
import { FaTrashAlt } from "react-icons/fa";  // Font Awesome
import ImageEditor from "App/securePages/imageEditor";

export default class Contact extends Component {
  constructor(props) {
		super(props);
      this.state ={
        filesChosen:false,
        selectedFiles: [],
      };
      this.uploadImages = this.uploadImages.bind(this);
   	}

  uploadImages(e) {

    this.setState({
      selectedFiles: Array.from(e.target.files),
    }, ()=>console.log(this.state.selectedFiles));
    this.setState({filesChosen:true});
  }

  render(){
    if(this.state.filesChosen)
    {
      return(        
        <ImageEditor selectedFiles={this.state.selectedFiles} />
      )
    } else {
      return(
        <div className="main-upload-container"> 
          <h3 className="main-heading"> Upload an Image </h3>
          <div className="form-group">
              <input type="file" className="form-control" onChange={this.uploadImages} multiple />
          </div>
        </div>
      )
    }
  }
 }

