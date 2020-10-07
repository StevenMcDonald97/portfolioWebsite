import React, { Component } from 'react';
import axios from 'axios';
import { BackButton, ImageCheckBox } from 'src/App/admin/helperComponents';
import PropTypes from 'prop-types';
import ImageErrorCatch from 'src/App/pages/ImageErrorCatch';
import { FaTrashAlt } from "react-icons/fa";  // Font Awesome

export default class HomePageTemplate extends Component{
	constructor(props){
		super(props)
		this.state ={
			type:'',
			images:[],
			name:'',
			subHeader:'',
			imageLinks:'',
			pageInfo:[],
			allImages:[]
		}
		this.selectType=this.selectType.bind(this);
		this.addImage=this.addImage.bind(this);
		this.addMainImage=this.addMainImage.bind(this);
		this.updateLink=this.updateLink.bind(this);
		this.removeImage=this.removeImage.bind(this);
		this.imageSelect=this.imageSelect.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
	}

	componentDidMount(){
        axios.get('/api/getHomePage')
        .then((response) => {
          this.setState({
          	type:response.data.type,
            name:response.data.name, 
            images:response.data.images, 
            imageLinks:response.data.imageLinks,
            subHeader:response.data.subHeader, 
            });
        });
		axios.get('/api/getPageInfo').then((response) => {
	      this.setState({pageInfo:response.data});
	    });
		axios.get('/image/getAll')
		  .then((response) => {
		  	this.setState({allImages:response.data})
		  });
	}

	handleChange = (event) => {
		this.setState({[event.target.name]:event.target.value})
	}


	addImage(imageName){
		if (this.state.images.length<10){
			const values = [...this.state.images];
 			const textValues = [...this.state.imageLinks];
			values.push(imageName);
			textValues.push('None');
			this.setState({images:values, imageLinks:textValues});

		} else {
			alert("You can only have a max of 10 images in the slideshow");
		}
	}

	addMainImage(imageName){
		const values = [...this.state.images];
		values[0] = imageName;
		this.setState({images:values});		
	}

	updateLink(index, text){
 		const textValues = [...this.state.imageLinks];
 		textValues[index]=text;
		this.setState({imageLinks:textValues});
	}

	removeImage(imageName){
 		const values = [...this.state.images];
 		const textValues = [...this.state.imageLinks];
 		const index = values.indexOf(imageName);
		values.splice(index,1);
		textValues.splice(index, 1);
		this.setState({images:values, imageLinks:textValues});
	}

	onSubmit(){
		const {allImages, pageInfo, ...PageData}=this.state;
		axios.post('/edit/editHomePage', PageData);
		alert("Updated Homepage")
		// this.props.history.push('/userPanel');
	}

	selectType(){
		return(
			<div className="inputGroup">
				<label className='inputLabel home' htmlFor='type'>Choose your homepage style:</label>
				<select name='type' className='homePageSelect' value={this.state.type} onChange={this.handleChange}>
					<option value='simpleImage'>Simple Image</option>
					<option value='panoramic'>Panoramic</option>
					<option value='fullScreen'>Full Screen Image</option>
					<option value='slideShow'>Slide Show</option>
					<option value='options'>Options</option>
				</select>
			</div>
		)
	}

	imageSelect(addImage, removeImage){
		return(
			<div className="imageEditSelection">
				 { this.state.allImages.length !== 0 ? this.state.allImages.map((image) =>(
						<ImageCheckBox 
							key={image._id}
							checked={this.state.images.includes(image.fileName)}
							image={image} 
							images={this.state.images}
							addToPage={addImage}
							removeFromPage={removeImage}
						/>
					)
				) : <div> Go to Add Images to upload images to your site </div>}
			 </div>
		)
	}

	render() {
		if (this.state.type==="slideShow") {
			return(
				<div className='pageEditor'>
					<form className='pageForm'>
						<BackButton backPage={this.props.backPage}/>
						
						{ this.selectType() }
						
						<div className='inputGroup'>
							<label className='inputLabel' htmlFor='name'>Your Name:</label>
							<input type='text' className='smallPageField' name='name' 
								value={this.state.name || ''} 
								onChange={this.handleChange}/>
						</div>
						<div className='inputGroup'>
							<label className='inputLabel' htmlFor='subHeader'>Tagline: </label>
							<textarea className='pageField' name='subHeader' 
								value={this.state.subHeader} 
								onChange={this.handleChange} />
						</div>
						<div className='inputGroup'>
							<h3 className="editSubHeader">Choose images for your homepage slideshow (up to 10): </h3>
							{ this.imageSelect(this.addImage, this.removeImage) }
						</div>
						<div className='editSubmitButtons'>
							<button type='button' className='editSubmitButton' onClick={this.onSubmit}> Submit </button>
							<button type='button' className='editSubmitButton' onClick={this.props.backPage}> 
								Cancel 
							</button>
						</div>
					</form>
				</div>
			)
		} else if (this.state.type==="options") {
			return(
				<div className='pageEditor'>
					<form className='pageForm'>
						<BackButton backPage={this.props.backPage}/>
						
						{ this.selectType() }
						
						<div className='inputGroup'>
							<label className='inputLabel' htmlFor='name'>Your Name:</label>
							<input type='text' className='smallPageField' name='name' 
								value={this.state.name || ''} 
								onChange={this.handleChange}/>
						</div>
						<div className='inputGroup'>
							<label className='inputLabel' htmlFor='subHeader'>Tagline: </label>
							<textarea className='pageField' name='subHeader' 
								value={this.state.subHeader} 
								onChange={this.handleChange} />
						</div>
						<div>
							{this.state.images.map((image, index)=>
								<HomeObjectEditor key={image} image={image} index={index} link={this.state.imageLinks[index]} pages={this.state.pageInfo} updateHomeLink={this.updateLink} removeHomeObject={this.removeImage}/>
							)}
						</div>
						<div className='inputGroup'>
							<div className='inputLabel'>Choose Images to Show:</div>
							{ this.imageSelect(this.addImage, this.removeImage) }
						</div>		
						<div className='editSubmitButtons'>
							<button type='button' className='editSubmitButton' onClick={this.onSubmit}> Submit </button>
							<button type='button' className='editSubmitButton' onClick={this.props.backPage}> 
								Cancel 
							</button>
						</div>
					</form>
				</div>
			)
		} else {
			return(
				<div className='pageEditor'>
					<form className='pageForm'>
						<BackButton backPage={this.props.backPage}/>
						
						{ this.selectType() }
						
						<div className='inputGroup'>
							<label className='inputLabel' htmlFor='name'>Your Name:</label>
							<input type='text' className='smallPageField' name='name' 
								value={this.state.name || ''} 
								onChange={this.handleChange}/>
						</div>
						<div className='inputGroup'>
							<label className='inputLabel' htmlFor='subHeader'>Tagline: </label>
							<textarea className='pageField' name='subHeader' 
								value={this.state.subHeader} 
								onChange={this.handleChange} />
						</div>
						<div className='inputGroup'>
							<div className='inputLabel'>Home Page Picture:</div>
							{ this.imageSelect(this.addMainImage, this.removeImage) }
						</div>						
						<div className='editSubmitButtons'>
							<button type='button' className='editSubmitButton' onClick={this.onSubmit}> Submit </button>
							<button type='button' className='editSubmitButton' onClick={this.props.backPage}> 
								Cancel 
							</button>
						</div>
					</form>
				</div>
			)
		}
	}
}

HomePageTemplate.propTypes ={
	backPage:PropTypes.func
}

class HomeObjectEditor extends Component {
	constructor(props){
		super(props);
		this.state={
			image:this.props.image,
			link:this.props.link
		}
		this.updateObject=this.updateObject.bind(this);
		this.removeObject=this.removeObject.bind(this);
	}

	updateObject = (event) =>{
		if(event){
			this.setState({[event.target.name]:event.target.value})
			this.props.updateHomeLink(this.props.index, event.target.value);
		}
	}

	removeObject = () => {
		this.props.removeHomeObject(this.state.image);
	}


	render(){ 
		return(
	 		<li className="homeEditingObject">
	 			<div className="homeInputGroup">
					<ImageErrorCatch src={this.state.image} imgClass="homeEditingImage" />
				</div>
				<div className="homeInputGroup">
					<select name='type' className='pageSelect' value={this.state.page} onChange={this.updateObject}>
						<option value='none'>None</option>
						{ this.props.pages.map((page)=>
							<option key={page.title} value={page.title}>{page.title}</option>
						)}
					</select>
				</div>	
				<div className="homeInputGroup">
					<button type="button" name={this.props.index} className="tooltip trashButton home" 
						onClick={this.removeObject}>
				    	<FaTrashAlt />
					    <span className="tooltiptext">Remove this</span>
					</button>
				</div>
			</li>
		)
	}
}



// /*create a component for each image to enable adding and removing from the homepage*/
// function ImageCheckBox(props) {
// 	const [checked, setChecked] = useState(props.images.includes(props.imageName));
//   	const toggle = React.useCallback(() => {
//   		setChecked(!checked);
//   		if (!checked) {
//   			props.addToPage(props.image.fileName)
//   		} else {
//   			props.removeFromPage(props.image.fileName)
//   		}
//   	});


// 	return (			  
// 		<div className="imageSelection">
// 			<input type="checkbox" name={props.image.fileName} checked={checked} 
// 				onChange={toggle}/>
// 			<ImageErrorCatch src={`./${props.image.fileName}`}/>
// 		</div>
// 	)
	    
// }
