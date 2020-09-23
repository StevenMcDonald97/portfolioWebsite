import React from 'react';
import sampleImg1 from 'App/admin/exampleImages/pic1.jpg';
import sampleImg2 from 'App/admin/exampleImages/pic2.jpg';
import sampleImg3 from 'App/admin/exampleImages/pic3.jpg';
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
		textAlign:'center'
	};

	const navBarStyle = {
		display: 'block',
		background: props.values.navigationBackgroundColor, 
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
		cursor:'pointer'
	} 
 
	const pageHeaderStyle = {
		width:'94vw',
		overflow:"auto",
		padding:'.5em',
		marginTop:'0em',
		color: props.values.pageHeaderColor, 
		fontSize:`${props.values.pageHeaderSize}px`,
		textAlign:'center',
		background: props.values.pageHeaderBackgroundColor, 
	};

	const mediumHeaderStyle = {
		color: props.values.mediumHeaderColor, 
		fontSize:`${props.values.mediumHeaderSize}px`,
		margin: '.75em',
		textAlign:'center',
		marginBottom:'1em'
	};

	const smallHeaderStyle = {
		color: props.values.smallHeaderColor, 
		fontSize:`${props.values.smallHeaderSize}px`,
		margin: '.5em',
		textAlign:'center',
		marginBottom:'1em'
	};

	const bodyStyle = {
		color: props.values.bodyTextColor, 
		fontSize:`${props.values.bodyTextSize}px`,
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
		width:'25vw',
		height:'20vw',
		textAlign:'center',
		background: props.values.objectBackgroundColor, 
	}

	const footerStyle = {
		color: props.values.navLinkColor, 
		fontSize:`${props.values.navLinkSize}px`,
		backgroundColor: props.values.navBackgroundColor, 
		width:'100v%',
		height:'10vh',
		margin: 0,
		padding: 0
	};


	
	return(
			<div className='StyleVisualization'>
				<h2> Style Visualisation</h2>
				<div> This is how the colors on your website will look (this layout is just an example)</div>
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

 