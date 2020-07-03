import React, { Component, useState } from 'react';
import { SketchPicker } from 'react-color'
import PropTypes from "prop-types";

const styleJson = require('../style.json');

export default class Contact extends Component {
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
		navOrientation:styleJson.navigationStyle.orientation,
		navVisibility:styleJson.navigationStyle.visibility,
		portfolioStyle:styleJson.portfolioStyle,
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
			navOrientation:styleJson.navigationStyle.orientation,
			navVisibility:styleJson.navigationStyle.visibility,
			portfolioStyle:styleJson.portfolioStyle,
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

		styleObject.portfolioStyle=styleJson.portfolioStyle;
		styleObject.backgroundColor=styleJson.backgroundColor;
		return styleObject;
	}

	onSubmit =(event) =>{
		event.preventDefault();

		var styleObject = this.createNewStyleObject();
		fetch('/style/changeStyle',{
			method:'POST',
			body:JSON.stringify(styleObject),
			headers:{
				'Content-Type': 'application/json'
			}
		})
		.then(res => {
			if(res.status===200){
				this.props.history.push('/');
			} else {
				const error = new Error(res.error);
				throw error;
			}
		})
		.catch(err=>{
			console.error(err);
			alert('Error changing website styling, please try again');
		});
	}

	onCancel = (event) =>{
		alert("Style values were not saved");
		this.resetState();
		// REDIRECT BACK TO MAIN PANEL
	}

	render(){
		return(
			<div className="Editor">
				<form className="EditorForm">	
					<ColorSelector onClose={(this.closeColorSelector)} show={this.state.showSelector} onChangeComplete={this.onColorchangeComplete} initColor={this.state.selectedColor} setParentState={this.setState} currentComponent={this.state.currentComponent}/>
					<TextStyle id="websiteTitle" name="Website Title" color={this.state.websiteTitleColor} fontSize={this.state.websiteTitleSize} onChange={this.onChange} showSelector={this.showColorSelector} getParentState={(key)=>this.state[key]}/>
					<TextStyle id="pageHeader" name="Page Headers" color={this.state.pageHeaderColor} fontSize={this.state.pageHeaderSize} onChange={this.onChange} showSelector={this.showColorSelector} getParentState={(key)=>this.state[key]}/>
					<TextStyle id="mediumHeader" name="Medium Headers" color={this.state.mediumHeaderColor} fontSize={this.state.mediumHeaderSize} onChange={this.onChange} showSelector={this.showColorSelector} getParentState={(key)=>this.state[key]}/>
					<TextStyle id="smallHeader" name="Small Headers" color={this.state.smallHeaderColor} fontSize={this.state.smallHeaderSize} onChange={this.onChange} showSelector={this.showColorSelector} getParentState={(key)=>this.state[key]}/>
					<TextStyle id="descriptionText" name="Description Text" color={this.state.descriptionTextColor} fontSize={this.state.descriptionTextSize} onChange={this.onChange} showSelector={this.showColorSelector} getParentState={(key)=>this.state[key]}/>
					<TextStyle id="navigationLink" name="Navigation Links" color={this.state.navigationLinkColor} fontSize={this.state.navigationLinkSize} onChange={this.onChange} showSelector={this.showColorSelector} getParentState={(key)=>this.state[key]}/>
					<TextStyle id="otherLink" name="Other Links" color={this.state.otherLinkColor} fontSize={this.state.otherLinkSize} onChange={this.onChange} showSelector={this.showColorSelector} getParentState={(key)=>this.state[key]}/>
					<TextStyle id="hoverOnLink" name="Links on Hover" color={this.state.hoverOnLinkColor} fontSize={this.state.hoverOnLinkSize} onChange={this.onChange} showSelector={this.showColorSelector} getParentState={(key)=>this.state[key]}/>
					<br/>
					<label htmlFor="navOrientationStyle">Change the orientation of the menu bar:</label>

					<select id="navOrientationStyle" name="navOrientation" value={this.state.navOrientation} onChange={this.onChange}>
				        <option value="Horizontal">Horizontal</option>
				        <option value="Vertical">Vertical</option>
				    </select>
				    <br/>
					<label htmlFor="navViewStyle">Choose a collapsable or non-collapsable menu bar:</label>

					<select id="navViewStyle" name="navVisibility" value={this.state.navVisibility} onChange={this.onChange}>
				        <option value="visible">Non-collapsable</option>
				        <option value="notVisile">Collapsable</option>
				    </select>
				    <br/>
					<button type="submit" value="Update">Update</button>
					<button type="submit" value="Save" onClick={this.onSubmit}>Save</button>
					<button type="reset" value="Cancel" onClick={this.onCancel}>Cancel</button>
				</form>
				<br/>
				<h2> Style Visualisation</h2>
				<StyleTemplate getParentState={(key)=>this.state[key]}/>
			</div>
		)
	}

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
			<input type="text" name={componentState} defaultValue={props.color} onChange={props.onChange}/>
			<div name={componentState} value="Choose Color" onClick={()=>props.showSelector(componentState)}>Choose Color</div>
			<label htmlFor={`${props.id}Size`} > Change font size</label>
			<input type="range" name={`${props.id}Size`} min="8" max="40" defaultValue={fontSize} onMouseUp={handleFontChange} className="sizeSlider"/>
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

	handleChangeComplete = (color) => {
		this.setState({ selectedColor: color.hex });
		this.props.setParentState({[this.props.currentComponent]:color.hex})
		this.props.setParentState({selectedColor:color.hex})

	};

	componentWillReceiveProps(nextProps) {
	  this.setState({ selectedColor: nextProps.initColor });  
	}

	onClose = e => {
		e.preventDefault();
        this.props.onClose && this.props.onClose(e);
	  };

	  render(){
		if (!this.props.show) {
			return null;
		}
		return (
			<div id="color-picker">
				<div className="selector-header">
					<span className="close" onClick={this.onClose}>&times;</span>
				</div>
		      	<SketchPicker
		        	color={ this.state.selectedColor }
		        	onChangeComplete={ this.handleChangeComplete }
		     	/>
		     	<button onClick={this.onClose}> Close</button>
		     </div>
		)

	  }

}

ColorSelector.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
  };



 function StyleTemplate(props){
 	const pageStyle = {
 				backgroundColor:props.getParentState('contentBackgroundColor')
			}

	const headerStyle = {
 				color: props.getParentState('websiteTitleColor') ,
 				backgroundColor:props.getParentState('titleBackgroundColor'),
 				fontSize:props.getParentState('websiteTitleSize'),
 				display:'block',
				textAlign:'center'
	}

	const navBarStyle = {
	 			backgroundColor: props.getParentState('navBackgroundColor'), 
	 			overflow: 'hidden'
				
	}

	const navLinksStyle = {
				listStyleType: 'none',
				width:100,
				margin: 0,
				padding: 0,
				overflow: 'hidden',
				textAlign:'center'
			}

	const navLinkStyle = {
				display: 'inline-block',
				color: props.getParentState('navigationLinkColor'),
				textAlign: 'center',
				textDecoration: 'none',
				fontSize: props.getParentState('navigationLinkSize'), 
				cursor:'pointer'
			}

	const hoverLinkStyle = {
				display: 'inline-block',
				color: props.getParentState('hoverOnLinkColor'),
				textAlign: 'center',
				textDecoration: 'none',
				fontSize: props.getParentState('navigationLinkSize'), 
				cursor:'pointer'
			}

	const pageHeaderStyle = {
 				color: props.getParentState('pageHeaderColor'), 
 				fontSize:props.getParentState('pageHeaderSize'),
				textAlign:'center'
		}

	const mediumHeaderStyle = {
 				color: props.getParentState('mediumHeaderColor'), 
 				fontSize:props.getParentState('mediumHeaderSize'),
				textAlign:'center'
		}

	const smallHeaderStyle = {
 				color: props.getParentState('smallHeaderColor'), 
 				fontSize:props.getParentState('smallHeaderSize'),
				textAlign:'center'
		}

	const descriptionStyle = {
 				color: props.getParentState('descriptionTextColor'), 
 				fontSize:props.getParentState('descriptionTextSize'),
				textAlign:'center'
			}

	const otherLinkStyle = {
 				color: props.getParentState('otherLinkColor'), 
 				fontSize:props.getParentState('otherLinkSize'),
				textAlign:'center'
			}
	const footerStyle = {
				color: props.getParentState('navLinkColor'), 
 				fontSize:props.getParentState('navLinkSize'),
 				backgroundColor: props.getParentState('navBackgroundColor'), 
				width:'100vw',
				height:'10vh',
				margin: 0,
				padding: 0
	}

 	return (
 		<div style={pageStyle}> 
 			<h1  style={headerStyle}>This is the Website Title </h1>
			<div style={navBarStyle}>
	 			<ul style={navLinksStyle}>
	 				<li style={navLinkStyle}>Example Link</li>
	 				<li style={navLinkStyle}>Example Link</li>
	 				<li style={navLinkStyle}>Link color when mouse goes over</li>
	 			</ul>
	 		</div>
 			<h2 style={pageHeaderStyle}>Page Header</h2>
 			<h3 style={mediumHeaderStyle}>Medium Header</h3>
 			<h4 style={smallHeaderStyle}>Small Header</h4>
 			<p style={descriptionStyle}>This is an example of description text</p>
 			<a style={otherLinkStyle}> Example link</a>
			<div style={footerStyle}>Footer </div>
 		</div>
 		)
 }

