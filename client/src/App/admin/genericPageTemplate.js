import React, { Component } from 'react';
import axios from 'axios';
import { BackButton, UploadImage } from 'src/App/admin/helperComponents';
import { FaTrashAlt } from "react-icons/fa";  // Font Awesome
import PropTypes from "prop-types";
import ImageErrorCatch from 'src/App/pages/ImageErrorCatch';
const imageContext = require.context('../images', true);

export default class GenericPageTemplate extends Component {
	constructor(props){
		super(props)
		this.state ={
			create:props.createPage,
			title:"",
			paragraphs:[],
			images:[],
			imageLength:0,
			imageFiles:[],
			video:[],
			audio:[],
			audioLength:0,
			audioFiles:[],
			imageText:[],
			videoText:[],
			audioText:[],
			deletedImages:[],
			deletedAudio:[]
		};
		this.getPageData=this.getPageData.bind(this);
		this.onChange=this.onChange.bind(this);
		this.addParagraph=this.addParagraph.bind(this);
		this.addImage=this.addImage.bind(this);
		this.addAudio=this.addAudio.bind(this);
		this.addVideo=this.addVideo.bind(this);
		this.updateParagraph=this.updateParagraph.bind(this);
		this.updateImage=this.updateImage.bind(this);
		this.updateAudio=this.updateAudio.bind(this);
		this.updateVideo=this.updateVideo.bind(this);
		this.removeItem=this.removeItem.bind(this);
		this.updateImage=this.updateImage.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
	}


	componentDidMount(){
		if (!this.state.create){
			this.getPageData();
		} 
	}

    getPageData = () =>{
    	if (this.props.pageId){
	        axios.get('/api/getPage', { params: {pageId: this.props.pageId, pageType:"genericPage" } })
	        .then((response) => { 
	        	console.log(response.data);
		        this.setState({
		            title:response.data.title, 
		            paragraphs:response.data.paragraphs ? response.data.paragraphs : [],
		            images:response.data.imageNames ? response.data.imageNames: [],
		            imageLength:response.data.imageNames ? response.data.imageNames.length : 0,
		            audio:response.data.audioNames ? response.data.audioNames : [],
		            audioLength:response.data.audioNames ? response.data.audioNames.length : 0,
		            video:response.data.videoLinks ? response.data.videoLinks : [],
		            imageText:response.data.imageText ? response.data.imageText : [],
		            audioText:response.data.audioText ? response.data.audioText : [],
		            videoText:response.data.videoText ? response.data.videoText : []
	        	});
	        });
	    }
    }

	onChange(event){
		this.setState({[event.target.name]:event.target.value});
	}
	
	addParagraph(event){
	    var values = [...this.state.paragraphs];
		values.push(" ");
		this.setState({paragraphs:values});
	}

	addImage(event){
	    var values = [...this.state.images];
	   	var textValues = [...this.state.imageText];
	   	var fileValues = [...this.state.imageFiles];
	   	fileValues.push(null);
		values.push(" ");
		textValues.push("");
		this.setState({images:values, imageText:textValues, imageFiles:fileValues});
	}

	addAudio(event){
	    var values = [...this.state.audio];
	   	var textValues = [...this.state.audioText];
	   	var fileValues = [...this.state.audioFiles];
	   	fileValues.push(null);
		values.push(" ");
		textValues.push("");
		this.setState({audio:values, audioText:textValues, audioFiles:fileValues});
	}

	addVideo(event){
	    var values = [...this.state.video];
	   	var textValues = [...this.state.videoText];
		values.push(" ");
		textValues.push("");
		this.setState({video:values, videoText:textValues});
	}


	updateParagraph(index, field, value){
	    var values = [...this.state.paragraphs];
	    values[index]=value;
		this.setState({paragraphs:values});
	}

	updateImage(index, image, imageFile, text){
	    var values = [...this.state.images];
	    var fileValues = [...this.state.imageFiles];
	   	var textValues = [...this.state.imageText];
	    values[index]=image;
	    if (imageFile !== null){
	    	fileValues[index-this.state.imageLength]=imageFile;
	    }
	    textValues[index]=text;
		this.setState({images:values, imageText:textValues, imageFiles:fileValues});
	}

	updateAudio(index, audio, audioFile, text){
	    var values = [...this.state.audio];
	   	var fileValues = [...this.state.audioFiles];
	   	var textValues = [...this.state.audioText];
	    values[index]= audio;
	    if (audioFile !== null){
	    	fileValues[index-this.state.audioLength]=audioFile;
	    }
	    textValues[index]=text;
		this.setState({audio:values, audioText:textValues, audioFiles:fileValues});
	}

	updateVideo(index, video, text){
	    var values = [...this.state.video];
	   	var textValues = [...this.state.videoText];
	    values[index]=video;
	    textValues[index]=text;
		this.setState({video:values, videoText:textValues});
	}

	removeItem(index, type){
		var values;
		var textValues;
		var fileValues;
		var deletedValues;
		if (type==="paragraph"){
			values = [...this.state.paragraphs];
		    values.splice(index, 1);
		   	this.setState({paragraphs:values});
		} else if (type==="image"){
			values = [...this.state.images];
			fileValues = [...this.state.imageFiles];
	   		textValues = [...this.state.imageText];
	   		deletedValues = [...this.state.deletedImages];
	   		deletedValues.push(values[index]);
		    values.splice(index, 1);
		    if (index>=this.state.imageLength){
		    	fileValues.splice(index-this.state.imageLength, 1)
		    }
		    textValues.splice(index, 1);
		   	this.setState({images:values, imageText:textValues, imageFiles:fileValues, deletedImages:deletedValues});
		} else if (type==="audio"){
			values = [...this.state.audio];
	   		fileValues = [...this.state.audioFiles];
	   		textValues = [...this.state.audioText];
	   		deletedValues = [...this.state.deletedAudio];
	   		deletedValues.push(values[index]);
		    values.splice(index, 1);
		    if (index>=this.state.audioLength){
		    	fileValues.splice(index-this.state.audioLength, 1)
		    }		    
		    textValues.splice(index, 1);
		   	this.setState({audio:values, audioText:textValues, audioFiles:fileValues, deletedAudio:deletedValues});
		} else if (type==="video"){
			values = [...this.state.video];
	   		textValues = [...this.state.videoText];
		    values.splice(index, 1);
		    textValues.splice(index, 1);
		   	this.setState({video:values, videoText:textValues});
		} else {
			console.log("A problem occurred trying to remove a page item");
		}
	}

	onSubmit = () =>{
		const PostData={
			"title":this.state.title, 
			"paragraphs":this.state.paragraphs, 
			"images":this.state.images,
			"imageText":this.state.imageText,
			"audioNames":this.state.audio,
			"audioText":this.state.audioText,
			"videoLinks":this.state.video,
			"videoText":this.state.videoText,
			"deletedImages":this.state.deletedImages,
			"deletedAudio":this.state.deletedAudio
		};

		if (this.state.create){
			axios.post('/upload/uploadGenericPage', PostData).then((response)=>alert(response.data));
		} else {
			PostData._id=this.props.pageId;
			axios.post('/edit/editGenericPage', PostData).then((response)=>alert(response.data));
		}

		if (this.state.imageFiles.length>0){
			var imageFiles = new FormData();
			this.state.imageFiles.forEach(image=>imageFiles.append('file', image) );
			axios.post("/upload/uploadImages", imageFiles).then(res => { // then print response status
		        console.log(`Image upload for page returned: ${res.statusText}`);
		        axios.post("/upload/rebuild",{},{}); 
		    }).catch(err => console.log(err));
		}

		if (this.state.audioFiles.length>0){
			let audioData = new FormData();
			this.state.audioFiles.forEach(audioFile=>{ audioData.append('file', audioFile); });

			axios.post("/upload/uploadAudio", audioData).then(res => { // then print response status
		        console.log(`Audio upload for page returned: ${res.statusText}`);
		        axios.post("/upload/rebuild",{},{}); 
		    }).catch(err => console.log(err));
		}
	}

	render(){
		const create_paragraphs = this.state.paragraphs.map((paragraph, index) => 
				<ParagraphEdit key={ "paragraph"+index } text={paragraph} remove={this.removeItem} 
					num={index} update={ this.updateParagraph } 
				/>
	    );


		const create_images = this.state.images.map((image, index) => 
				<ImageEdit key={ "image"+index } imageName={image} text={this.state.imageText[index]} remove={this.removeItem} 
					num={index} update={ this.updateImage } 
				/>
	    );

		const create_audio = this.state.audio.map((audio, index) => 
				<AudioEdit key={ "audio"+index } audio={audio} text={this.state.audioText[index]} remove={this.removeItem} 
					num={index} update={ this.updateAudio } 
				/>
	    );

		const create_video = this.state.video.map((video, index) => 
				<VideoEdit key={ "video"+index } link={video} text={this.state.videoText[index]} remove={this.removeItem} 
					num={index} update={ this.updateVideo } 
				/>
	    );

		return(
			<div className="pageEditor">
				<BackButton backPage={this.props.backPage}/>
				<form className="pageForm">
					<div className='inputGroup'>
						<label className='inputLabel' htmlFor='title'>Page Title:</label>
						<input type='text' className='smallPageField' name='title' 
							value={this.state.title} 
							onChange={this.onChange}/>
					</div>

					<h3 className="editingTitle"> Paragraphs: </h3>

					{ create_paragraphs }

					<button type="button" className="button" onClick={this.addParagraph}> 
						+ New Paragraph 
					</button>
					<h3 className="editingTitle"> Images: </h3>

					{ create_images }

					<button type="button" className="button" onClick={this.addImage}> 
						+ New Image
					</button>

					<h3 className="editingTitle"> Audio: </h3>

					{ create_audio }

					<button type="button" className="button" onClick={this.addAudio}> 
						+ New Audio File
					</button>

					<h3 className="editingTitle"> Videos: </h3>

					{ create_video }

					<button type="button" className="button" onClick={this.addVideo}> 
						+ Embed New Video
					</button>					

					<div className="editSubmitButtons">
						<button type="button" className="editSubmitButton" onClick={this.onSubmit}> Upload Post  </button>
						<button type="button" className="editSubmitButton" onClick={this.props.backPage}>
							Cancel 
						</button>
					</div>
				</form>
			</div>
		)
	}
}

class ParagraphEdit extends Component {
	constructor(props){
		super(props);
		this.state = {
			text:this.props.text
		}
		this.updateParagraph=this.updateParagraph.bind(this);
		this.remove=this.remove.bind(this);
	}

	componentDidUpdate(prevProps) {
	  if (this.props.text !== prevProps.text) {
	    this.setState({text:this.props.text});
	  }
	}

	updateParagraph = (event) => {
		if(event){
			this.setState({[event.target.name]:event.target.value});
			this.props.update(this.props.num, event.target.name, event.target.value);
		} 
	}

	remove(){
		this.props.remove(this.props.num, "paragraph");
	}

	render(){

		return(
	 		<li className="blogParagraphEditing">

				<div className="paragraphInput">
					<textarea name="text" className="editingInput" value={this.state.text} placeholder="A new paragraph..." 
						onChange={this.updateParagraph}/>
				</div>
				
				<button type="button" name={this.props.num} className="tooltip trashButton" 
					onClick={this.remove}>
			    	<FaTrashAlt />
				    <span className="tooltiptext">Remove paragraph</span>
				</button>
			</li>
		)
	}
}

class ImageEdit extends Component {
	constructor(props){
		super(props);
		this.state = {
			imageName:this.props.imageName,
			imageFile:null,
			text:this.props.text
		}
		this.update=this.update.bind(this);
		this.updateImage=this.updateImage.bind(this);
		this.remove=this.remove.bind(this);
	}

	componentDidUpdate(prevProps) {
	  if (this.props.text !== prevProps.text) {
	    this.setState({text:this.props.text});
	  }
	  if (this.props.imageName !== prevProps.imageName) {
	    this.setState({imageName:this.props.imageName});
	  }
	}

	update = (event) => {
		if(event){
			this.setState({[event.target.name]:event.target.value});
			this.props.update(this.props.num, this.state.imageName, this.state.imageFile, event.target.value);
		} 
	}

	updateImage = (file, name) =>{
		this.setState({imageFile:file, imageName:name},
			()=>{ 
				this.props.update(this.props.num, name, file, this.state.text);
			}
		);
	}

	remove(){
		this.props.remove(this.props.num, "image");
	}

	render(){

		return(
	 		<li className="blogParagraphEditing">
	 			{
	 				this.state.imageName === " "
	 				? <div className="inputGroup">
							<UploadImage currentImage={this.state.imageName} changeImage={this.updateImage} />
						</div>
					: ( this.state.imageFile
						?  <img className="pageImage" src={URL.createObjectURL(this.state.imageFile)} description={""}/> 
						: <img className="pageImage" src={imageContext(`./${this.state.imageName}`)} description={""}/> 
					)
	 			}

				<div className="paragraphInput">
					<textarea name="text" className="editingInput" name="text" value={this.state.text} placeholder="A new paragraph..." 
						onChange={this.update}/>
				</div>
				<button type="button" name={this.props.num} className="tooltip trashButton" 
					onClick={this.remove}>
			    	<FaTrashAlt />
				    <span className="tooltiptext">Remove Image</span>
				</button>
			</li>
		)
	}
}

class AudioEdit extends Component {
	constructor(props){
		super(props);
		this.state = {
			audioName:this.props.audio,
			audioFile:null,
			text:this.props.text,
		}
		this.update=this.update.bind(this);
    	this.updateAudio = this.updateAudio.bind(this);
		this.remove=this.remove.bind(this);
	}

	componentDidUpdate(prevProps) {
	  if (this.props.text !== prevProps.text) {
	    this.setState({text:this.props.text});
	  }
	}

	update = (event) => {
		if(event){
			this.setState({[event.target.name]:event.target.value});
			this.props.update(this.props.num, this.state.audioName, this.state.audioFile, event.target.value);
		} 
	}

	updateAudio = (event) =>{
		const file = event.target.files[0];

		this.setState({audioFile:file, audioName:file.name},
			()=>{ 
				this.props.update(this.props.num, this.state.audioName, this.state.audioFile, this.state.text);
			}
		);
	}

	remove(){
		this.props.remove(this.props.num, "audio");
	}

	render(){
		return(
	 		<li className="blogParagraphEditing">
	 			{
	 				this.state.audioName === " "
	 				? <div className="inputGroup">
							<input type="file" name="audio" className="fileInput" 
              					onChange={this.updateAudio}/>
     					</div>

					: <div>{this.state.audioName}</div>
	 			}

				<div className="paragraphInput">
					<textarea name="text" className="editingInput" name="text" value={this.state.text} placeholder="A new paragraph..." 
						onChange={this.update}/>
				</div>
				<button type="button" name={this.props.num} className="tooltip trashButton" 
					onClick={this.remove}>
			    	<FaTrashAlt />
				    <span className="tooltiptext">Remove Audio</span>
				</button>
			</li>
		)
	}
}

class VideoEdit extends Component {
	constructor(props){
		super(props);
		this.state = {
			videoLink:this.props.link ? this.props.link : "",
			text:this.props.text
		}
		this.updateVideo=this.updateVideo.bind(this);
		this.remove=this.remove.bind(this);
	}

	componentDidUpdate(prevProps) {
	  if (this.props.text !== prevProps.text) {
	    this.setState({text:this.props.text});
	  }
	}

	remove(){
		this.props.remove(this.props.num, "video");
	}

	updateVideo = (event) => {
		if(event){
			this.setState({[event.target.name]:event.target.value}, ()=>{
				this.props.update(this.props.num, this.state.videoLink, this.state.text);
			});
		} 
	}

	render(){

		return(
	 		<li className="blogParagraphEditing">
				<div className="genericPageInput">
					<input type="text" className="editingInput" name="videoLink" value={this.state.videoLink} placeholder="Type link here..." 
						onChange={this.updateVideo}/>
				</div>
				<div className="genericPageInput">
					<textarea name="text" className="editingInput" name="text" value={this.state.text} placeholder="A new paragraph..." 
						onChange={this.updateVideo}/>
				</div>
				
				<button type="button" name={this.props.num} className="tooltip trashButton" 
					onClick={this.remove}>
			    	<FaTrashAlt />
				    <span className="tooltiptext">Remove paragraph</span>
				</button>
			</li>
		)
	}
}

