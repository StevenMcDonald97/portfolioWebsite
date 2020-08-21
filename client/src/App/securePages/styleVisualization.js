import React, { Component, useState } from 'react';
import sampleImg1 from "App/securePages/exampleImages/pic1.jpg";
import sampleImg2 from "App/securePages/exampleImages/pic2.jpg";
import sampleImg3 from "App/securePages/exampleImages/pic3.jpg";

const StyleVisualization = (props) => {

	const pageStyle = {
 		width:"94%",
 		height:"100%",
		margin:'3%',
		backgroundColor:props.values.contentBackgroundColor,
	}

	const headerStyle = {
		padding:"2vw",
		margin:0,
		color: props.values.websiteTitleColor,
		backgroundColor:props.values.titleBackgroundColor,
		fontSize:`${props.values.websiteTitleSize}px`,
		textAlign:'center'
	}

	const navBarStyle = props.values.navOrientation === "Horizontal" ? {
		display: 'block',
		backgroundColor: props.values.navBackgroundColor, 
		width:"100%",
		height:"100%",
		marginTop:0
	} : {
		display: 'inline-block',
		backgroundColor: props.values.navBackgroundColor, 
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

	const navLinkStyle = props.values.navOrientation === "Horizontal" ? {
		display: 'inline-block',
		paddingLeft:'2vw',
		paddingRight:'2vw',
		color: props.values.navigationLinkColor,
		textAlign: 'center',
		textDecoration: 'none',
		fontSize: `${props.values.navigationLinkSize}px`, 
		cursor:'pointer'
	} : {
		display: 'block',
		paddingLeft:'2vw',
		paddingRight:'2vw',
		marginTop:"4vh",
		color: props.values.navigationLinkColor,
		textAlign: 'center',
		textDecoration: 'none',
		fontSize: `${props.values.navigationLinkSize}px`, 
		cursor:'pointer'
	}
 
	const pageHeaderStyle = {
		color: props.values.pageHeaderColor, 
		fontSize:`${props.values.pageHeaderSize}px`,
		margin: '1em',
		textAlign:'center'
	}

	const mediumHeaderStyle = {
		color: props.values.mediumHeaderColor, 
		fontSize:`${props.values.mediumHeaderSize}px`,
		margin: '.75em',
		textAlign:'center'
	}

	const smallHeaderStyle = {
		color: props.values.smallHeaderColor, 
		fontSize:`${props.values.smallHeaderSize}px`,
		margin: '.5em',
		textAlign:'center'
	}

	const descriptionStyle = {
		color: props.values.descriptionTextColor, 
		fontSize:`${props.values.descriptionTextSize}px`,
		margin: '.5em',
		textAlign:'center'
	}

	const otherLinkStyle = {
		color: props.values.otherLinkColor, 
		fontSize:`${props.values.otherLinkSize}px`,
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

	const imageStyle = props.values.portfolioArrangement === "Vertical" ?  
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
		color: props.values.navLinkColor, 
		fontSize:`${props.values.navLinkSize}px`,
		backgroundColor: props.values.navBackgroundColor, 
		width:'100v%',
		height:'10vh',
		margin: 0,
		padding: 0
	}


	
	return(
			<div className="StyleVisualization">
				<h2> Style Visualisation</h2>
				<div> This is how the styling will look on your website </div>
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

			</div>
		)
}


export default StyleVisualization;

 