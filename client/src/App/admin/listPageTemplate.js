import React, { Component } from 'react';
import axios from 'axios';
import { BackButton, UploadImage } from 'App/admin/helperComponents';
import { FaTrashAlt } from "react-icons/fa";  // Font Awesome
import defaultImage from "App/admin/exampleImages/defaultImage.png";
import PropTypes from "prop-types";

export default class ListPageTemplate extends Component {
	constructor(props){
		super(props)
		this.state ={
			type:"",
			title:"",
			numObjs:"",
			listObjects:[],
			createPage:this.props.createPage
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
	           	listObjects:response.data.objectIds, 
	            });
	        });
	    }
    }

	addPageObject(event){
	    const values = [...this.state.listObjects];
		values.push({"title":"","img":defaultImage, "description":"", 
			num:this.state.numObjs});
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
	    values.splice(index, 1);
	    for (var i=index; i<values.length; i++)	{
	    	values[i].num=values[i].num-1;
	    	console.log(values[i]);
	    }
	   	this.setState({numObjs:this.state.numObjs-1},
	   		()=>this.setState({listObjects:values}));
	}

	onSubmit(){
		const PageData={"type":this.state.type, "title":this.state.type, "text":"",
			"objs":this.state.listObjects, "id":this.props.pageId};
		if (this.state.createPage) { 
			axios.post('/upload/uploadListPage', PageData).then((response)=>console.log(response))
		} else {
			axios.post('/edit/editListPage', PageData).then((response)=>console.log(response))
		};
	}

	render(){

		const create_inputs = this.state.listObjects.map((obj, index) =>  
	     	<ListObjectEditor key={index} img={obj.img} num={obj.num} 
	     		title={this.state.listObjects[index].title} 
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
			image:''
		}
		this.updateIamge=this.updateImage.bind(this);
		this.updateObject=this.updateObject.bind(this);
	}

	updateImage = (file) =>{
		this.setState({image:file});
		this.props.updatePageObject(this.props.num, "image", file);
	}

	updateObject = (event) =>{
		if(event){
			this.props.updatePageObject(this.props.num, event.target.name, event.target.value);
		}
	}

	render(){
		return(
	 		<li className="pageEditingObject">
	 			<div className="inputGroup">
					<img className="listObjectImage" src={this.state.image} />
					<UploadImage changeImage={this.updateImage}/>
				</div>
				<div className="inputGroup">
					<input type="text" name="title" value={this.props.title} placeholder="Title" 
						onChange={this.updateObject}/>
				</div>
				<div className="inputGroup">
					<input type="text" name="description" value={this.props.description} placeholder="Description" 
						onChange={this.updateObject}/>
				</div>
				<button type="button" name={this.props.num} className="tooltip btn" 
					onClick={index=>this.props.removePageObject(index)}>
			    	<FaTrashAlt />
				    <span className="tooltiptext">Remove this</span>
				</button>
			</li>
		)
	}
}

ListObjectEditor.propTypes = {
	num:PropTypes.number,
	description:PropTypes.string,
	removePageObject:PropTypes.func
}
