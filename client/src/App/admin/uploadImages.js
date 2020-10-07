// based on tutorial here: https://codeburst.io/image-uploading-using-react-and-node-to-get-the-images-up-c46ec11a7129
import React, { Component} from 'react';
import axios from 'axios';
import ImageEditor from "src/App/admin/imageEditor";
import ErrorBoundary from 'src/App/errorBoundary';
import { BackButton } from 'src/App/admin/helperComponents';
import {FaArrowDown} from "react-icons/fa";

export default class Contact extends Component {
  constructor(props) {
		super(props);
    this.state ={
      filesChosen:false,
      selectedFiles: [],
      imageData:[],
      imgURLs:[]
    };
    this.createImages = this.createImages.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.uploadImages = this.uploadImages.bind(this);
    this.returnToUserPanel=this.returnToUserPanel.bind(this);
  }

  shouldComponentUpdate () {
    if(this.state.filesChosen){
      return false 
    } else {
      return true
    }
  }

  returnToUserPanel(){
    this.props.history.push('/userPanel');
  }

  createImages(e) {
    this.setState({
      selectedFiles: Array.from(e.target.files),
    }, ()=> { 
      for (let i =0; i<this.state.selectedFiles.length;i++){
        this.addImage(URL.createObjectURL(this.state.selectedFiles[i]), this.state.selectedFiles[i].name);
      }
    });
  }

  addImage = (link, fileName) => {
    let urls=this.state.imgURLs;
    urls.push(link);
    this.setState({imgURLs: urls})
      const values = this.state.imageData;
      values.push({
          fileName:fileName,
          title:fileName,
          date:'',
          size:'',
          medium:'',
          availability:'',
          price:'',
          portfolio:'',
          isChanged:true,
        });

      this.setState({imageData:values}, ()=>{
        if (this.state.imageData.length===this.state.selectedFiles.length) {
          this.setState({filesChosen:true});
        }
      });
  };

  removeImage = (index) => {
    let files = this.state.selectedFiles;
    files.splice(index, 1);
    this.setState({selectedFiles:files});
  };

  uploadImages(images) {
    const data = new FormData();
    for(var x = 0; x<this.state.selectedFiles.length; x++) {
        data.append('file', this.state.selectedFiles[x])
    }

    axios.post("/upload/uploadImages", data, { 
          // receive two    parameter endpoint url ,form data
    }).then(res => { // then print response status
      console.log(`Image upload returned: ${res.statusText}`)
      axios.post("/upload/storeImagesInDB", images, { 
            // receive two    parameter endpoint url ,form data
      }).then(res => { // then print response status
          console.log(`Storing images in database returned: ${res.statusText}`)
      }).catch(err => console.log("Storing images in database returned the error: "+err));

    }).catch(err => {alert("Uploading these images caused a problem. This is likely because your image size is too large. Image max size is 4mb"); console.log("Uploading images returned the error: "+err)});

  }

  render(){
    if(this.state.filesChosen)
    {
      return(        
        <ErrorBoundary >
          <ImageEditor imageURLs={this.state.imgURLs} 
            images={this.state.imageData} 
            removeImageFromParent={this.removeImage} 
            backPage={()=>this.props.history.push('/userPanel')}
            onSubmit={this.uploadImages}
            {...this.props}/>
        </ErrorBoundary>
      )
    } else {
      return(
        <div className="pageEditor main-upload-container"> 
          <BackButton backPage={this.returnToUserPanel}/>
          <div className="imageUploadContainer">
            <h3 className="pageHeader"> Upload Image(s) </h3>
            <div name="imageUploader" className="imageUploader">
                <input type="file" className="form-control" onChange={this.createImages} multiple />
            </div>
            <label htmlFor="imageUploader"> <FaArrowDown className="uploadArrow"/></label>
          </div>
        </div>
      )
    }
  }
 }

