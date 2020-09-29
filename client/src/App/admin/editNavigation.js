import React, { Component } from 'react';
import axios from 'axios';
import { BackButton, } from 'App/admin/helperComponents';
import PropTypes from "prop-types";

export default class EditNavigation extends Component {
	constructor(props){
		super(props)
		this.state ={
			links:{},
			type

		}

		this.handleChange=this.handleChange.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
	}

	getLinks= () =>{
		let links={};
		axios.get('/getLinks')
		  .then((response) => {
		  	
		  	
		});
	}

	handleChange = (event) => {
		this.setState({[event.target.name]:event.target.value})
	}


	render(){
		return(
			<div className="pageEditor">
			<div className="inputGroup">
				<label className='inputLabel home' htmlFor='type'>Choose your homepage style:</label>
				<select name='type' className='homePageSelect' value={this.state.type} onChange={this.handleChange}>
					<option value='simpleImage'>Simple Image</option>
					<option value='panoramic'>Panoramic</option>
					<option value='fullScreen'>Full Screen Image</option>
					<option value='slideShow'>Slide Show</option>
					<option value='options'>Options</option>
				</select>
			</div>


			</div>



			)
	}

}