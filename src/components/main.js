import React, { Component } from 'react';
import HomePage from "./homepage.js";
import Portfolio from "./pomepage.js";
import Galleries from "./galleries.js";
import About from "./aboutPage.js";
import Contact from "./contact.js";



export default class Main extends Component {
		constructor(props){
			super(props);
			this.state = {currentPage: "Home"};
		}
		render() {
			if (this.state.currentPage=="Home"){
				return (
					<HomePage />
				);
			} else if (this.state.currentPage=="Portfolio"){
				return (
					<Portfolio />
				);
			} else if (this.state.currentPage=="About"){
				return (
					<About />
				);
			} else if (this.state.currentPage=="Galleries"){
				return (
					<Galleries />
				);
			} else if (this.state.currentPage=="Contact"){
				return (
					<Contact />
				);
			}


		}

}