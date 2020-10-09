import React from 'react';
import sampleImg1 from 'src/App/admin/exampleImages/pic1.jpg';
import sampleImg2 from 'src/App/admin/exampleImages/pic2.jpg';
import sampleImg3 from 'src/App/admin/exampleImages/pic3.jpg';
import PropTypes from 'prop-types';

const StyleVisualization = (props) => {

	const pageStyle = {
 		width:'94vw',
 		height:'100%',
		textAlign:'center',
		margin:'0 auto',
		background:props.values.bodyBackgroundColor,
	};

	const headerStyle = {
		padding:'2vw',
		margin:0,
		color: props.values.websiteTitleColor,
		background:props.values.titleBackgroundColor,
		fontSize:`${props.values.websiteTitleSize}px`,
		fontFamily:props.values.headerFont,
		textAlign:'center'
	};

	const navBarStyle = {
		display: 'block',
		background: props.values.navigationBackgroundColor, 
		fontFamily:props.values.bodyFont,
		width:'100%',
		height:'100%',
		marginTop:0
	} 

	const subPageStyle = {
		width:'80%',
		height:'100%',
		margin:'0 auto',
		verticalAlign: 'top',
		marginTop:0,
		display: 'inline-block',
	};

	const navLinkListStyle = {
		listStyleType: 'none',
		width:'100%',
		margin: 0,
		padding:'1vw',				
		overflow: 'hidden',
		textAlign:'center'
	};

	const navLinkStyle = {
		display: 'inline-block',
		paddingLeft:'2vw',
		paddingRight:'2vw',
		color: props.values.navigationLinkColor,
		textAlign: 'center',
		textDecoration: 'none',
		fontSize: `${props.values.navigationLinkSize}px`, 
		fontFamily:props.values.bodyFont,
		cursor:'pointer'
	} 
 
	const pageHeaderStyle = {
		width:'94vw',
		overflow:"auto",
		padding:'.5em',
		marginTop:'0em',
		color: props.values.pageHeaderColor, 
		fontSize:`${props.values.pageHeaderSize}px`,
		fontFamily:props.values.headerFont,
		textAlign:'center',
		background: props.values.pageHeaderBackgroundColor, 
	};

	const mediumHeaderStyle = {
		color: props.values.mediumHeaderColor, 
		fontSize:`${props.values.mediumHeaderSize}px`,
		fontFamily:props.values.headerFont,
		margin: '.75em',
		textAlign:'center',
		marginBottom:'1em'
	};

	const smallHeaderStyle = {
		color: props.values.smallHeaderColor, 
		fontSize:`${props.values.smallHeaderSize}px`,
		fontFamily:props.values.headerFont,
		margin: '.5em',
		textAlign:'center',
		marginBottom:'1em'
	};

	const bodyStyle = {
		color: props.values.bodyTextColor, 
		fontSize:`${props.values.bodyTextSize}px`,
		fontFamily:props.values.bodyFont,
		margin: '.5em',
		textAlign:'center'
	};

	const otherLinkStyle = {
		color: props.values.otherLinkColor, 
		fontSize:`${props.values.otherLinkSize}px`,
		margin: '.5em',
		textAlign:'center'
	};


	const imageListStyle = {
		listStyleType: 'none',
		width:'100%',
		margin: 0,
		padding:'2vw',				
		overflow: 'hidden',
		textAlign:'center',
		alignItems: 'center',
		justifyContent: 'center',
		background: props.values.emphasisBackgroundColor, 
	}; 

	const imageStyle = {
		display: 'inline-block',
		paddingLeft:'2vw',
		paddingRight:'2vw',
		width:'20vw',
		height:'15vw',
		cursor:'pointer'
	}

	const objectListStyle = {
		listStyleType: 'none',
		width:'100%',
		margin: 0,
		padding:'1vw',				
		overflow: 'hidden',
		textAlign:'center',
	}; 

	const objectStyle = {
		display: 'inline-block',
		paddingLeft:'2vw',
		paddingRight:'2vw',
		width:'12rem',
		height:'15rem',
		margin:"1rem 1rem",
		textAlign:'center',
		background: props.values.objectBackgroundColor, 
	}

	const objectHeaderStyle = {
		fontSize:`${props.values.smallHeaderSize}px`,
	}

	const objectTextStyle = {
		color:props.values.objectTextColor,
		fontSize:`${props.values.objectTextSize}px`,
		fontFamily:props.values.bodyFont,
	}

	const footerStyle = {
		color: props.values.navigationLinkColor, 
		fontSize:`${props.values.navLinkSize}px`,
		fontFamily:props.values.bodyFont,
		backgroundColor: props.values.navBackgroundColor, 
		width:'100v%',
		height:'10vh',
		margin: 0,
		padding: 0
	};


	
	return(
			<div className='StyleVisualization'>
				<h3 className="editingTitle"> Style Visualisation</h3>
				<h4 className="editingSubTitle"> This is how the text and colors on your website will look (this layout is just an example)</h4>
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
				 		<h2 style={pageHeaderStyle}>Page Header</h2>
				 		<div style={subPageStyle}>
				 			<h3 style={mediumHeaderStyle}>Sub Header</h3>
				 			<h4 style={smallHeaderStyle}>SubSubHeader</h4>
				 			<p style={bodyStyle}>Some body text here. Lorem ipsum dolor 
				 				sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
				 				ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
				 				exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
				 			<h3 style={mediumHeaderStyle}>Images</h3>
							<div style={imageListStyle}>
				 				<img style={imageStyle} src={sampleImg1} alt="an Example by Van Gogh"/>
				 				<img style={imageStyle} src={sampleImg2} alt="an Example by Van Gogh"/>
				 				<img style={imageStyle} src={sampleImg3} alt="an Example by Van Gogh"/>
				 			</div>
							<div style={objectListStyle}>
				 				<div style={objectStyle}>
				 					<h5 style={objectHeaderStyle}> Object 1</h5>
				 					<p style={objectTextStyle}> This is an event, workshop, gallery etc </p>
				 				</div>
				 				<div style={objectStyle}>
				 					<h5 style={objectHeaderStyle}> Object 2</h5>
				 					<p style={objectTextStyle}> This is an event, workshop, gallery etc </p>
				 				</div>
				 				<div style={objectStyle}>
				 					<h5 style={objectHeaderStyle}> Object 3</h5>
				 					<p style={objectTextStyle}> This is an event, workshop, gallery etc </p>
				 				</div>
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
		);
};

StyleVisualization.propTypes = {
	values:PropTypes.object.isRequired
};


export default StyleVisualization;

 