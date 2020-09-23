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

}