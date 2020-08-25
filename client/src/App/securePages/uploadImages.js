// based on tutorial here: https://codeburst.io/image-uploading-using-react-and-node-to-get-the-images-up-c46ec11a7129
import React, { Component} from 'react';
import axios from 'axios';
import { FaTrashAlt } from "react-icons/fa";  // Font Awesome
import ImageEditor from "App/securePages/imageEditor";

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
  }

  shouldComponentUpdate () {
    if(this.state.filesChosen){
      return false 
    } else {
      return true
    }
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
          title:'',
          date:'',
          size:'',
          medium:'',
          availability:'',
          price:'',
          portfolio:''
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
    console.log(data);
    axios.post("/upload/uploadImages", data, { 
          // receive two    parameter endpoint url ,form data
    }).then(res => { // then print response status
        console.log(`Image upload returned: ${res.statusText}`)

    }).catch(err => console.log(err));

    axios.post("/upload/storeImagesInDB", images, { 
          // receive two    parameter endpoint url ,form data
    }).then(res => { // then print response status
        console.log(`Storing images in database returned: ${res.statusText}`)
    }).catch(err => console.log(err));
  }

  render(){
    if(this.state.filesChosen)
    {
      return(        
        <ImageEditor imageURLs={this.state.imgURLs} 
          images={this.state.imageData} 
          removeImageFromParent={this.removeImage} 
          onSubmit={this.uploadImages}/>
      )
    } else {
      return(
        <div className="main-upload-container"> 
          <h3 className="main-heading"> Upload an Image </h3>
          <div className="form-group">
              <input type="file" className="form-control" onChange={this.createImages} multiple />
          </div>
        </div>
      )
    }
  }
 }

