import React, { Component } from 'react';
import HomeImage from "App/testimages/home.jpg";
import axios from 'axios';
const images = require.context('App/upload', true);

export default class HomePage extends Component {
	constructor(props){
		super(props);
		this.state={
			title:"",
			img:'defaultImage.png',
			subTitle:''
		}	
	}

	componentDidMount(){
		axios.get('/api/getHomePage').then((response)=>{
	      console.log(response.data);
	      this.setState({title:response.data.name, img:response.data.image, subTitle:response.data.subHeader})
	    });
	}

	render() {
		return(
			<div>
				<div>
					<img className="landingImage" src={this.state.img ? images(`./${this.state.img}`) : images(`./defaultImage.png`)} alt={this.props.imgDescription}/>
				</div>
				<div className="homeText bodyText">
					<div className="homeBodyText">
						{this.state.subTitle}
					</div>
				</div>
			</div>
		);
	}
}