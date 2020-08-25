import React, { Component} from 'react';
import axios from 'axios';
import { FaTrashAlt } from "react-icons/fa";  // Font Awesome
import ImageEditor from "App/securePages/imageEditor";
const images = require.context('App/upload', true);

export default class Contact extends Component {
	constructor(props) {
		super(props);
		this.state ={
			images: [],
			imgURLs:[],
			deletedImages:[],
			finishedLoadingImages: false
		};
		this.loadImages = this.loadImages.bind(this);
		this.removeImage=this.removeImage.bind(this);
		this.onSubmit=this.onSubmit.bind(this);

   	}

   	shouldComponentUpdate () {
	    return !((this.state.imgURLs.length===this.state.images.length) && this.state.finishedLoadingImages);
	}

	componentDidMount(){
		this.loadImages();
	}

	loadImages(){
		/* fetch all images from database */
		axios.get('/image/getAll')
		  .then((response) => {
		  	this.setState({images:response.data});
		  	let values=this.state.imgURLs;
		  	response.data.forEach((image, index)=>{
		  		values.push(images(`./${image.fileName}`));
		  	})
		  	this.setState({imgURLs:values, finishedLoadingImages:true})
		});
	}

	removeImage = (index) => {
		let deleted=this.state.deletedImages;
		deleted.push(this.state.images[index].fileName);
		this.setState({deletedImages:deleted});

		let values = this.state.images;
		values.splice(index, 1);
		this.setState({images:values});
	};

	onSubmit(images){
		axios.post("/edit/editImages", images, { 
	          // receive two    parameter endpoint url ,form data
	    }).then(res => { // then print response status
	        console.log(`Updating images in database returned: ${res.statusText}`)
	    }).catch(err => console.log(err));

	    axios.post("/remove/removeImages", this.state.deletedImages, {}).then(res => { // then print response status
	        console.log(`Deleteing images from database returned: ${res.statusText}`)
	    }).catch(err => console.log(err));
	}

	render(){
		if (this.state.images.length>0){
			return(
		    	<ImageEditor imageURLs={this.state.imgURLs} 
		    		images={this.state.images} 
		    		removeImageFromParent={this.removeImage} 
		    		onSubmit={this.onSubmit}/>
			)	
		} else {
			return <h3> No Images to Edit </h3>;
		}

	}
 }










