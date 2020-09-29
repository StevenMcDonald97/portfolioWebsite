import React, { Component } from 'react';
import axios from 'axios';
import { BackButton, UploadImage } from 'App/admin/helperComponents';
import { FaTrashAlt } from "react-icons/fa";  // Font Awesome
import PropTypes from "prop-types";

export default class ListPageTemplate extends Component {
	constructor(props){
		super(props)
		this.state ={
			type:this.props.pageType,
			title:"",
			numObjs:0,
			listObjects:[],
			createPage:this.props.createPage,
			deleted:[]
		}
		this.onChange=this.onChange.bind(this);
		this.getPageData=this.getPageData.bind(this);
		this.addPageObject=this.addPageObject.bind(this);
		this.updatePageObject=this.updatePageObject.bind(this);
		this.removePageObject=this.removePageObject.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
	}

	onChange(event){
		this.setState({[event.target.name]:event.target.value});
	}
	
	componentDidMount(){
		this.getPageData();
	}

    getPageData = () =>{
    	if (this.props.pageId){
	        axios.get('/api/getPage', { params: {pageId: this.props.pageId, pageType:"list" } })
	        .then((response) => {
	          this.setState({
	            title:response.data.title, 
	            type:response.data.type, 
	           	listObjects:response.data.childObjects, 
	           	numObjs:response.data.childObjects.length
	            });
	        });
	    }
    }

	addPageObject(event){
	    const values = [...this.state.listObjects];
		values.push({"title":"", "blurb":"", "imgName":"defaultImage.png", "description":"", 
			keyValue:new Date().getTime(), num:this.state.numObjs});
		this.setState({listObjects:values}, 
			()=>this.setState({numObjs:this.state.numObjs+1}));
	}

	updatePageObject(index, field, value){
	    const values = [...this.state.listObjects];
	    values[index][field]=value;
		this.setState({listObjects:values});
	}

	removePageObject(index){
	    const values = [...this.state.listObjects];
	    const deletedObjs = [...this.state.deleted];
	    deletedObjs.push(values[index]._id);

	    values.splice(index, 1);
	    for (var i=index; i<values.length; i++)	{
	    	values[i].num=values[i].num-1;
	    }

	   	this.setState({numObjs:this.state.numObjs-1},
	   		()=>this.setState({listObjects:values, deleted:deletedObjs}));
	}

	onSubmit(){
		var imageFiles = new FormData();
		var listObjects = this.state.listObjects;
		listObjects.forEach((obj, index, objects)=>{
			imageFiles.append('file', obj.imageFile);
			delete objects[index].imageFile;
		});

	    axios.post("/upload/uploadImages", imageFiles).then(res => { // then print response status
	        console.log(`Image upload for page returned: ${res.statusText}`)
	    }).catch(err => console.log(err));

		const PageData={"type":this.state.type, "title":this.state.type, "text":"",
			"objs":listObjects, "deleted":this.state.deleted, "id":this.props.pageId};
		if (this.state.createPage) { 
			axios.post('/upload/uploadListPage', PageData).then((response)=>alert(response.data));
		} else {
			axios.post('/edit/editListPage', PageData).then((response)=>console.log(response));
		};
	}

	render(){
		const create_inputs = this.state.listObjects.map((obj, index) => 
		     	<ListObjectEditor key={obj._id ? obj._id : obj.keyValue} image={obj.imgName} num={obj.num} 
		     		title={this.state.listObjects[index].title} 
		     		blurb={this.state.listObjects[index].blurb}
		     		description={this.state.listObjects[index].description}
		     		updatePageObject={this.updatePageObject}
		     		removePageObject={this.removePageObject}
		     	/>
		     
	    );

		return(
		<div className="pageEditor">
			<BackButton backPage={this.props.backPage}/>
			<form className="pageForm">
				{ create_inputs }
				<button type="button" className="button" onClick={this.addPageObject}> 
					Add new {this.props.pageType} 
				</button>
				<div className="editSubmitButtons">
					<button type="button" className="editSubmitButton" onClick={this.onSubmit}> Submit </button>
					<button type="button" className="editSubmitButton" onClick={this.props.backPage}>
						Cancel 
					</button>
				</div>
			</form>
		</div>)
	}
}

ListPageTemplate.propTypes = {
	pageId:PropTypes.string,
	cratePage:PropTypes.string,
	pageType:PropTypes.string,
	backPage:PropTypes.func.isRequired
}


class ListObjectEditor extends Component {
	constructor(props){
		super(props);
		this.state={
			image:this.props.image,
			title:this.props.title,
			blurb:this.props.blurb,
			description:this.props.description
		}
		this.updateImage=this.updateImage.bind(this);
		this.updateObject=this.updateObject.bind(this);
	}

	updateImage = (file, name) =>{
		this.setState({image:name});
		this.props.updatePageObject(this.props.num, "imgName", name);
		this.props.updatePageObject(this.props.num, "imageFile", file);
	}

	updateObject = (event) =>{
		if(event){
			this.setState({[event.target.name]:event.target.value})
			this.props.updatePageObject(this.props.num, event.target.name, event.target.value);
		}
	}

	render(){

		return(
	 		<li className="pageEditingObject">
	 			<div className="inputGroup">
					<UploadImage currentImage={this.state.image} changeImage={this.updateImage} />
				</div>
				<div className="inputGroup">
					<input type="text" name="title" className="editingInput" value={this.state.title} placeholder="Title" 
						onChange={this.updateObject}/>
				</div>
				<div className="inputGroup">
					<input type="text" name="blurb" className="editingInput" value={this.state.blurb} placeholder="SubTitle" 
						onChange={this.updateObject}/>
				</div>				
				<div className="inputGroup">
					<textarea name="description" className="editingInput descriptionInput" value={this.state.description} placeholder="Description" 
						onChange={this.updateObject}/>
				</div>
				<button type="button" name={this.props.num} className="tooltip trashButton" 
					onClick={index=>this.props.removePageObject(this.props.num)}>
			    	<FaTrashAlt />
				    <span className="tooltiptext">Remove this</span>
				</button>
			</li>
		)
	}
}

ListObjectEditor.propTypes = {
	num:PropTypes.number,
	title:PropTypes.string,
	blurb:PropTypes.string,
	description:PropTypes.string,
	removePageObject:PropTypes.func
}
