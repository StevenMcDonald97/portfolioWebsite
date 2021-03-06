import React, { Component, useState } from 'react';
import { SketchPicker } from 'react-color';
import StyleVisualization from 'src/App/admin/styleVisualization';
import Modal from 'src/App/pages/modal';
import ErrorBoundary from 'src/App/errorBoundary';
import { BackButton } from 'src/App/admin/helperComponents';
import axios from 'axios';

const styleJson = require('src/App/style.json');
const autumnSnow = require('src/App/admin/presetStyles/autumn-snow.json');
const grayScaleLight= require('src/App/admin/presetStyles/gray-scale-light.json');
const altDarkTheme = require('src/App/admin/presetStyles/warm-dark.json');
const rusticCabin = require('src/App/admin/presetStyles/rustic-cabin.json');
const grayScaleDark = require('src/App/admin/presetStyles/gray-scale-dark.json');
const artic = require('src/App/admin/presetStyles/artic.json');
const sleekDark = require('src/App/admin/presetStyles/sleek-dark.json');
const sleekLight = require('src/App/admin/presetStyles/sleek-light.json');

// const presetStyle1 = require('App/exampleStyle1.json');

export default class EditStyle extends Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.switchStyle=this.switchStyle.bind(this);
		this.switchToCustomizing = this.switchToCustomizing.bind(this);
		this.setState = this.setState.bind(this);
    	this.returnToUserPanel=this.returnToUserPanel.bind(this);
		// Note: State variables are listed this way to avoid nesting state
		// and to allow a visualization of style changes to update for the user
		// in real time without reloading json on every update
		this.state = {
			isCustomizing: false,
			// styleChoice:'presetStyle1',
			selectedColor: '#fff',
			theme:'none',
			currentComponent:'',
			headerFont: styleJson.text.headerFontFamily, 
			bodyFont: styleJson.text.bodyFontFamily, 
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
			objectBackgroundColor: styleJson.backgroundColor.object
		}
	}

	returnToUserPanel(){
        this.props.history.push('/userPanel');
    }

	resetState = (jsonStyle) => {
		this.setState({
			isCustomizing: false,
			// styleChoice:'presetStyle1',
			selectedColor: '#fff',
			theme:'none',
			currentComponent:'',
			headerFont: styleJson.text.headerFontFamily, 
			bodyFont: styleJson.text.bodyFontFamily,
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
			objectBackgroundColor: styleJson.backgroundColor.object
		})
	}

	changeState = (jsonStyle) => {
		this.setState({
			websiteTitleColor: jsonStyle.text.WebsiteTitle.color, 
			websiteTitleSize: jsonStyle.text.WebsiteTitle.size, 
			pageHeaderColor: jsonStyle.text.PageHeader.color,
			pageHeaderSize: jsonStyle.text.PageHeader.size,
			mediumHeaderColor: jsonStyle.text.MediumHeader.color,
			mediumHeaderSize: jsonStyle.text.MediumHeader.size,
			smallHeaderColor: jsonStyle.text.SmallHeader.color,
			smallHeaderSize: jsonStyle.text.SmallHeader.size,
			bodyTextColor: jsonStyle.text.BodyText.color,
			bodyTextSize: jsonStyle.text.BodyText.size,
			navigationLinkColor: jsonStyle.text.NavigationLink.color,
			navigationLinkSize: jsonStyle.text.NavigationLink.size,
			otherLinkColor: jsonStyle.text.OtherLink.color,
			otherLinkSize: jsonStyle.text.OtherLink.size,
			hoverOnLinkColor: jsonStyle.text.HoverOnLink.color,
			hoverOnLinkSize: jsonStyle.text.HoverOnLink.size,
			objectTextColor: jsonStyle.text.ObjectText.color,
			objectTextSize: jsonStyle.text.ObjectText.size,
			titleBackgroundColor: jsonStyle.backgroundColor.title,
			pageHeaderBackgroundColor: jsonStyle.backgroundColor.header,
			navigationBackgroundColor: jsonStyle.backgroundColor.navigation,
			bodyBackgroundColor: jsonStyle.backgroundColor.body,
			emphasisBackgroundColor: jsonStyle.backgroundColor.emphasis,
			objectBackgroundColor: jsonStyle.backgroundColor.object
		});

	}

	onChange = (event)  => {
    	this.setState({ [event.target.name]: event.target.value });
	};

	switchStyle(event){
		if (event.target.value==='autumnSnow'){
			this.changeState(autumnSnow);
		} else if (event.target.value==='grayScaleLight'){
			this.changeState(grayScaleLight);
		} else if (event.target.value==='altDarkTheme'){
			this.changeState(altDarkTheme);
		} else if (event.target.value==='rusticCabin'){
			this.changeState(rusticCabin);
		} else if (event.target.value==='grayScaleDark'){
			this.changeState(grayScaleDark);
		} else if (event.target.value==='artic'){
			this.changeState(artic);
		} else if (event.target.value==='sleekDark'){
			this.changeState(sleekDark);
		} else if (event.target.value==='sleekLight'){
			this.changeState(sleekLight);
		} else {
			this.changeState(styleJson);
		}
		this.onChange(event);
	}

	switchToCustomizing = () => {
		this.setState({isCustomizing:!this.state.isCustomizing})
	}

	createNewTextObject = () =>{
		var styleObject = {}
		styleObject['headerFontFamily']=this.state.headerFont;
		styleObject['bodyFontFamily']=this.state.bodyFont;
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
			object:this.state.objectBackgroundColor

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

			return(
				<div className='editor pageEditor'>
				    <BackButton backPage={this.returnToUserPanel}/>
					<button type='button' style={{"display":"none"}} id='customizingStylesButton' onClick={this.switchToCustomizing}> Return to Preset Styles </button>
					<ErrorBoundary>
						<h3 className="editingTitle"> Edit your website's color scheme and fonts: </h3>
						<h4 className="editingSubTitle"> Choose your header and body fonts</h4>
						<h5 className="editingSubSubTitle"> Font examples:  
							 <div style={{display:"inline", fontFamily:"'Abril Fatface', cursive"}} > Abril Fatface, </div> 
							 <div style={{display:"inline", fontFamily:'"Alegreya", serif'}} > Alegreya, </div> 
							 <div style={{display:"inline", fontFamily:"'Amaranth', sans-serif"}} > Amaranth, </div> 
							 <div style={{display:"inline", fontFamily:"'Cinzel','Georgia', serif"}} >Cinzel, </div>
							 <div style={{display:"inline", fontFamily:"'Gravitas One', cursive"}} > Gravitas One, </div> 
							 <div style={{display:"inline", fontFamily:"'Helvetica', sans-serif"}} > Helvetica, </div> 
							 <div style={{display:"inline", fontFamily:"'Josefin Slab', serif"}} > Josefin Slab, </div> 
							 <div style={{display:"inline", fontFamily:"'Kalam', cursive"}} >Kalam, </div>
							 <div style={{display:"inline", fontFamily:"'Karla', sans-serif"}} > Karla, </div> 
							 <div style={{display:"inline", fontFamily:"'Lato', sans-serif"}} > Lato, </div> 
							 <div style={{display:"inline", fontFamily:"'Lemonada', cursive"}} >Lemonada, </div>
							 <div style={{display:"inline", fontFamily:"'Lobster Two', cursive"}} >Lobster Two, </div>								
							 <div style={{display:"inline", fontFamily:"'Merriweather', serif"}} > Merriweather, </div> 
							 <div style={{display:"inline", fontFamily:"'Montserrat', sans-serif"}} > Montserrat, </div> 
							 <div style={{display:"inline", fontFamily:"'Oxygen', serif"}} > Oxygen, </div> 
							 <div style={{display:"inline", fontFamily:"'Roboto', sans-serif"}} > Roboto, </div> 
							 <div style={{display:"inline", fontFamily:"'Source Sans Pro','Helvetica', sans-serif"}} >Source Sans, </div>
							 <div style={{display:"inline", fontFamily:"'Staatliches', cursive"}} >Staatliches, </div>
							 <div style={{display:"inline", fontFamily:"'Vollkorn', serif"}} > Volkorn </div> 
						</h5>
						
						<div className="inputGroup">
							<label className='inputLabel home' htmlFor='headerFont'>Choose your header font:</label>
							<select name='headerFont' className='homePageSelect' value={this.state.headerFont} onChange={this.onChange}>
								<option value="'Abril Fatface', cursive" style={{fontFamily:"'Abril Fatface', cursive"}}>Abril Fatface</option>
								<option value='"Alegreya", "Georgia", serif'>Alegreya</option>
								<option value="'Amaranth', 'Helvetica', sans-serif" fontFamily="Amaranth', sans-serif">Amaranth</option>
								<option value="'Cinzel','Georgia', serif" >Cinzel</option>
								<option value="'Gravitas One', cursive" >Gravitas</option>
								<option value="'Helvetica', sans-serif" >Helvetica</option>
								<option value="'Josefin Slab', 'Georgia', serif" >Josefin Slab</option>
								<option value="'Kalam', cursive" >Kalam</option>
								<option value="'Karla', 'Helvetica', sans-serif" >Karla</option>
								<option value="'Lato', 'Helvetica', sans-serif" >Lato</option>
								<option value="'Lemonada', cursive" >Lemonada</option>
								<option value="'Lobster Two', cursive" >Lobster Two</option>								
								<option value="'Merriweather','Georgia', serif" >Merriweather</option>
								<option value="'Montserrat', 'Helvetica', sans-serif" >Montserrat</option>
								<option value="'Oxygen', 'Helvetica', sans-serif" >Oxygen</option>
								<option value="'Playfair Display','Georgia', serif" >Playfair Display</option>
								<option value="'Roboto', 'Helvetica', sans-serif" >Roboto</option>
								<option value="'Source Sans Pro','Helvetica', sans-serif" >Source Sans</option>
								<option value="'Staatliches', cursive" >Staatliches</option>
								<option value="'Vollkorn','Georgia', serif" >Volkorn</option>
							</select>
						</div>
						<div className="inputGroup">
							<label className='inputLabel home' htmlFor='headerFont'>Choose your body font:</label>
							<select name='bodyFont' className='homePageSelect' value={this.state.bodyFont} onChange={this.onChange}>
								<option value='"Alegreya", "Georgia", serif'>Alegreya</option>
								<option value="'Cinzel','Georgia', serif" >Cinzel</option>
								<option value="'Helvetica', sans-serif" fontFamily="'Helvetica', sans-serif">Helvetica</option>
								<option value="'Josefin Slab', 'Georgia', serif" fontFamily="'Josefin Slab', serif">Josefin Slab</option>
								<option value="'Kalam', cursive" >Kalam</option>
								<option value="'Karla', 'Helvetica', sans-serif" fontFamily="'Karla', sans-serif">Karla</option>
								<option value="'Lato', 'Helvetica', sans-serif" >Lato</option>
								<option value="'Merriweather', 'Georgia', serif" fontFamily="'Merriweather', serif">Merriweather</option>
								<option value="'Montserrat', 'Helvetica', sans-serif" fontFamily="'Montserrat', sans-serif">Montserrat</option>
								<option value="'Oxygen', 'Helvetica', sans-serif" >Oxygen</option>
								<option value="'Playfair Display','Georgia', serif" >Playfair Display</option>
								<option value="'Roboto', 'Helvetica', sans-serif" fontFamily="'Roboto', sans-serif">Roboto</option>
								<option value="'Source Sans Pro','Helvetica', sans-serif" >Source Sans</option>
								<option value="'Staatliches', cursive" >Staatliches</option>
								<option value="'Vollkorn', 'Georgia', serif" fontFamily="''Vollkorn', serif">Volkorn</option>
							</select>
						</div>
						<br/>
						<h4 className="editingSubTitle"> You may use a preset theme</h4>
						<div className="inputGroup">
							<label className='inputLabel home' htmlFor='theme'>Theme:</label>
							<select name='theme' className='homePageSelect' value={this.state.theme} onChange={this.switchStyle}>
								<option value="none">None</option>
								<option value="autumnSnow">Autumn Snow</option>
								<option value="grayScaleLight">Gray Scale (Light)</option>
								<option value="grayScaleDark">Gray Scale (dark)</option>
								<option value="altDarkTheme">Evening</option>
								<option value="rusticCabin">Rustic Cabin</option>
								<option value="artic">Artic</option>
								<option value="sleekDark">Sleek Dark</option>
								<option value="sleekLight">Sleek Light</option>
							</select>
						</div>
						<br/>
						<h4 className="editingSubTitle"> Or you may customize your own theme</h4>
						<form className='EditorForm'>	 
							<TextStyle id='websiteTitle' name='Website Title' 
								color={this.state.websiteTitleColor} fontSize={this.state.websiteTitleSize} 
								onChange={this.onChange} 
								getParentState={(key)=>this.state[key]} setParentState={this.setState}/>
							<TextStyle id='pageHeader' name='Page Headers' 
								color={this.state.pageHeaderColor} fontSize={this.state.pageHeaderSize} 
								onChange={this.onChange}  
								getParentState={(key)=>this.state[key]} setParentState={this.setState}/>
							<TextStyle id='mediumHeader' name='SubHeaders' 
								color={this.state.mediumHeaderColor} fontSize={this.state.mediumHeaderSize} 
								onChange={this.onChange}  
								getParentState={(key)=>this.state[key]} setParentState={this.setState}/>
							<TextStyle id='smallHeader' name='Sub-SubHeaders' 
								color={this.state.smallHeaderColor} fontSize={this.state.smallHeaderSize} 
								onChange={this.onChange}  
								getParentState={(key)=>this.state[key]} setParentState={this.setState}/>
							<TextStyle id='bodyText' name='Body Text' 
								color={this.state.bodyTextColor} fontSize={this.state.bodyTextSize} 
								onChange={this.onChange}  
								getParentState={(key)=>this.state[key]} setParentState={this.setState}/>
							<TextStyle id='navigationLink' name='Navigation Links' 
								color={this.state.navigationLinkColor} fontSize={this.state.navigationLinkSize} 
								onChange={this.onChange}  
								getParentState={(key)=>this.state[key]} setParentState={this.setState}/>
							<TextStyle id='otherLink' name='Other Links' 
								color={this.state.otherLinkColor} fontSize={this.state.otherLinkSize} 
								onChange={this.onChange}  
								getParentState={(key)=>this.state[key]} setParentState={this.setState}/>
							<TextStyle id='hoverOnLink' name='Hover Links' 
								color={this.state.hoverOnLinkColor} fontSize={this.state.hoverOnLinkSize} 
								onChange={this.onChange}  
								getParentState={(key)=>this.state[key]} setParentState={this.setState}/>
							<TextStyle id='objectText' name='Text in page objects' 
								color={this.state.objectTextColor} fontSize={this.state.objectTextSize} 
								onChange={this.onChange}  
								getParentState={(key)=>this.state[key]} setParentState={this.setState}/>		
							<BackgroundStyle id='titleBackgroundColor' name='website title' 
								color={this.state.titleBackgroundColor} setParentState={this.setState}
								onChange={this.onChange}  
							/>		
							<BackgroundStyle id='navigationBackgroundColor' name='navigation' 
								color={this.state.navigationBackgroundColor} setParentState={this.setState}
								onChange={this.onChange}  
							/>
							<BackgroundStyle id='pageHeaderBackgroundColor' name='page header' 
								color={this.state.pageHeaderBackgroundColor} setParentState={this.setState}
								onChange={this.onChange}  
							/>	
							<BackgroundStyle id='bodyBackgroundColor' name='body' 
								color={this.state.bodyBackgroundColor} setParentState={this.setState}
								onChange={this.onChange}  
							/>	
							<BackgroundStyle id='emphasisBackgroundColor' name='emphasized area' 
								color={this.state.emphasisBackgroundColor} setParentState={this.setState}
								onChange={this.onChange}  
							/>	
							<BackgroundStyle id='objectBackgroundColor' name='Page Objects (such as a galleries page)' 
								color={this.state.objectBackgroundColor} setParentState={this.setState}
								onChange={this.onChange}  
							/>
							<br/>
							<div className="layoutSubmitButtons">
								<button type='submit' className="layoutSubmitButton" value='Save' onClick={this.onSubmit}>Save</button>
								<button type='reset' className="layoutSubmitButton" value='Cancel' onClick={this.onCancel}>Cancel</button>
							</div>
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
			<h3> {props.name} </h3>
			<div className="styleEditGroup">
				<div className="styleInputGroup">
					<label htmlFor={componentColor}> Change color: </label>
					<input type='text' name={componentColor} defaultValue={color} 
						onChange={props.onChange}/>
					<button type="button" name={componentColor} value='Choose Color' 
						onClick={changeSelectorVisibility}>{selectorVisibility ? 'Hide' : "Show"} Color Selector</button>
				</div>
				<div className="styleInputGroup">
					<label htmlFor={`${props.id}Size`} > Change font size: </label>
					<input type='range' className="fontSlider" name={`${props.id}Size`} min='8' max='60' 
						defaultValue={fontSize} onMouseUp={handleFontChange} className='fontSlider'/>
				</div>
				<div>{fontSize}</div>
			</div>
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
			<h2> {props.name} Background Color:</h2>
			<div className="styleEditGroup">
				<input type='text' name={componentColor} defaultValue={color} 
					onChange={props.onChange}/>
				<button type="button" name={componentColor} value='Choose Color' 
					onClick={changeSelectorVisibility}>{selectorVisibility ? 'Hide' : "Show"} Color Selector</button>
			</div>
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
		        	presetColors={
		        		[this.state.websiteTitleColor, this.state.titleBackgroundColor, 
		        		 this.state.pageHeaderColor,  this.state.pageHeaderBackgroundColor, 
		        		 this.state.mediumHeaderColor, this.state.bodytextColor, 
		        		 this.state.bodyBackgroundColor, this.state.navigationLinkColor, 
		        		 this.state.navigationBackgroundColor, this.state.objectTextColor, 
		        		  this.state.objectBackgroundColor]
		        	}
		        	onChangeComplete={ this.handleChangeComplete }
		     	/>
		     </div>
		);
	}
}


 