import React, { Component, useState } from 'react';
import { SketchPicker } from 'react-color';
import StyleVisualization from 'App/admin/styleVisualization';
import Modal from 'App/pages/modal';
import ErrorBoundary from 'App/errorBoundary';
import { BackButton } from 'App/admin/helperComponents';

const axios = require('axios');
const styleJson = require('App/style.json');
const presetStyle1 = require('App/exampleStyle1.json');

export default class EditStyle extends Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.useNewStyle=this.useNewStyle.bind(this);
		this.switchToCustomizing = this.switchToCustomizing.bind(this);
		this.setState = this.setState.bind(this);
		this.showColorSelector = this.showColorSelector.bind(this);
    	this.returnToUserPanel=this.returnToUserPanel.bind(this);
		// Note: State variables are listed this way to avoid nesting state
		// and to allow a visualization of style changes to update for the user
		// in real time without reloading json on every update
		this.state = {
			isCustomizing: false,
			styleChoice:'presetStyle1',
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
	}

	returnToUserPanel(){
        this.props.history.push('/userPanel');
    }

	resetState = (jsonStyle) => {
		this.setState({
			isCustomizing:false,
			styleChoice:'presetStyle1',
			showSelector: false,
			selectedColor: '#fff',
			currentComponent:'',
			textAlignment:jsonStyle.textAlign,
			headerStyle:jsonStyle.navigationStyle.alignment,
			navOrientation:jsonStyle.navigationStyle.orientation,
			navVisibility:jsonStyle.navigationStyle.visibility,
			portfolioArrangement:jsonStyle.portfolioStyle.layout,
			imageWidth:jsonStyle.portfolioStyle.imgWidth,
			backgroundColor:jsonStyle.backgroundColor,
			websiteTitleColor: jsonStyle.text.WebsiteTitle.color, 
			websiteTitleSize: jsonStyle.text.WebsiteTitle.size, 
			pageHeaderColor: jsonStyle.text.PageHeader.color,
			pageHeaderSize: jsonStyle.text.PageHeader.size,
			mediumHeaderColor: jsonStyle.text.MediumHeader.color,
			mediumHeaderSize: jsonStyle.text.MediumHeader.size,
			smallHeaderColor: jsonStyle.text.SmallHeader.color,
			smallHeaderSize: jsonStyle.text.SmallHeader.size,
			descriptionTextColor: jsonStyle.text.DescriptionText.color,
			descriptionTextSize: jsonStyle.text.DescriptionText.size,
			navigationLinkColor: jsonStyle.text.NavigationLink.color,
			navigationLinkSize: jsonStyle.text.NavigationLink.size,
			otherLinkColor: jsonStyle.text.OtherLink.color,
			otherLinkSize: jsonStyle.text.OtherLink.size,
			hoverOnLinkColor: jsonStyle.text.HoverOnLink.color,
			hoverOnLinkSize: jsonStyle.text.HoverOnLink.size,
			titleBackgroundColor: jsonStyle.backgroundColor.header,
			navBackgroundColor: jsonStyle.backgroundColor.navigation,
			contentBackgroundColor: jsonStyle.backgroundColor.content,
			portfolioBackgroundColor: jsonStyle.backgroundColor.portfolio
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

	useNewStyle(event){
		if (event.target.value==='presetStyle1'){
			this.resetState(presetStyle1);
		}
		this.onChange(event);
	}

	switchToCustomizing = () => {
		this.setState({isCustomizing:!this.state.isCustomizing})
	}

	createNewTextObject = () =>{
		var styleObject = {}
		styleObject['WebsiteTitle']={'color': this.state.websiteTitleColor, 'size': this.state.websiteTitleSize};
		styleObject['PageHeader']={'color': this.state.pageHeaderColor, 'size': this.state.pageHeaderSize};
		styleObject['MediumHeader']={'color': this.state.mediumHeaderColor, 'size': this.state.mediumHeaderSize};
		styleObject['SmallHeader']={'color': this.state.smallHeaderColor, 'size': this.state.smallHeaderSize};
		styleObject['DescriptionText']={'color': this.state.descriptionTextColor, 'size': this.state.descriptionTextSize};
		styleObject['NavigationLink']={'color': this.state.navigationLinkColor, 'size': this.state.navigationLinkSize};
		styleObject['OtherLink']={'color': this.state.otherLinkColor, 'size': this.state.otherLinkSize};
		styleObject['HoverOnLink']={'color': this.state.hoverOnLinkColor, 'size': this.state.hoverOnLinkSize};
		return styleObject;
	}

	createNewStyleObject = () => {
		var styleObject = {}
		var textObject = this.createNewTextObject();
		styleObject.text=textObject;
		styleObject.navigationStyle={'orientation': this.state.navOrientation, 'visibility': this.state.navVisibility};

		styleObject.portfolioStyle={'layout':this.state.portfolioArrangement, 'imgWidth':this.state.imgWidth };
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

		if (!this.state.isCustomizing) {
			return(
				<ErrorBoundary>
					<div className="pageEditor">
	          			<BackButton backPage={this.returnToUserPanel}/>
						<div className='Editor'>
							<form className='pickSampleStyle'>
								<label htmlFor='presetStyles'>You may choose a preset style from the examples below:  </label>
								<select id='presetStyles' name='styleChoice' value={this.state.styleChoice} onChange={this.useNewStyle}>
									<option value='none'>None</option>
									<option value='presetStyle1'>Greyscale Sleek</option>
								</select>
								<label htmlFor='customStylesButton'>Or you may customize your own style: </label>
								<button type='button' id='customizingStylesButton' onClick={this.switchToCustomizing}> Customize </button>
							</form>
							<br/>
							<StyleVisualization values={this.state}/>
						</div>
					</div>
				</ErrorBoundary>
			)
		} else {
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
								getParentState={(key)=>this.state[key]}/>
							<TextStyle id='pageHeader' name='Page Headers' 
								color={this.state.pageHeaderColor} fontSize={this.state.pageHeaderSize} 
								onChange={this.onChange} showSelector={this.showColorSelector} 
								getParentState={(key)=>this.state[key]}/>
							<TextStyle id='mediumHeader' name='SubHeaders' 
								color={this.state.mediumHeaderColor} fontSize={this.state.mediumHeaderSize} 
								onChange={this.onChange} showSelector={this.showColorSelector} 
								getParentState={(key)=>this.state[key]}/>
							<TextStyle id='smallHeader' name='SubSubHeaders' 
								color={this.state.smallHeaderColor} fontSize={this.state.smallHeaderSize} 
								onChange={this.onChange} showSelector={this.showColorSelector} 
								getParentState={(key)=>this.state[key]}/>
							<TextStyle id='descriptionText' name='Description Text' 
								color={this.state.descriptionTextColor} fontSize={this.state.descriptionTextSize} 
								onChange={this.onChange} showSelector={this.showColorSelector} 
								getParentState={(key)=>this.state[key]}/>
							<TextStyle id='navigationLink' name='Navigation Links' 
								color={this.state.navigationLinkColor} fontSize={this.state.navigationLinkSize} 
								onChange={this.onChange} showSelector={this.showColorSelector} 
								getParentState={(key)=>this.state[key]}/>
							<TextStyle id='otherLink' name='Other Links' 
								color={this.state.otherLinkColor} fontSize={this.state.otherLinkSize} 
								onChange={this.onChange} showSelector={this.showColorSelector} 
								getParentState={(key)=>this.state[key]}/>
							<TextStyle id='hoverOnLink' name='Links on Hover' 
								color={this.state.hoverOnLinkColor} fontSize={this.state.hoverOnLinkSize} 
								onChange={this.onChange} showSelector={this.showColorSelector} 
								getParentState={(key)=>this.state[key]}/>
							<br/>

							<label htmlFor='textAlignment'>The text alignment of your headers:</label>
							<select id='textAlignment' name='textAlignment' 
								value={this.state.textAlignment} onChange={this.onChange}>
						        <option value='left'>Left</option>
						        <option value='right'>Right</option>
						    </select>
						    <br/>

							<label htmlFor='navOrientationStyle'>The orientation of your menu bar:</label>
						    <select id='navOrientationStyle' name='navOrientation' 
								value={this.state.navOrientation} onChange={this.onChange}>
						        <option value='Horizontal'>Horizontal</option>
						        <option value='Vertical'>Vertical</option>
						    </select>
						    <br/>

							<label htmlFor='navViewStyle'>Collapsable or non-collapsable menu bar:</label>

							<select id='navViewStyle' name='navVisibility' 
								value={this.state.navVisibility} onChange={this.onChange}>
						        <option value='visible'>Non-collapsable</option>
						        <option value='notVisible'>Collapsable</option>
						    </select>
						    <br/>
						    <label htmlFor='navOrientationStyle'>Portfolio display style:</label>

							<select id='navOrientationStyle' name='portfolioArrangement' 
								value={this.state.portfolioArrangement} onChange={this.onChange}>
						        <option value='Grid'>Grid</option>
						        <option value='Vertical'>Vertical List</option>
						    </select>
						    <br/>
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

}       


function TextStyle(props){
	const [fontSize, setFontSize] = useState(props.fontSize);
	// const [fontColor, setColor] = useState(props.color);
	const componentState =`${props.id}Color`;

	const handleFontChange = e => {
	    setFontSize(e.target.value);
		props.onChange(e);
	};

	// const handleColorChange = e => {
	//     setColor(e.target.value);
	// 	props.onChange(e);
	// };

	return(
		<div>
			<h2> {props.name} </h2>
			<label htmlFor={componentState}> Change color</label>
			<input type='text' name={componentState} defaultValue={props.color} 
				onChange={props.onChange}/>
			<div name={componentState} value='Choose Color' 
				onClick={()=>props.showSelector(componentState)}>Choose Color</div>
			<label htmlFor={`${props.id}Size`} > Change font size</label>
			<input type='range' name={`${props.id}Size`} min='8' max='60' 
				defaultValue={fontSize} onMouseUp={handleFontChange} className='sizeSlider'/>
			<div>{fontSize}</div>

		</div>
	)
}


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
			<div id='color-picker' style={this.selectorStyle}>
		      	<SketchPicker
		        	color={ this.state.selectedColor }
		        	onChangeComplete={ this.handleChangeComplete }
		     	/>
		     </div>
		);

	  }

}


 