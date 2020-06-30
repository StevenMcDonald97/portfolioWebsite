import React, { Component, useState } from 'react';
import { SketchPicker } from 'react-color'
const styleJson = require('../style.json');

export default class Contact extends Component {
	constructor(props) {
		super(props);
		this.onColorChangeComplete = this.onColorChangeComplete.bind(this);
		this.onChange = this.onChange.bind(this);
		this.setState = this.setState.bind(this);
	}

	// Note: State variables are listed this way to avoid nesting state
	// and to allow a visualization of style changes to update for the user
	// in real time
	state = {
		selectedColor: '#fff',
		navigationStyle:styleJson.navigationStyle,
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
		hoverOnLinkSize: styleJson.text.HoverOnLink.size
	}

	resetState = () => {
		this.setState({
			selectedColor: '#fff',
			navigationStyle:styleJson.navigationStyle,
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
			hoverOnLinkSize: styleJson.text.HoverOnLink.size
		})
	}

	onColorChangeComplete = (color) => {
		this.setState({ selectedColor: color.hex });
	}

	onChange = (event)  => {
    	this.setState({ [event.target.name]: event.target.value });
    	console.log(`Changing ${event.target.name} state to ${event.target.value}`)
	};

	createNewTextObject = () =>{
		var styleObject = {}
		styleObject["WebsiteTitle"]={"color": this.state.websiteTitleColor, "size": this.state.websiteTitleSize};
		return styleObject;
	}

	onSubmit =(event) =>{

		var styleObject = this.createNewTextObject();

		event.preventDefault();
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
		const newJson = JSON.parse(JSON.stringify(styleJson));
		this.setState({
			styleObject:newJson
		})
	}

	render(){
		return(
			<div className="Editor">
				<form className="EditorForm">					
					<TextStyle id="websitetitle" name="Website Title" color={this.state.websiteTitleColor} fontSize={this.state.websiteTitleSize} onChange={this.onChange} setParentState={this.setState}/>
					<TextStyle id="pageHeader" name="Page Headers" color={this.state.pageHeaderColor} fontSize={this.state.pageHeaderSize} setParentState={this.setState}/>
					<TextStyle id="mediumHeader" name="Medium Headers" color={this.state.mediumHeaderColor} fontSize={this.state.mediumHeaderSize} setParentState={this.setState}/>
					<TextStyle id="smallHeader" name="Small Headers" color={this.state.smallHeaderColor} fontSize={this.state.smallHeaderSize} setParentState={this.setState}/>
					<TextStyle id="descriptionText" name="Description Text" color={this.state.descriptionTextColor} fontSize={this.state.descriptionTextSize} setParentState={this.setState}/>
					<TextStyle id="navigationLinks" name="Navigation Links" color={this.state.navigationLinkColor} fontSize={this.state.navigationLinkSize} setParentState={this.setState}/>
					<TextStyle id="otherLinks" name="Other Links" color={this.state.otherLinkColor} fontSize={this.state.otherLinkSize} setParentState={this.setState}/>
					<TextStyle id="hoverOnLink" name="Links on Hover" color={this.state.hoverOnLinkColor} fontSize={this.state.hoverOnLinkSize} setParentState={this.setState}/>
					<button type="submit" value="Update">Update</button>
					<button type="submit" value="Save" onClick={this.onSubmit}>Save</button>
					<button type="reset" value="Cancel" onClick={this.onCancel}>Cancel</button>
				</form>
			</div>
		)
	}

}       


function TextStyle(props){
	const [fontSize, setFontSize] = useState(props.fontSize);

	const handleFontChange = e => {
	    setFontSize(e.target.value);
	    let key = `${props.id}Size`;
	    props.setParentState({key:fontSize})
	};

	return(
		<div>
			<h2> {props.name} </h2>
			<label htmlFor={`${props.id}Color`}> Change color</label>
			<input type="text" name={`${props.id}Color`} defaultValue={props.color} onChange={props.onChange}/>
			<label htmlFor={`${props.id}Size`} > Change font size</label>
			<input type="range" name={`${props.id}Size`} min="8" max="40" defaultValue={fontSize} onMouseUp={handleFontChange} className="sizeSlider"/>
			<div>{fontSize}</div>
		</div>
	)
}

function TextEditorFields(props){
	// console.log(props);
	const textStyleFields = Object.entries(props.textData).map(([key, value]) => 
	    <TextStyle name={key} color={value.color} fontSize={value.size}/>
	);
	return textStyleFields;
}



function ColorSelector(props) {

	return (
      <SketchPicker
        color={ props.initColor }
        onChangeComplete={ this.onColorChangeComplete }
     />

	)
}
