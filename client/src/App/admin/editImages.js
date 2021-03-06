import React, { Component} from 'react';
import axios from 'axios';
import ImageEditor from "src/App/admin/imageEditor";
import ErrorBoundary from 'src/App/errorBoundary';
const images = require.context('../images', true);

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
		  		try{
		  			values.push(images(`./${image.fileName}`));
		  		} catch (error) {
					values.push(images("./defaultImage.png"));
		  			console.log("Could not load image "+image.fileName)
		  			console.log("Error: "+error);
		  		}
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

	onSubmit(images, boolFlag){
		axios.post("/edit/editImages", images, { 

	    }).then(res => { 
	        alert(res.data)
	    }).catch(err => console.log(err));
	    
	    if (this.state.deletedImages){
			axios.post("/remove/removeImages", this.state.deletedImages, {}).then(res => { // then print response status
	        	console.log(`Deleteing images from database returned: ${res.statusText}`)
	    	}).catch(err => console.log(err));
	    }
	    
	}

	render(){
		if (this.state.images.length>0){
			return(
	    		<ErrorBoundary>
	    			<div className="pageEditor">
			    		<ImageEditor imageURLs={this.state.imgURLs} 
				    		images={this.state.images} 
				    		removeImageFromParent={this.removeImage} 
				    		backPage={()=>this.props.history.push('/userPanel')}
				    		onSubmit={this.onSubmit}
				    		{...this.props}/>
				    </div>
			    </ErrorBoundary>
			)
		} else {
			return <h3>No Images to Edit</h3>
		}
	
	}
 }










