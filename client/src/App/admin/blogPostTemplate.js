import React, { Component } from 'react';
import axios from 'axios';
import { BackButton, UploadImage } from 'src/App/admin/helperComponents';
import { FaTrashAlt } from "react-icons/fa";  // Font Awesome
import PropTypes from "prop-types";

export default class BlogPostTemplate extends Component {
	constructor(props){
		super(props)
		this.state ={
			create:props.create,
			id:props.id,
			title:props.title,
			blurb:props.blurb,
			imgName:props.imgName,
			imageFile:props.imageFile,
			paragraphs:props.paragraphs,
			date: props.date ? props.date : new Date().toLocaleDateString()
		};
		this.onChange=this.onChange.bind(this);
		this.addParagraph=this.addParagraph.bind(this);
		this.updateParagraph=this.updateParagraph.bind(this);
		this.removeParagraph=this.removeParagraph.bind(this);
		this.updateImage=this.updateImage.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
	}

	onChange(event){
		this.setState({[event.target.name]:event.target.value});
	}
	
	addParagraph(event){
	    const values = [...this.state.paragraphs];
		values.push(" ");
		this.setState({paragraphs:values});
	}

	updateParagraph(index, field, value){
	    const values = [...this.state.paragraphs];
	    values[index]=value;
		this.setState({paragraphs:values});
	}

	removeParagraph(index){
	    const values = [...this.state.paragraphs];
	    values.splice(index, 1);
	    for (var i=index; i<values.length; i++)	{
	    	values[i].num=values[i].num-1;
	    }
	   	this.setState({paragraphs:values});
	}

	updateImage = (file, name) =>{

		this.setState({imgName:name});
		this.setState({imageFile:file});
	}

	onSubmit = () =>{
		const PostData={"title":this.state.title, "blurb":this.state.blurb, "date":this.state.date, 
							"paragraphs":this.state.paragraphs, "imgName":this.state.imgName, "num":this.props.num, "id":this.props.id };
		if (this.state.create === "create"){
			axios.post('/upload/uploadBlogPost', PostData).then((response)=>alert(response.data));
		} else {
			PostData._id=this.state.id;
			axios.post('/edit/editBlogPost', PostData).then((response)=>alert(response.data));
		}
		if (this.state.imgName){
			var imageFiles = new FormData();
			imageFiles.append('file', this.state.imageFile);
			axios.post("/upload/uploadImages", imageFiles).then(res => { // then print response status
		        console.log(`Image upload for page returned: ${res.statusText}`);
		        axios.post("/upload/rebuild",{},{}); 
		    }).catch(err => console.log(err));
		}
	}

	render(){
		const create_paragraphs = this.state.paragraphs.map((paragraph, index) => 
				<Paragraph key={ index } text={paragraph} remove={this.removeParagraph} 
					num={index} updateParagraph={ this.updateParagraph } removeParagraph={ this.removeParagraph }
				/>
	    );
		return(
			<div className="pageEditor">
				<BackButton backPage={this.props.backPage}/>
				<form className="pageForm">
					<div className='inputGroup'>
						<label className='inputLabel' htmlFor='title'>Post Title:</label>
						<input type='text' className='smallPageField' name='title' 
							value={this.state.title} 
							onChange={this.onChange}/>
					</div>
					<div className='inputGroup'>
						<label className='inputLabel' htmlFor='blurb'>Blurb:</label>
						<input type='text' className='smallPageField' name='blurb' 
							value={this.state.blurb} 
							onChange={this.onChange}/>
					</div>
					<div className="inputGroup">
						<UploadImage currentImage={this.state.imgName} changeImage={this.updateImage} />
					</div>
					{ create_paragraphs }
					<button type="button" className="button" onClick={this.addParagraph}> 
						+ New Paragraph 
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

class Paragraph extends Component {
	constructor(props){
		super(props);
		this.state = {
			text:this.props.text,
		}
		this.onChange=this.onChange.bind(this);
	}

	onChange(event){
		this.setState({[event.target.name]:event.target.value});
	}

	updateParagraph = (event) => {
		if(event){
			this.setState({"text":event.target.value})
			this.props.updateParagraph(this.props.num, event.target.name, event.target.value);
		} 
	}

	render(){

		return(
	 		<li className="blogParagraphEditing">

				<div className="paragraphInput">
					<textarea name="text" className="editingInput" value={this.state.text} placeholder="A new paragraph..." 
						onChange={this.updateParagraph}/>
				</div>
				
				<button type="button" name={this.props.num} className="tooltip trashButton" 
					onClick={index=>this.props.removeParagraph(this.props.num)}>
			    	<FaTrashAlt />
				    <span className="tooltiptext">Remove paragraph</span>
				</button>
			</li>
		)
	}
}


