import React, { Component, useState } from 'react';
import { SketchPicker } from 'react-color';
import StyleVisualization from 'App/admin/styleVisualization';
import Modal from 'App/pages/modal';
import ErrorBoundary from 'App/errorBoundary';
import { BackButton } from 'App/admin/helperComponents';
import axios from 'axios';
const styleJson = require('App/style.json');
// const presetStyle1 = require('App/exampleStyle1.json');

export default class EditStyle extends Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		// this.useNewStyle=this.useNewStyle.bind(this);
		this.switchToCustomizing = this.switchToCustomizing.bind(this);
		this.setState = this.setState.bind(this);
		this.showColorSelector = this.showColorSelector.bind(this);
    	this.returnToUserPanel=this.returnToUserPanel.bind(this);
		// Note: State variables are listed this way to avoid nesting state
		// and to allow a visualization of style changes to update for the user
		// in real time without reloading json on every update
		this.state = {
			isCustomizing: false,
			// styleChoice:'presetStyle1',
			showSelector: false,
			selectedColor: '#fff',
			currentComponent:'',
			websiteTitleColor: styleJson.text.WebsiteTitle.color, 
			websiteTitleSize: styleJson.text.WebsiteTitle.size, 
			pageHeaderColor: styleJson.text.PageHeader.color,
			pageHeaderSize: styleJson.text.PageHeader.size,
			mediumHeaderColor: styleJson.text.MediumHeader.color,
			mediumHeaderSize: styleJson.text.MediumHeader.size,
			smallHeaderColor: styleJson.text.SmallHeader.color,
			smallHeaderSize: styleJson.text.SmallHeader.size,
			bodyTextColor: styleJson.text.BodyText.color,
			bodyTextSize: styleJson.text.BodyText.size,
			navigationLinkColor: styleJson.text.NavigationLink.color,
			navigationLinkSize: styleJson.text.NavigationLink.size,
			otherLinkColor: styleJson.text.OtherLink.color,
			otherLinkSize: styleJson.text.OtherLink.size,
			hoverOnLinkColor: styleJson.text.HoverOnLink.color,
			hoverOnLinkSize: styleJson.text.HoverOnLink.size,
			objectTextColor: styleJson.text.ObjectText.color,
			objectTextSize: styleJson.text.ObjectText.size,
			titleBackgroundColor: styleJson.backgroundColor.title,
			pageHeaderBackgroundColor: styleJson.backgroundColor.header,
			navigationBackgroundColor: styleJson.backgroundColor.navigation,
			bodyBackgroundColor: styleJson.backgroundColor.body,
			emphasisBackgroundColor: styleJson.backgroundColor.emphasis,
			objectBackgroungColor: styleJson.backgroundColor.object
		}
	}

	returnToUserPanel(){
        this.props.history.push('/userPanel');
    }

	resetState = (jsonStyle) => {
		this.setState({
			isCustomizing: false,
			// styleChoice:'presetStyle1',
			showSelector: false,
			selectedColor: '#fff',
			currentComponent:'',
			websiteTitleColor: styleJson.text.WebsiteTitle.color, 
			websiteTitleSize: styleJson.text.WebsiteTitle.size, 
			pageHeaderColor: styleJson.text.PageHeader.color,
			pageHeaderSize: styleJson.text.PageHeader.size,
			mediumHeaderColor: styleJson.text.MediumHeader.color,
			mediumHeaderSize: styleJson.text.MediumHeader.size,
			smallHeaderColor: styleJson.text.SmallHeader.color,
			smallHeaderSize: styleJson.text.SmallHeader.size,
			bodyTextColor: styleJson.text.BodyText.color,
			bodyTextSize: styleJson.text.BodyText.size,
			navigationLinkColor: styleJson.text.NavigationLink.color,
			navigationLinkSize: styleJson.text.NavigationLink.size,
			otherLinkColor: styleJson.text.OtherLink.color,
			otherLinkSize: styleJson.text.OtherLink.size,
			hoverOnLinkColor: styleJson.text.HoverOnLink.color,
			hoverOnLinkSize: styleJson.text.HoverOnLink.size,
			objectTextColor: styleJson.text.ObjectText.color,
			objectTextSize: styleJson.text.ObjectText.size,
			titleBackgroundColor: styleJson.backgroundColor.title,
			pageHeaderBackgroundColor: styleJson.backgroundColor.header,
			navigationBackgroundColor: styleJson.backgroundColor.navigation,
			bodyBackgroundColor: styleJson.backgroundColor.body,
			emphasisBackgroundColor: styleJson.backgroundColor.emphasis,
			objectBackgroungColor: styleJson.backgroundColor.object
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
	};

	// useNewStyle(event){
	// 	if (event.target.value==='presetStyle1'){
	// 		this.resetState(presetStyle1);
	// 	}
	// 	this.onChange(event);
	// }

	switchToCustomizing = () => {
		this.setState({isCustomizing:!this.state.isCustomizing})
	}

	createNewTextObject = () =>{
		var styleObject = {}
		styleObject['WebsiteTitle']={'color': this.state.websiteTitleColor, 'size': this.state.websiteTitleSize};
		styleObject['PageHeader']={'color': this.state.pageHeaderColor, 'size': this.state.pageHeaderSize};
		styleObject['MediumHeader']={'color': this.state.mediumHeaderColor, 'size': this.state.mediumHeaderSize};
		styleObject['SmallHeader']={'color': this.state.smallHeaderColor, 'size': this.state.smallHeaderSize};
		styleObject['BodyText']={'color': this.state.bodyTextColor, 'size': this.state.bodyTextSize};
		styleObject['NavigationLink']={'color': this.state.navigationLinkColor, 'size': this.state.navigationLinkSize};
		styleObject['OtherLink']={'color': this.state.otherLinkColor, 'size': this.state.otherLinkSize};
		styleObject['HoverOnLink']={'color': this.state.hoverOnLinkColor, 'size': this.state.hoverOnLinkSize};
		styleObject['ObjectText']={'color': this.state.objectTextColor, 'size': this.state.objectTextSize};
		return styleObject;
	}

	createNewBackgroundObject = () =>{
		var backgroundObject = {
			title:this.state.titleBackgroundColor,
			header:this.state.pageHeaderBackgroundColor,
			navigation:this.state.navigationBackgroundColor,
			body:this.state.bodyBackgroundColor,
			emphasis:this.state.emphasisBackgroundColor,
			object:this.state.objectBackgroungColor

		}
		
		return backgroundObject;
	}

	createNewStyleObject = () => {
		var styleObject = {}
		var textObject = this.createNewTextObject();
		var backgroundObject = this.createNewBackgroundObject();
		styleObject.text=textObject;
		styleObject.backgroundColor=backgroundObject;
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
		    this.props.history.push('/userPanel');
		  });

	}

	onCancel = (event) =>{
		alert('Style values were not saved');
		this.resetState(styleJson);
		this.props.history.push('/userPanel');

	}

	

	render(){
		const colorSelector = <ColorSelector onChangeComplete={this.onColorchangeComplete} 
			initColor={this.state.selectedColor} getParentState={(key)=>this.state[key]} 
			setParentState={this.setState} currentComponent={this.state.currentComponent}/>;

			// return(
			// 	<ErrorBoundary>
			// 		<div className="pageEditor">
	  //         			<BackButton backPage={this.returnToUserPanel}/>
			// 			<div className='Editor'>
			// 				<form className='pickSampleStyle'>
			// 					<label htmlFor='presetStyles'>You may choose a preset style from the examples below:  </label>
			// 					<select id='presetStyles' name='styleChoice' value={this.state.styleChoice} onChange={this.useNewStyle}>
			// 						<option value='none'>None</option>
			// 						<option value='presetStyle1'>Greyscale Sleek</option>
			// 					</select>
			// 					<label htmlFor='customStylesButton'>Or you may customize your own style: </label>
			// 					<button type='button' id='customizingStylesButton' onClick={this.switchToCustomizing}> Customize </button>
			// 				</form>
			// 				<br/>
			// 				<StyleVisualization values={this.state}/>
			// 			</div>
			// 		</div>
			// 	</ErrorBoundary>
			// )

			return(
				<div className='Editor'>
				    <BackButton backPage={this.returnToUserPanel}/>
					<button type='button' id='customizingStylesButton' onClick={this.switchToCustomizing}> Return to Preset Styles </button>
					<ErrorBoundary>

						<form className='EditorForm'>	 
							<Modal onClose={ this.closeColorSelector } show={ this.state.showSelector } 
								content={ colorSelector }/>

							<TextStyle id='websiteTitle' name='Website Title' 
								color={this.state.websiteTitleColor} fontSize={this.state.websiteTitleSize} 
								onChange={this.onChange} showSelector={this.showColorSelector}
								getParentState={(key)=>this.state[key]} setParentState={this.setState}/>
							<TextStyle id='pageHeader' name='Page Headers' 
								color={this.state.pageHeaderColor} fontSize={this.state.pageHeaderSize} 
								onChange={this.onChange} showSelector={this.showColorSelector} 
								getParentState={(key)=>this.state[key]} setParentState={this.setState}/>
							<TextStyle id='mediumHeader' name='SubHeaders' 
								color={this.state.mediumHeaderColor} fontSize={this.state.mediumHeaderSize} 
								onChange={this.onChange} showSelector={this.showColorSelector} 
								getParentState={(key)=>this.state[key]} setParentState={this.setState}/>
							<TextStyle id='smallHeader' name='Sub-SubHeaders' 
								color={this.state.smallHeaderColor} fontSize={this.state.smallHeaderSize} 
								onChange={this.onChange} showSelector={this.showColorSelector} 
								getParentState={(key)=>this.state[key]} setParentState={this.setState}/>
							<TextStyle id='bodyText' name='Body Text' 
								color={this.state.bodytextColor} fontSize={this.state.bodytextSize} 
								onChange={this.onChange} showSelector={this.showColorSelector} 
								getParentState={(key)=>this.state[key]} setParentState={this.setState}/>
							<TextStyle id='navigationLink' name='Navigation Links' 
								color={this.state.navigationLinkColor} fontSize={this.state.navigationLinkSize} 
								onChange={this.onChange} showSelector={this.showColorSelector} 
								getParentState={(key)=>this.state[key]} setParentState={this.setState}/>
							<TextStyle id='otherLink' name='Other Links' 
								color={this.state.otherLinkColor} fontSize={this.state.otherLinkSize} 
								onChange={this.onChange} showSelector={this.showColorSelector} 
								getParentState={(key)=>this.state[key]} setParentState={this.setState}/>
							<TextStyle id='hoverOnLink' name='Hover Links' 
								color={this.state.hoverOnLinkColor} fontSize={this.state.hoverOnLinkSize} 
								onChange={this.onChange} showSelector={this.showColorSelector} 
								getParentState={(key)=>this.state[key]} setParentState={this.setState}/>
							<TextStyle id='objectText' name='Text in page objects' 
								color={this.state.objectTextSize} fontSize={this.state.objectTextSize} 
								onChange={this.onChange} showSelector={this.showColorSelector} 
								getParentState={(key)=>this.state[key]} setParentState={this.setState}/>		
							<BackgroundStyle id='titleBackgroundColor' name='website title' 
								color={this.state.objectTextSize} setParentState={this.setState}
								onChange={this.onChange} showSelector={this.showColorSelector} 
							/>		
							<BackgroundStyle id='pageHeaderBackgroundColor' name='page header' 
								color={this.state.objectTextSize} setParentState={this.setState}
								onChange={this.onChange} showSelector={this.showColorSelector} 
							/>	
							<BackgroundStyle id='navigationBackgroundColor' name='navigation' 
								color={this.state.objectTextSize} setParentState={this.setState}
								onChange={this.onChange} showSelector={this.showColorSelector} 
							/>
							<BackgroundStyle id='bodyBackgroundColor' name='body' 
								color={this.state.objectTextSize} setParentState={this.setState}
								onChange={this.onChange} showSelector={this.showColorSelector} 
							/>	
							<BackgroundStyle id='emphasisBackgroundColor' name='emphasized area' 
								color={this.state.objectTextSize} setParentState={this.setState}
								onChange={this.onChange} showSelector={this.showColorSelector} 
							/>	
							<BackgroundStyle id='objectBackgroundColor' name='page window (such as galleries)' 
								color={this.state.objectTextSize} setParentState={this.setState}
								onChange={this.onChange} showSelector={this.showColorSelector} 
							/>								<br/>
							<button type='submit' value='Save' onClick={this.onSubmit}>Save</button>
							<button type='reset' value='Cancel' onClick={this.onCancel}>Cancel</button>
						</form>
					</ErrorBoundary>
					<br/>
					<ErrorBoundary>
						<StyleVisualization values={this.state}/>
					</ErrorBoundary>
				</div>
			)
	}

}       


function TextStyle(props){
	const [fontSize, setFontSize] = useState(props.fontSize);
	const [selectorVisibility, setSelectorVisibility] = useState(false);
	const [color, setColor] = useState(props.color);
	const componentColor =`${props.id}Color`;

	const handleFontChange = e => {
	    setFontSize(e.target.value);
		props.onChange(e);
	};

	const changeSelectorVisibility = () => {
		setSelectorVisibility(!selectorVisibility);
	}

	const handleChangeComplete = (color) => {
		setColor(color.hex);
		props.setParentState({[componentColor]:color.hex})
	};

	// const handleColorChange = e => {
	//     setColor(e.target.value);
	// 	props.onChange(e);
	// };

	return(
		<div className="styleEditingObject">
			<h2> {props.name} </h2>
			<label htmlFor={componentColor}> Change color </label>
			<input type='text' name={componentColor} defaultValue={color} 
				onChange={props.onChange}/>
			<button type="button" name={componentColor} value='Choose Color' 
				onClick={changeSelectorVisibility}>{selectorVisibility ? 'Hide' : "Show"} Color Selector</button>
			<label htmlFor={`${props.id}Size`} > Change font size</label>
			<input type='range' name={`${props.id}Size`} min='8' max='60' 
				defaultValue={fontSize} onMouseUp={handleFontChange} className='sizeSlider'/>
			<div>{fontSize}</div>
			{ selectorVisibility ? <div id='color-selector' className="colorSelector">
		      	<SketchPicker
		      		width={300}
		        	color={ color }
		        	onChangeComplete={ handleChangeComplete }
		     	/>
		     </div> : null }
		</div>
	)
}

function BackgroundStyle(props){
	const [selectorVisibility, setSelectorVisibility] = useState(false);
	const [color, setColor] = useState(props.color);
	const componentColor =props.id;

	const changeSelectorVisibility = () => {
		setSelectorVisibility(!selectorVisibility);
	}

	const handleChangeComplete = (color) => {
		setColor(color.hex);
		props.setParentState({[componentColor]:color.hex})
	};

	return(
		<div className="styleEditingObject">
			<h2> Change the color for your {props.name}'s background </h2>
			<input type='text' name={componentColor} defaultValue={color} 
				onChange={props.onChange}/>
			<button type="button" name={componentColor} value='Choose Color' 
				onClick={changeSelectorVisibility}>{selectorVisibility ? 'Hide' : "Show"} Color Selector</button>
			{ selectorVisibility ? <div id='color-selector' className="colorSelector">
		      	<SketchPicker
		      		width={300}
		        	color={ color }
		        	onChangeComplete={ handleChangeComplete }
		     	/>
		     </div> : null }
		</div>

	)
}

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

	render(){
		return (
			<div id='color-selector' className="colorSelector">
		      	<SketchPicker
		      		width={350}
		        	color={ this.state.selectedColor }
		        	onChangeComplete={ this.handleChangeComplete }
		     	/>
		     </div>
		);
	}
}


 