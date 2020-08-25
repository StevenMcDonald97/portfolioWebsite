import React, { Component } from 'react';
import axios from 'axios';
import { FaTrashAlt } from "react-icons/fa";  // Font Awesome

export default class ImageEditor extends Component {
	constructor(props) {
		super(props);
		this.state ={
			images:this.props.images,
			imageURLs:this.props.imageURLs
		};

		this.removeImage = this.removeImage.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
   	}

	removeImage = (index) => {
		console.log(index);
		if(index > -1){
			let values = [...this.state.images];
			values.splice(index, 1);
			this.setState({images:values});
			let urls = this.state.imageURLs;
			urls.splice(index, 1);
			this.setState({imageURLs:urls});
			this.props.removeImageFromParent(index);
		}
	};


	handleInputChange = (index, event) => {
	    const values = [...this.state.images];
	    values[index][event.target.name]=event.target.value;
	    this.setState({images:values});
	};


	onSubmit() {
		this.props.onSubmit(this.state.images);
	}

    render(){
    	if (this.state.imageURLs.length>0){

	    	return(
	    		<div>
					{(this.state.images).map((img, index) => (
			            <div className="editImageTag" key={img.fileName}>
			              <img className="editImageTag" src={this.state.imageURLs[index]} className="uploadImage" alt="..."/>
			              <input type="text" className="imageField" name="title" value={ img.title } placeholder="Title" onChange={event => this.handleInputChange(index, event)} />
			              <input type="text" className="imageSmallField" name="date" value={ img.date } placeholder="Date" onChange={event => this.handleInputChange(index, event)} />
			              <input type="text" className="imageSmallField" name="medium" value={ img.medium } placeholder="Medium" onChange={event => this.handleInputChange(index, event)} />
			              <input type="text" className="imageSmallField" name="size" value={ img.size } placeholder="Size" onChange={event => this.handleInputChange(index, event)} />
			              <input type="text" className="imageSmallField" name="price" value={ img.price } placeholder="Price" onChange={event => this.handleInputChange(index, event)} />
			              <select className="imageField" name="availability" value={img.availability} onChange={event => this.handleInputChange(index, event)}>            
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
			return <h3> No Images to Edit </h3>;
		}
    }
}
