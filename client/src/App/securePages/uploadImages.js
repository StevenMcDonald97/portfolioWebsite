// based on tutorial here: https://codeburst.io/image-uploading-using-react-and-node-to-get-the-images-up-c46ec11a7129

import React, { Component } from 'react';
import axios from 'axios';
import ImageUploader from "react-images-upload";
const FileReader = require('filereader');

export default class Contact extends Component {
	 imageArray = [];
   imageObj=[];

  constructor(props) {
		super(props);
      this.state ={
        selectedFiles: []
      };
      this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
   	}

    uploadMultipleFiles(e) {

      this.setState({
       selectedFiles: e.target.files,
      })


        this.imageObj.push(e.target.files);

        for (let i = 0; i < this.imageObj[0].length; i++) {
            this.imageArray.push(URL.createObjectURL(this.imageObj[0][i]))

        }

        this.setState({ file: this.imageArray });
        console.log(this.state);


    }

    onSubmit(e) {

        const data = new FormData();
           for(var x = 0; x<this.state.selectedFiles.length; x++) {
               data.append('file', this.state.selectedFiles[x])
           }

          axios.post("/upload/uploadImages", data, { 
              // receive two    parameter endpoint url ,form data
          })

        .then(res => { // then print response status
            console.log(res.statusText)
         })

    }

  render(){

  	return(
  		<div className="main-upload-container"> 
  			<h3 className="main-heading"> Upload an Image </h3>
        <form>
            <div className="form-group multi-preview">
                {(this.imageArray || []).map(url => (
                    <img key={url} src={url} style={{'maxWidth':'20vw', 'maxHeight':'30vh'}} alt="..." />
                ))}
            </div>

            <div className="form-group">
                <input type="file" className="form-control" onChange={this.uploadMultipleFiles} multiple />
            </div>
            <button type="button" className="btn" onClick={this.onSubmit}>Upload</button>
        </form >
  		</div>
  	)
  }
 }

