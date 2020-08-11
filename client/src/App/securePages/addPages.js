import React, { Component } from 'react';
import {FaArrowLeft} from "react-icons/fa"
import { FaTrashAlt } from "react-icons/fa";  // Font Awesome
import defaultImage from "../profileimages/default-image.png";


export default class UserPanel extends Component {
	constructor(props){
		super(props);
		this.state={
			pageType:"none",
		}
		this.changePageType=this.changePageType.bind(this);
		this.returnToPageSelection=this.returnToPageSelection.bind(this);

	}

	changePageType(event){
		this.setState({pageType:event.target.name});
	}

	returnToPageSelection(event){
		this.setState({pageType:"none"});
	}
	

	render() {
		const PageContents = () => {
			if (this.state.pageType==="none"){
				return(<ChoosePage changePageType={this.changePageType}/>)
			} else if (this.state.pageType==="about"){
				return( <AboutPage backPage={this.returnToPageSelection}/>)
			} else if (this.state.pageType==="portfolio"){
				return( <PortfolioPage backPage={this.returnToPageSelection}/>)
			} else if (this.state.pageType==="gallery"){
				return( <ListPage pageType="gallery" backPage={this.returnToPageSelection}/>)
			} else if (this.state.pageType==="events"){
				return( <ListPage pageType="events" backPage={this.returnToPageSelection}/>)
			} else if (this.state.pageType==="workshops"){
				return( <ListPage pageType="workshops" backPage={this.returnToPageSelection}/>)
			} else {
				return( <OtherPage backPage={this.returnToPageSelection}/>)
			}
		}



		return(
			<div>
		      { PageContents() }
		    </div>
		)
	}
}


const ChoosePage = (props) => {
	return (
		<div className="addPageMain">
			<h3>Select what type of page you want to add</h3>
			<button type="button" className="pageEditButton" name="about" onClick={props.changePageType}>About Page</button>
			<button type="button" className="pageEditButton" name="portfolio" onClick={props.changePageType}>Portfolio Page</button>
			<button type="button" className="pageEditButton" name="gallery" onClick={props.changePageType}>Gallery Page</button>
			<button type="button" className="pageEditButton" name="events" onClick={props.changePageType}>Events Page</button>
			<button type="button" className="pageEditButton" name="workshops" onClick={props.changePageType}>Workshop Page</button>
			<button type="button" className="pageEditButton" name="other" onClick={props.changePageType}>Other Page</button>
		</div>
	)
}

const BackButton = (props) => {
	// props.clearAllData
	return(
		<div className="backLink" onClick={props.backPage}><FaArrowLeft /> Back</div>
	)
}


class AboutPage extends Component {
	constructor(props){
		super(props)
		this.state ={
			mainImage:defaultImage,
			name:"",
			descrition:"",
			resume:""
		}
	}

	handleChange = (event) => {
		this.setState({[event.target.name]:event.target.value})
	}

	render(){
		return(
			<div className="pageEditor">
				<BackButton backPage={this.props.backPage}/>
				<img src={this.state.mainImage}/>
				<label htmlFor="uploadPicture">Upload a Profile Picture</label>
				<input type="file" className="newPageField" name="mainImage" onChange={this.handleChange}/>
				<label htmlFor="name">Your Name:</label>
				<input type="text" className="newPageField" name="name" value={this.state.name} onChange={this.handleChange}/>
				<label htmlFor="name">Your Artist Statement:</label>
				<textarea className="newPageField" name="description" value={this.state.description} onChange={this.handleChange} />
				<label htmlFor="name">Your Resume (optional):</label>
				<textarea name="resume" value={this.state.resume} onChange={this.handleChange} />
			</div>
		)
	}
}


class PortfolioPage extends Component {
	constructor(props){
		super(props)
		this.state ={
			title:"",
		}
	}

	render(){
		return(
		<div> 
			<BackButton backPage={this.props.backPage}/>

		</div>)
	}
}


class ListPage extends Component {
	constructor(props){
		super(props)
		this.state ={
			type:this.props.pageType,
			title:"",
			numObjs:0,
			listObjects:[]
		}
		this.onChange=this.onChange.bind(this);
		this.addPageObject=this.addPageObject.bind(this);
		this.removePageObject=this.removePageObject.bind(this);
	}

	onChange(event){
		this.setState({[event.target.name]:event.target.value});
	}

	addPageObject(event){
	    const values = [...this.state.listObjects];
		values.push({"title":"","img":defaultImage, "description":"", num:this.state.numObjs});
		this.setState({listObjects:values}, ()=>this.setState({numObjs:this.state.numObjs+1}));
		

	}

	removePageObject(index){
	    const values = [...this.state.listObjects];
	    values.splice(index, 1);
	    for (var i=index; i<values.length; i++)	{
	    	values[i].num=values[i].num-1;
	    	console.log(values[i]);
	    }
	   	this.setState({numObjs:this.state.numObjs-1},()=>this.setState({listObjects:values}) );

	}



	render(){

		const create_inputs = this.state.listObjects.map((obj, index) =>  
	      <li key={index} className="pageEditingObject">
	    	<img src={obj.img} />
	      	<input type="text" value={this.state.listObjects[index].title} placeholder="Title" onChange={()=>console.log("change unimplemented yet")}/>
	      	<input type="text" value={this.state.listObjects[index].description} placeholder="Description" onChange={()=>console.log("change unimplemented yet")}/>
	      	<button type="button" name={obj.num} className="tooltip btn" onClick={index=>this.removePageObject(index)}>
	            <FaTrashAlt />
	            <span className="tooltiptext">Remove this Image</span>
	       </button>
	      </li>

	    );

		return(
		<div> 
			<BackButton backPage={this.props.backPage}/>
			<form>
				{ create_inputs }
				<button type="button" onClick={this.addPageObject}> Add new event </button>
			</form>
		</div>)
	}
}


const PageObject = (props) => {
	return(
		<div className="pageObject">
			<img className="pageObjectImage" src={props.img} />
			<input type="text" className="pageObjectField" name="title" value={ props.title } placeholder="Title" onChange={ props.onChange } />
			<input type="text" className="pageObjectField" name="text" value={ props.description } placeholder="Description" onChange={ props.onChange } />
			
		</div>
	)
}


class OtherPage extends Component {

	render(){
		return(
		<div> 
			<BackButton backPage={this.props.backPage}/>

		</div>)
	}
}

