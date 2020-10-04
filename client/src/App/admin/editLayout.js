import React, { Component } from 'react';
import axios from 'axios';
import { BackButton } from 'App/admin/helperComponents';
import { FaSortUp, FaSortDown, FaTrashAlt } from "react-icons/fa";  // Font Awesome
const layoutJson = require('App/layout.json');

export default class EditLayout extends Component{
	constructor(props){
		super(props)
		this.state ={
			menuStyle:layoutJson.menuStyle,
			headerAlignment:layoutJson.headerAlignment,
			portfolioStyle:layoutJson.portfolioStyle,
			pages:[],
			deletedLinks:[],
			numberOfLinks:0
		}
		this.handleChange=this.handleChange.bind(this);
		this.addLink=this.addLink.bind(this);
		this.removeLink=this.removeLink.bind(this);
		this.changePageState=this.changePageState.bind(this);
		this.changeLinkOrder=this.changeLinkOrder.bind(this);
    	this.returnToUserPanel=this.returnToUserPanel.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
	}

	// need to load a sorted array of page links
	componentDidMount(){
		axios.get('/api/getPageInfo').then((response) => {
	     let orderedPages=[].slice.array(response.data).sort(function(page1, page2) {
			  var key1 = (page1.index),
			    key2 = (page2.index);
			  // Compare the 2 dates
			  if (key1 < key2) return -1;
			  if (key1 > key2) return 1;
			  return 0;
			});
			this.setState({pages:orderedPages, numberOfLinks:orderedPages.length});
		});
	}

	handleChange = (event) => {
		this.setState({[event.target.name]:event.target.value})
	}

	createNewLink(){
		let values = [...this.state.pages];
		values.push({title: `Link ${this.state.numberOfLinks}`, type:"parent", visible:true, children:[], index:this.state.numberOfLinks});
		this.setState({pages:values, numberOfLinks:this.state.numberOfLinks+1});
	}

	addLink(title, children){
		let values = [...this.state.pages];
		values.push({title: title, type:"parent", visible:true, children:children, index:this.state.numberOfLinks});
		children.forEach((childId)=>{
			for (let i=0; i<values.length; i++){
				if (values[i]._id===childId){
					values[i].parent=title;
				}
			}
		})
		this.setState({pages:values, numberOfLinks:this.state.numberOfLinks+1});
	}

	removeLink(index){
		let values = [...this.state.pages];
		let title = values[index].title;

		if(values[index]._id){
			let deleted =[...this.state.deletedLinks];
			deleted.push(values[index]._id);
			this.setState({deletedLinks:deleted});
		}
		for (let i=0; i<values.length;i++){
			values[i].index=values[i].index-1;
			if (values[i].parent===title) values[i].parent=null;
		}
		values.splice(index, 1);
		this.setState({pages:values, numberOfLinks:this.state.numberOfLinks-1});
	}

	changePageState(index, key, value){
		let values = [...this.state.pages];
		values[index][key]=value;
		this.setState({pages:values});
	}


	changeLinkOrder(direction, index){
		var newPages = [...this.state.pages];
		if (direction==="up" && index>0){
			newPages[index].index = index-1;
			newPages[index-1].index = index;
		} else if (direction==="down" && index<[].slice.array(this.state.pages).length-1){
			newPages[index].index = index+1;
			newPages[index+1].index = index;
		} 
		[].slice.array(newPages).sort(function(page1, page2) {
		  var key1 = (page1.index),
		    key2 = (page2.index);
		  // Compare the 2 dates
		  if (key1 < key2) return -1;
		  if (key1 > key2) return 1;
		  return 0;
		});
		this.setState({pages:newPages});
	}

	returnToUserPanel(){
        this.props.history.push('/userPanel');
    }

    onSubmit(){

    	let children = {};
    	if (this.state.pages){
	    	[].slice.array(this.state.pages).forEach((page)=>{
	    		if (page.parent){
	    			children[page.parent] ? children[page.parent].push(page._id) : children[page.parent]=[ page._id ]
	    		}
	    	});
    	}


    	const LinkData={"headerAlignment":this.state.headerAlignment, "menuStyle":this.state.menuStyle, "portfolioStyle":this.state.portfolioStyle, "pages":this.state.pages};
    	
    	axios.post("/edit/updateLinks", LinkData).then((response)=>alert("Link updating returned:"+response.data))
    	axios.post("/remove/removeLinks", this.state.deletedLinks).then((response)=>alert(response.data));
    }

	render(){
		const createLinks = [].slice.array(this.state.pages).map((page)=>
			<li key={page.title} className="linkEditingContainer"><LinkEditingObject index={page.index} title={page.title} type={page.type} changeParentState={this.changePageState} changeOrder={this.changeLinkOrder} removeLink={this.removeLink}/></li>
		);

		return(
			<div className="pageEditor">
				<BackButton backPage={this.returnToUserPanel}/>
				<div className="inputGroup">
					<label className='inputLabel home' htmlFor='menuStyle'>Choose your navigation style:</label>
					<select name='menuStyle' className='homePageSelect' value={this.state.menuStyle} onChange={this.handleChange}>
						<option value='top'>Top Bar</option>
						<option value='dropdown'>Dropdown Menu</option>
						<option value='sidebar'>Sidebar Menu</option>
					</select>
				</div>
				<div className="inputGroup">
					<label className='inputLabel home' htmlFor='headerAlignment'>Choose your website title orientation:</label>
					<select name='headerAlignment' className='homePageSelect' value={this.state.headerAlignment} onChange={this.handleChange}>
						<option value='left'>Left</option>
						<option value='center'>Center</option>
						<option value='right'>Right</option>
					</select>
				</div>
				<div className="inputGroup">
					<label className='inputLabel home' htmlFor='type'>Choose your portfolio style:</label>
					<select name='portfolioStyle' className='homePageSelect' value={this.state.portfolioStyle} onChange={this.handleChange}>
						<option value='grid'>Grid</option>
						<option value='list'>List</option>
					</select>
				</div>				
				<div className="linkEditing">
					<h3>You can edit the visibility and order of your menu links below</h3>
					{ createLinks }
				</div>


				{[].slice.array(this.state.pages).length>0 ? 
					<ParentLinkObject pages={this.state.pages} addLink={this.addLink}/> :
					<span>Loading link adder...</span>
				}

				<div className="layoutSubmitButtons">
					<button type="button" className="layoutSubmitButton" 
						onClick={this.onSubmit}>
				    	Submit Changes
					</button>
					<button type="button" className="layoutSubmitButton" 
						onClick={this.returnToUserPanel}>
				    	Cancel
					</button>
				</div>


			</div>

		)
	}
}



// represents a conntainer with all the fields for editing a link
class LinkEditingObject extends Component{
	constructor(props){
		super(props)
		this.state ={
			visibility:"visible"
		}
		this.handleChange=this.handleChange.bind(this);
		this.incrementLinkOrder=this.incrementLinkOrder.bind(this);
		this.decrementLinkOrder=this.decrementLinkOrder.bind(this);
		this.removeLink=this.removeLink.bind(this);
	}

	handleChange = (event) => {
		this.setState({[event.target.name]:event.target.value});
		this.props.changeParentState(this.props.index, event.target.name, event.target.value);
	}

	decrementLinkOrder(){
		this.props.changeOrder("up", this.props.index)
	}

	incrementLinkOrder(){
		this.props.changeOrder("down", this.props.index)
	}

	removeLink(){
		this.props.removeLink(this.props.index);
	}

	render(){
		return(
			<div>
				<div className='linkEditingField'> {this.props.title} </div>
				<select name='visibility' className='homePageSelect linkEditingField' value={this.state.type} onChange={this.handleChange}>
					<option value='visible'>Visible</option>
					<option value='notVisible'>Not Visible</option>
				</select>
				<div className="linkEditingField linkOrderArrows">
					<div className="upArrow" name="up" onClick={this.decrementLinkOrder}><FaSortUp/></div>
					<div className="downArrow" name="down" onClick={this.incrementLinkOrder}><FaSortDown/></div>
				</div>
				{ this.props.type==="parent" ? 
					<button type="button" className="linkEditingField tooltip trashButton" 
						onClick={this.removeLink}>
				    	<FaTrashAlt />
					    <span className="tooltiptext">Remove this Link</span>
					</button> : null
				}
			</div>
		)
	}

}



// class for creating a parent link and giving it children. When children are added to its children list
// the respective children have their parent fields changed


// first create link, then when they click "create" add it to the list 
class ParentLinkObject extends Component {
	constructor(props){
		super(props)
		this.state ={
			title:"",
			checkboxes: [].slice.array(props.pages).reduce(
		      (pages, page) => ({
		        ...pages,
		        [page._id]: false
		      }),
		      {}
		    )
		}

		this.handleCheckboxChange=this.handleCheckboxChange.bind(this);
		this.handleChange=this.handleChange.bind(this);
		this.createCheckbox=this.createCheckbox.bind(this);
		this.createCheckboxes=this.createCheckboxes.bind(this);	
		this.addLink=this.addLink.bind(this);
		this.clear=this.clear.bind(this);
	}

	handleChange = (event) => {
		if (event){
			this.setState({[event.target.name]:event.target.value})
		}
	}

	handleCheckboxChange = event => {
	    const { name } = event.target;

	    this.setState(prevState => ({
	      checkboxes: {
	        ...prevState.checkboxes,
	        [name]: !prevState.checkboxes[name]
	      }
	    }));
	};

	createCheckbox = page =>{ 
		if (page.type!=="parent"){
			return (
				<Checkbox
				  key={page._id}
				  label={page.title}
				  name={page._id}
				  isSelected={this.state.checkboxes[page._id]}
				  onCheckboxChange={this.handleCheckboxChange}
				/>
			);		
		} 
		return null;

	}

	createCheckboxes = () => [].slice.array(this.props.pages).map(this.createCheckbox);


	addLink(){
		if (this.state.title!==""){
			let children = Object.keys(this.state.checkboxes).filter(key => this.state.checkboxes[key])
			this.props.addLink(this.state.title, children);
			this.clear();	
		}
	}

	clear(){
		let clearedCheckBoxes=this.state.checkboxes;
		Object.keys(clearedCheckBoxes).forEach((key)=>clearedCheckBoxes[key]=false)

		this.setState({			
			title: "",
			checkboxes: clearedCheckBoxes
		});
	};


	render(){
		return(
			<div className="parentLinkContainer">
				<h3> Create a New Parent Link </h3>
				<h5> (For example if you want several portfolios to dropdown under one link) </h5>
				<label className='inputLabel' htmlFor="title">Title:</label>
				<input type='text' className='smallPageField' name="title" value={this.state.title} onChange={this.handleChange}/>
				<label className='inputLabel' htmlFor="children">Choose children pages:</label>
				<div name="children" className="childLinkSelection">
					{ this.createCheckboxes() }
				</div>
				<button type="button" className="layoutSubmitButton" 
					onClick={this.addLink}>
			    	Add Link
				</button>
				<button type="button" className="layoutSubmitButton" 
					onClick={this.clear}>
			    	Cancel
				</button>			
			</div>
		)
	}


}

				// <div className="linkOrderArrows">
				// 	<div className="upArrow" name="up" onClick={this.decrementLinkOrder}><FaSortUp/></div>
				// 	<div className="downArrow" name="down" onClick={this.incrementLinkOrder}><FaSortDown/></div>
				// </div>
				// <button type="button" className="tooltip trashButton" 
				// 	onClick={this.removeLink}>
			 //    	<FaTrashAlt />
				//     <span className="tooltiptext">Remove this Link</span>
				// </button>



				// <button type="button" className="tooltip" 
				// 	onClick={this.decrementLinkOrder}>
			 //    	<FaSortUp/>
				//     <span className="tooltiptext">Move link up</span>
				// </button>
				// <button type="button" className="tooltip trashButton" 
				// 	onClick={this.incrementLinkOrder}>
			 //    	<FaSortDown/>
				//     <span className="tooltiptext">Move link up</span>
				// </button>


// taken from: http://react.tips/checkboxes-in-react-16/
const Checkbox = ({ label, name, isSelected, onCheckboxChange }) => (
  <div className="childLinkCheckbox">
    <label>
      <input
        type="checkbox"
        name={name}
        checked={isSelected}
        onChange={onCheckboxChange}
        className="form-check-input"
      />
      {label}
    </label>
  </div>
);