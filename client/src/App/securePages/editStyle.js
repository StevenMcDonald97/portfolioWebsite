import React, { Component, useState } from 'react';
import { SketchPicker } from 'react-color';
import Modal from "../pages/modal";
import sampleImg1 from "./exampleImages/pic1.jpg";
import sampleImg2 from "./exampleImages/pic2.jpg";
import sampleImg3 from "./exampleImages/pic3.jpg";
const axios = require("axios");

const styleJson = require('../style.json');

export default class EditStyle extends Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.setState = this.setState.bind(this);
		this.showColorSelector = this.showColorSelector.bind(this);
	}

	// Note: State variables are listed this way to avoid nesting state
	// and to allow a visualization of style changes to update for the user
	// in real time without reloading json on every update
	state = {
		showSelector: false,
		selectedColor: '#fff',
		currentComponent:'',
		textAlignment:styleJson.textAlign,
		headerStyle:styleJson.navigationStyle.alignment,
		navOrientation:styleJson.navigationStyle.orientation,
		navVisibility:styleJson.navigationStyle.visibility,
		portfolioArrangement:styleJson.portfolioStyle.layout,
		imageWidth:styleJson.portfolioStyle.imgWidth,
		backgroundColor:styleJson.backgroundColor,
		websiteTitleColor: styleJson.text.WebsiteTitle.color, 
		websiteTitleSize: styleJson.text.WebsiteTitle.size, 
		pageHeaderColor: styleJson.text.PageHeader.color,
		pageHeaderSize: styleJson.text.PageHeader.size,
		mediumHeaderColor: styleJson.text.MediumHeader.color,
		mediumHeaderSize: styleJson.text.MediumHeader.size,
		smallHeaderColor: styleJson.text.SmallHeader.color,
		smallHeaderSize: styleJson.text.SmallHeader.size,
		descriptionTextColor: styleJson.text.DescriptionText.color,
		descriptionTextSize: styleJson.text.DescriptionText.size,
		navigationLinkColor: styleJson.text.NavigationLink.color,
		navigationLinkSize: styleJson.text.NavigationLink.size,
		otherLinkColor: styleJson.text.OtherLink.color,
		otherLinkSize: styleJson.text.OtherLink.size,
		hoverOnLinkColor: styleJson.text.HoverOnLink.color,
		hoverOnLinkSize: styleJson.text.HoverOnLink.size,
		titleBackgroundColor: styleJson.backgroundColor.header,
		navBackgroundColor: styleJson.backgroundColor.navigation,
		contentBackgroundColor: styleJson.backgroundColor.content,
		portfolioBackgroundColor: styleJson.backgroundColor.portfolio
	}

	resetState = () => {
		this.setState({
			showSelector: false,
			selectedColor: '#fff',
			currentComponent:'',
			textAlignment:styleJson.textAlign,
			headerStyle:styleJson.navigationStyle.alignment,
			navOrientation:styleJson.navigationStyle.orientation,
			navVisibility:styleJson.navigationStyle.visibility,
			portfolioArrangement:styleJson.portfolioStyle.layout,
			imageWidth:styleJson.portfolioStyle.imgWidth,
			backgroundColor:styleJson.backgroundColor,
			websiteTitleColor: styleJson.text.WebsiteTitle.color, 
			websiteTitleSize: styleJson.text.WebsiteTitle.size, 
			pageHeaderColor: styleJson.text.PageHeader.color,
			pageHeaderSize: styleJson.text.PageHeader.size,
			mediumHeaderColor: styleJson.text.MediumHeader.color,
			mediumHeaderSize: styleJson.text.MediumHeader.size,
			smallHeaderColor: styleJson.text.SmallHeader.color,
			smallHeaderSize: styleJson.text.SmallHeader.size,
			descriptionTextColor: styleJson.text.DescriptionText.color,
			descriptionTextSize: styleJson.text.DescriptionText.size,
			navigationLinkColor: styleJson.text.NavigationLink.color,
			navigationLinkSize: styleJson.text.NavigationLink.size,
			otherLinkColor: styleJson.text.OtherLink.color,
			otherLinkSize: styleJson.text.OtherLink.size,
			hoverOnLinkColor: styleJson.text.HoverOnLink.color,
			hoverOnLinkSize: styleJson.text.HoverOnLink.size,
			titleBackgroundColor: styleJson.backgroundColor.header,
			navBackgroundColor: styleJson.backgroundColor.navigation,
			contentBackgroundColor: styleJson.backgroundColor.content,
			portfolioBackgroundColor: styleJson.backgroundColor.portfolio
		})
	}

	showColorSelector = (component) => {

		this.setState({
			currentComponent: component,
			selectedColor:this.state[component],
			showSelector: true
		});

	};

	closeColorSelector = () => {
		this.setState({
			showSelector: false
		});
	};

	onChange = (event)  => {
    	this.setState({ [event.target.name]: event.target.value });
    	console.log(`Changing ${event.target.name} state to ${event.target.value}`)
	};

	createNewTextObject = () =>{
		var styleObject = {}
		styleObject["WebsiteTitle"]={"color": this.state.websiteTitleColor, "size": this.state.websiteTitleSize};
		styleObject["PageHeader"]={"color": this.state.pageHeaderColor, "size": this.state.pageHeaderSize};
		styleObject["MediumHeader"]={"color": this.state.mediumHeaderColor, "size": this.state.mediumHeaderSize};
		styleObject["SmallHeader"]={"color": this.state.smallHeaderColor, "size": this.state.smallHeaderSize};
		styleObject["DescriptionText"]={"color": this.state.descriptionTextColor, "size": this.state.descriptionTextSize};
		styleObject["NavigationLink"]={"color": this.state.navigationLinkColor, "size": this.state.navigationLinkSize};
		styleObject["OtherLink"]={"color": this.state.otherLinkColor, "size": this.state.otherLinkSize};
		styleObject["HoverOnLink"]={"color": this.state.hoverOnLinkColor, "size": this.state.hoverOnLinkSize};
		return styleObject;
	}

	createNewStyleObject = () => {
		var styleObject = {}
		var textObject = this.createNewTextObject();
		styleObject.text=textObject;
		styleObject.navigationStyle={"orientation": this.state.navOrientation, "visibility": this.state.navVisibility};

		styleObject.portfolioStyle={"layout":this.state.portfolioArrangement, "imgWidth":this.state.imgWidth };
		styleObject.imageWidth=this.state.imageWidth;

		styleObject.backgroundColor=styleJson.backgroundColor;
		return styleObject;
	}

	onSubmit =(event) =>{
		event.preventDefault();

		var styleObject = this.createNewStyleObject();


		const options = {
		  url: '/style/changeStyle',
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json;charset=UTF-8'
		  },
		  data: styleObject
		};

		axios(options)
		  .then(response => {
		    console.log(response.status);
		  });

	}

	onCancel = (event) =>{
		alert("Style values were not saved");
		this.resetState();
		// REDIRECT BACK TO MAIN PANEL
	}

	

	render(){
		const colorSelector = <ColorSelector onChangeComplete={this.onColorchangeComplete} 
			initColor={this.state.selectedColor} getParentState={(key)=>this.state[key]} 
			setParentState={this.setState} currentComponent={this.state.currentComponent}/>;

		return(
			<div className="Editor">
				<form className="EditorForm">	 
					<Modal onClose={ this.closeColorSelector } show={ this.state.showSelector } 
						content={ colorSelector }/>

					<TextStyle id="websiteTitle" name="Website Title" 
						color={this.state.websiteTitleColor} fontSize={this.state.websiteTitleSize} 
						onChange={this.onChange} showSelector={this.showColorSelector}
						getParentState={(key)=>this.state[key]}/>
					<TextStyle id="pageHeader" name="Page Headers" 
						color={this.state.pageHeaderColor} fontSize={this.state.pageHeaderSize} 
						onChange={this.onChange} showSelector={this.showColorSelector} 
						getParentState={(key)=>this.state[key]}/>
					<TextStyle id="mediumHeader" name="SubHeaders" 
						color={this.state.mediumHeaderColor} fontSize={this.state.mediumHeaderSize} 
						onChange={this.onChange} showSelector={this.showColorSelector} 
						getParentState={(key)=>this.state[key]}/>
					<TextStyle id="smallHeader" name="SubSubHeaders" 
						color={this.state.smallHeaderColor} fontSize={this.state.smallHeaderSize} 
						onChange={this.onChange} showSelector={this.showColorSelector} 
						getParentState={(key)=>this.state[key]}/>
					<TextStyle id="descriptionText" name="Description Text" 
						color={this.state.descriptionTextColor} fontSize={this.state.descriptionTextSize} 
						onChange={this.onChange} showSelector={this.showColorSelector} 
						getParentState={(key)=>this.state[key]}/>
					<TextStyle id="navigationLink" name="Navigation Links" 
						color={this.state.navigationLinkColor} fontSize={this.state.navigationLinkSize} 
						onChange={this.onChange} showSelector={this.showColorSelector} 
						getParentState={(key)=>this.state[key]}/>
					<TextStyle id="otherLink" name="Other Links" 
						color={this.state.otherLinkColor} fontSize={this.state.otherLinkSize} 
						onChange={this.onChange} showSelector={this.showColorSelector} 
						getParentState={(key)=>this.state[key]}/>
					<TextStyle id="hoverOnLink" name="Links on Hover" 
						color={this.state.hoverOnLinkColor} fontSize={this.state.hoverOnLinkSize} 
						onChange={this.onChange} showSelector={this.showColorSelector} 
						getParentState={(key)=>this.state[key]}/>
					<br/>

					<label htmlFor="textAlignment">The text alignment of your headers:</label>
					<select id="textAlignment" name="textAlignment" 
						value={this.state.textAlignment} onChange={this.onChange}>
				        <option value="left">Left</option>
				        <option value="right">Right</option>
				    </select>
				    <br/>

					<label htmlFor="navOrientationStyle">The orientation of your menu bar:</label>
				    <select id="navOrientationStyle" name="navOrientation" 
						value={this.state.navOrientation} onChange={this.onChange}>
				        <option value="Horizontal">Horizontal</option>
				        <option value="Vertical">Vertical</option>
				    </select>
				    <br/>

					<label htmlFor="navViewStyle">Collapsable or non-collapsable menu bar:</label>

					<select id="navViewStyle" name="navVisibility" 
						value={this.state.navVisibility} onChange={this.onChange}>
				        <option value="visible">Non-collapsable</option>
				        <option value="notVisible">Collapsable</option>
				    </select>
				    <br/>
				    <label htmlFor="navOrientationStyle">Portfolio display style:</label>

					<select id="navOrientationStyle" name="portfolioArrangement" 
						value={this.state.portfolioArrangement} onChange={this.onChange}>
				        <option value="Grid">Grid</option>
				        <option value="Vertical">Vertical List</option>
				    </select>
				    <br/>

					<button type="submit" value="Update">Update</button>
					<button type="submit" value="Save" onClick={this.onSubmit}>Save</button>
					<button type="reset" value="Cancel" onClick={this.onCancel}>Cancel</button>
				</form>
				<br/>
				<h2> Style Visualisation</h2>
				<div> This is how the styling will look on your website </div>
				<StyleTemplate getParentState={(key)=>this.state[key]}/>
			</div>
		)
	}

}       


function BackgroundStyle(props){
	const [fontSize, setFontSize] = useState(props.fontSize);
	const [fontColor, setColor] = useState(props.color);
	const componentState =`${props.id}Color`;

	const handleFontChange = e => {
	    setFontSize(e.target.value);
		props.onChange(e);
	};

	const handleColorChange = e => {
	    setColor(e.target.value);
		props.onChange(e);
	};

	return(
		<div>
			<h2> {props.name} </h2>
			<label htmlFor={componentState}> Change color</label>
			<input type="text" name={componentState} defaultValue={props.color} 
				onChange={props.onChange}/>
			<div name={componentState} value="Choose Color" 
				onClick={()=>props.showSelector(componentState)}>Choose Color</div>
			<label htmlFor={`${props.id}Size`} > Change font size</label>
			<input type="range" name={`${props.id}Size`} min="8" max="40" 
				defaultValue={fontSize} onMouseUp={handleFontChange} className="sizeSlider"/>
			<div>{fontSize}</div>

		</div>
	)
} 

function TextStyle(props){
	const [fontSize, setFontSize] = useState(props.fontSize);
	const [fontColor, setColor] = useState(props.color);
	const componentState =`${props.id}Color`;

	const handleFontChange = e => {
	    setFontSize(e.target.value);
		props.onChange(e);
	};

	const handleColorChange = e => {
	    setColor(e.target.value);
		props.onChange(e);
	};

	return(
		<div>
			<h2> {props.name} </h2>
			<label htmlFor={componentState}> Change color</label>
			<input type="text" name={componentState} defaultValue={props.color} 
				onChange={props.onChange}/>
			<div name={componentState} value="Choose Color" 
				onClick={()=>props.showSelector(componentState)}>Choose Color</div>
			<label htmlFor={`${props.id}Size`} > Change font size</label>
			<input type="range" name={`${props.id}Size`} min="8" max="60" 
				defaultValue={fontSize} onMouseUp={handleFontChange} className="sizeSlider"/>
			<div>{fontSize}</div>

		</div>
	)
}

// function TextEditorFields(props){
// 	// console.log(props);
// 	const textStyleFields = Object.entries(props.textData).map(([key, value]) => 
// 	    <TextStyle name={key} color={value.color} fontSize={value.size}/>
// 	);
// 	return textStyleFields;
// }



class ColorSelector extends Component {
	state = {
		selectedColor: this.props.initColor
	}
 	selectorStyle = {
			marginLeft:'40vw',
			marginTop:'10vh',
			position:'fixed'
		}
	handleChangeComplete = (color) => {
		this.setState({ selectedColor: color.hex });
		this.props.setParentState({[this.props.currentComponent]:color.hex})
		this.props.setParentState({selectedColor:color.hex})

	};

	componentWillReceiveProps(nextProps) {
	  this.setState({ selectedColor: nextProps.initColor });  
	}


	  render(){
		return (
			<div id="color-picker" style={this.selectorStyle}>
		      	<SketchPicker
		        	color={ this.state.selectedColor }
		        	onChangeComplete={ this.handleChangeComplete }
		     	/>
		     </div>
		)

	  }

}


 function StyleTemplate(props){

 	const pageStyle = {
 		width:"94%",
 		height:"100%",
		margin:'3%',
		backgroundColor:props.getParentState('contentBackgroundColor')
	}

	const headerStyle = {
		padding:"2vw",
		margin:0,
		color: props.getParentState('websiteTitleColor') ,
		backgroundColor:props.getParentState('titleBackgroundColor'),
		fontSize:`${props.getParentState('websiteTitleSize')}px`,
		textAlign:'center'
	}

	const navBarStyle = props.getParentState('navOrientation') === "Horizontal" ? {
		display: 'block',
		backgroundColor: props.getParentState('navBackgroundColor'), 
		width:"100%",
		height:"100%",
		marginTop:0
	} : {
		display: 'inline-block',
		backgroundColor: props.getParentState('navBackgroundColor'), 
		width:"15%",
		height:"100%",
		marginLeft:0,
		marginTop:0,
	}

	const subPageStyle = {
		width:'80%',
		height:"100%",
		marginLeft:"5%",
		marginright:"5%",
		verticalAlign: 'top',
		marginTop:0,
		display: 'inline-block',
		
	}

	const navLinkListStyle = {
		listStyleType: 'none',
		width:'100%',
		margin: 0,
		padding:"1vw",				
		overflow: 'hidden',
		textAlign:'center'
	}

	const navLinkStyle = props.getParentState('navOrientation') === "Horizontal" ? {
		display: 'inline-block',
		paddingLeft:'2vw',
		paddingRight:'2vw',
		color: props.getParentState('navigationLinkColor'),
		textAlign: 'center',
		textDecoration: 'none',
		fontSize: `${props.getParentState('navigationLinkSize')}px`, 
		cursor:'pointer'
	} : {
		display: 'block',
		paddingLeft:'2vw',
		paddingRight:'2vw',
		marginTop:"4vh",
		color: props.getParentState('navigationLinkColor'),
		textAlign: 'center',
		textDecoration: 'none',
		fontSize: `${props.getParentState('navigationLinkSize')}px`, 
		cursor:'pointer'
	}


	const pageHeaderStyle = {
		color: props.getParentState('pageHeaderColor'), 
		fontSize:`${props.getParentState('pageHeaderSize')}px`,
		margin: '1em',
		textAlign:'center'
	}

	const mediumHeaderStyle = {
		color: props.getParentState('mediumHeaderColor'), 
		fontSize:`${props.getParentState('mediumHeaderSize')}px`,
		margin: '.75em',
		textAlign:'center'
	}

	const smallHeaderStyle = {
		color: props.getParentState('smallHeaderColor'), 
		fontSize:`${props.getParentState('smallHeaderSize')}px`,
		margin: '.5em',
		textAlign:'center'
	}

	const descriptionStyle = {
		color: props.getParentState('descriptionTextColor'), 
		fontSize:`${props.getParentState('descriptionTextSize')}px`,
		margin: '.5em',
		textAlign:'center'
	}

	const otherLinkStyle = {
		color: props.getParentState('otherLinkColor'), 
		fontSize:`${props.getParentState('otherLinkSize')}px`,
		margin: '.5em',
		textAlign:'center'
	}


	const imageListStyle = {
		listStyleType: 'none',
		width:'100%',
		margin: 0,
		padding:"1vw",				
		overflow: 'hidden',
		textAlign:'center',
		alignItems: 'center',
		justifyContent: 'center',

	} 

	const imageStyle = props.getParentState('portfolioArrangement') === "Vertical" ?  
	{
		display: 'block',
		marginLeft:"27%",
		padding:'2vw',
		width:"50%",
		height:"30vw",
	    display: 'flex',
	    alignItems: 'center',
	    justifyContent: 'center',
		cursor:'pointer'
	} : {
		display: 'inline-block',
		paddingLeft:'2vw',
		paddingRight:'2vw',
		width:"20vw",
		height:"15vw",
		cursor:'pointer'
	}

	const footerStyle = {
		color: props.getParentState('navLinkColor'), 
		fontSize:`${props.getParentState('navLinkSize')}px`,
		backgroundColor: props.getParentState('navBackgroundColor'), 
		width:'100v%',
		height:'10vh',
		margin: 0,
		padding: 0
	}

 	return (
 		<div style={pageStyle}> 
 			<h1  style={headerStyle}> Website Title </h1>
 			<div>
				<div style={navBarStyle}>
		 			<ul style={navLinkListStyle}>
		 				<li style={navLinkStyle}>Example Link</li>
		 				<li style={navLinkStyle}>Example Link</li>
		 				<li style={navLinkStyle}>Example Link</li>
		 			</ul>
		 		</div>
		 		<div style={subPageStyle}>
		 			<h2 style={pageHeaderStyle}>Page Header</h2>
		 			<h3 style={mediumHeaderStyle}>Sub Header</h3>
		 			<h4 style={smallHeaderStyle}>SubSubHeader</h4>
		 			<p style={descriptionStyle}>Some description text here. Lorem ipsum dolor 
		 				sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
		 				ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
		 				exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
		 			<h3 style={mediumHeaderStyle}>Images</h3>
					<div style={imageListStyle}>
		 				<img style={imageStyle} src={sampleImg1}/>
		 				<img style={imageStyle} src={sampleImg2}/>
		 				<img style={imageStyle} src={sampleImg3}/>
		 			</div>
		 			<div style={otherLinkStyle}> Example link</div>
		 		</div>
				<div style={footerStyle}> 			
		 			<ul style={navLinkListStyle}>
		 				<li style={navLinkStyle}>Footer Link 1</li>
		 				<li style={navLinkStyle}>Footer Link 2</li>
		 			</ul>
		 		</div>
		 	</div>
 		</div>
 		)
 }

