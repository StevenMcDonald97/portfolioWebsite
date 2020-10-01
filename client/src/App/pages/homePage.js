import React, { Component } from 'react';
import axios from 'axios';
import ImageErrorCatch from 'App/pages/ImageErrorCatch';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Link } from 'react-router-dom';
import {FaAngleLeft, FaAngleRight} from 'react-icons/fa';

export default class HomePage extends Component {
	constructor(props){
		super(props);
		this.state={
			title:"",
			images:['defaultImage.png'],
			imageLinks:[],
			subTitle:'',
			type:"simple"
		}	
	}

	componentDidMount(){
		axios.get('/api/getHomePage').then((response)=>{
	      this.setState({type:response.data.type, title:response.data.name, images:response.data.images, imageLinks:response.data.imageLinks, subTitle:response.data.subHeader })
	    });
	}

	render() {
		const prevArrow = <div className="homeSlideControl left"><FaAngleLeft /></div>;
		const nextArrow = <div className="homeSlideControl right"><FaAngleRight /></div>;

		if (this.state.type==="slideShow"){
			return (
				<div className="page">
				    <div className="slide-container">
				    	<Fade duration={4000} prevArrow={prevArrow} nextArrow={nextArrow}>
					      	{ this.state.images.map((image)=>
								<div key={image} className="each-fade">
								  <div className="image-container">
								    <ImageErrorCatch imgClass="homeSlideImage" src={image} />
								  </div>
								</div>
					      	)}
						</Fade>
					</div>
					<div className="homeText bodyText">
						<div className="homeBodyText mediumHeader">
							{this.state.subTitle}
						</div>
					</div>
				</div>
			)
		} else if (this.state.type==="options"){
			return(
				<div className="page">
					<div className="homeObjectContainer">
						{this.state.images.map((image, index)=>
							<HomeObject key={image} image={image} link={this.state.imageLinks[index]}/>
						)}

					</div>
					<div className="homeText bodyText">
						<div className="homeBodyText mediumHeader">
							{this.state.subTitle}
						</div>
					</div>
				</div>
			);
		} else if (this.state.type==="fullScreen"){
			return(
				<div className="page">
					<div>
						<ImageErrorCatch imgClass="landingImage block fullScreen" src={this.state.images[0]} description={this.props.imgDescription} onClick={()=>{}}/>
					</div>
					<div className="homeText bodyText">
						<div className="homeBodyText mediumHeader">
							{this.state.subTitle}
						</div>
					</div>
				</div>
			);	
		} else {
			return(
				<div className="page">
					<div>
						<ImageErrorCatch imgClass={`landingImage block ${this.state.type}`} src={this.state.images[0]} description={this.props.imgDescription} onClick={()=>{}}/>
					</div>
					<div className="homeText bodyText">
						<div className="homeBodyText mediumHeader">
							{this.state.subTitle}
						</div>
					</div>
				</div>
			);
		}
	}
}

const HomeObject = (props) => {
    return(
        <Link to={`/${props.link.replace(/\s+/g, '')}`} className="homeObject">
            <ImageErrorCatch imgClass="homeObjectImage" src={props.image}/>
            <h3 className="smallHeader">{props.link}</h3>
        </Link>
    )
}




