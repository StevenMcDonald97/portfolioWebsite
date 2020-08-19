import React, { Component } from 'react';
import axios from 'axios';
import { FaTrashAlt } from "react-icons/fa";  // Font Awesome

export default class ImageEditor extends Component {
	imageObj=[];
	imageURLs=[];
	// image data is stored both in state and in a global variable 
	// to avoid complications from state updating asynchronously 
	imageNonStateData=[];

	constructor(props) {
		super(props);
		this.state ={
			selectedFiles:props.selectedFiles,
			imageData:[]
		};

		this.imageObj=this.imageObj.concat(props.selectedFiles);

		this.addImage = this.addImage.bind(this);
		this.removeImage = this.removeImage.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
   	}

   	componentDidMount() {
	    for (let i = 0; i < this.imageObj.length; i++) {
	        this.addImage(URL.createObjectURL(this.imageObj[i]), this.imageObj[i].name)
	    }
   	}

   	addImage = (link, fileName) => {
	    this.imageURLs.push(link)
	    const values = [...this.imageNonStateData];
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
	    this.imageNonStateData=values;
	    this.setState({imageData:values});
	};

	removeImage = (index) => {
	    if(index > -1){
	      const values = [...this.imageNonStateData];
	      values.splice(index, 1);
	      this.imageNonStateData=values;
	      this.setState({imageData:values});
	      
	      const newFiles = this.state.selectedFiles.splice(index, 1);
	      this.setState({selectedFiles: newFiles})
	      this.imageObj.splice(index, 1);
	      this.imageURLs.splice(index, 1);
	    }
	};

	handleInputChange = (index, event) => {
	    const values = [...this.imageNonStateData];
	    values[index][event.target.name]=event.target.value;

	    // if (event.target.name === "title") {
	    //   values[index].title = event.target.value;
	    // } else if (event.target.name === "date") {
	    //   values[index].date = event.target.value;
	    // } else if (event.target.name === "size") {
	    //   values[index].size = event.target.value;
	    // } else if (event.target.name === "medium") {
	    //   values[index].medium = event.target.value;
	    // } else if (event.target.name === "availability") {
	    //   values[index].availability = event.target.value;
	    // } else if (event.target.name === "price") {
	    //   values[index].price = event.target.value;
	    // } else {
	    //   values[index].portfolio = event.target.value;
	    // }
	    this.imageNonStateData=values;
	    this.setState({imageData:values});
	  };

	onSubmit(e) {
		const data = new FormData();
		   for(var x = 0; x<this.imageObj.length; x++) {
		       data.append('file', this.imageObj[x])
		}

		axios.post("/upload/uploadImages", data, { 
		      // receive two    parameter endpoint url ,form data
		}).then(res => { // then print response status
		    console.log(`Image upload returned: ${res.statusText}`)

		}).catch(err => console.log(err));

		axios.post("/upload/storeImagesInDB", this.state.imageData, { 
		      // receive two    parameter endpoint url ,form data
		}).then(res => { // then print response status
		    console.log(`Storing iamges in database returned: ${res.statusText}`)
		}).catch(err => console.log(err));
	}

    render(){
    	if (this.imageURLs.length>0){
	    	return(
	    		<div>
					{(this.state.imageData).map((img, index) => (
			            <div className="editImageTag" key={`${this.imageURLs[index]}~${index}`}>
			              <img className="editImageTag" src={this.imageURLs[index]} className="uploadImage" alt="..."/>
			              <input type="text" className="imageField" name="title" value={ img.title.replace(/\s+/g, '') } placeholder="Title" onChange={event => this.handleInputChange(index, event)} />
			              <input type="text" className="imageSmallField" name="date" value={ img.date } placeholder="Date" onChange={event => this.handleInputChange(index, event)} />
			              <input type="text" className="imageSmallField" name="medium" value={ img.medium } placeholder="Medium" onChange={event => this.handleInputChange(index, event)} />
			              <input type="text" className="imageSmallField" name="size" value={ img.size } placeholder="Size" onChange={event => this.handleInputChange(index, event)} />
			              <input type="text" className="imageSmallField" name="price" value={ img.price } placeholder="Price" onChange={event => this.handleInputChange(index, event)} />
			              <select className="imageField" name="availability" value={img.availability} onChange={this.handleInputChange}>            
			                <option value="forSale">For Sale</option>
			                <option value="notForSale">Not For Sale</option>
			                <option value="sold">Sold</option>
			                <option value="other">Not Applicable</option>
			              </select>
			              <button type="button" className="tooltip btn" onClick={()=>this.removeImage(index)}>
			                <FaTrashAlt />
			                <span className="tooltiptext">Remove this Image</span>
			              </button>
			            </div>
			          ))}
			            <button type="button" className="btn">Cancel</button>
			           <button type="button" className="btn" onClick={this.onSubmit}>Upload</button>

			    </div>
			);
		} else {
			return null;
		}
    }
}
