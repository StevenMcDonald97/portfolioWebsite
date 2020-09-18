import React, { Component } from 'react';
import axios from 'axios';
import ImageErrorCatch from 'App/pages/ImageErrorCatch';

export default class HomePage extends Component {
	constructor(props){
		super(props);
		this.state={
			title:"",
			img:'defaultImage.png',
			subTitle:'',
			type:"static-box"
		}	
	}

	componentDidMount(){
		axios.get('/api/getHomePage').then((response)=>{
	      this.setState({title:response.data.name, img:response.data.image, subTitle:response.data.subHeader})
	    });
	}

	render() {
		if (this.state.type==="slideShow"){

		} else if (this.state.type==="static-stretch"){
			return(
				<div>
					<div>
						<ImageErrorCatch imgClass="landingImage stretch" src={this.state.img} description={this.props.imgDescription} onClick={()=>{}}/>
					</div>
					<div className="homeText bodyText">
						<div className="homeBodyText pageHeader">
							{this.state.subTitle}
						</div>
					</div>
				</div>
			);
		} else if (this.state.type==="fullscreen"){
			
		} else {
			return(
				<div>
					<div>
						<ImageErrorCatch imgClass="landingImage block" src={this.state.img} description={this.props.imgDescription} onClick={()=>{}}/>
					</div>
					<div className="homeText bodyText">
						<div className="homeBodyText pageHeader">
							{this.state.subTitle}
						</div>
					</div>
				</div>
			);
		}
	}
}