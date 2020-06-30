//component for creating a registration form for a new user
import React, { Component } from 'react';

export default class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name:'',
			email : '',
			password: ''
		}
	}

	handleInputChange = (event) => {
		const {value, name} = event.target;
			this.setState({
				[name]:value
		});
	}

	onSubmit = (event) => {
		event.preventDefault();
		fetch('/user/register',{
			method:'POST',
			body:JSON.stringify(this.state),
			headers:{
				'Content-Type': 'application/json'
			}
		})
		.then(res => {
			if(res.status===200){
				this.props.history.push('/');
			} else {
				const error = new Error(res.error);
				throw error;
			}
		})
		.catch(err=>{
			console.error(err);
			alert('Error registering, please try again');
		});
	}

	render() {
		return (
			<form className="registrationForm" onSubmit={this.onSubmit}>
		        <h1>Welcome! To get start please enter your information below:</h1>
		        <input
		          type="name"
		          name="name"
		          className="formInput"
		          placeholder="Enter your name"
		          value={this.state.name}
		          onChange={this.handleInputChange}
		          required
		        />
		        <input
		          type="email"
		          name="email"
		          className="formInput"
		          placeholder="Enter your email"
		          value={this.state.email}
		          onChange={this.handleInputChange}
		          required
		        />
		        <input
		          type="password"
		          name="password"
		          className="formInput"
		          placeholder="Enter a password"
		          value={this.state.password}
		          onChange={this.handleInputChange}
		          required
		        />
		       <input type="submit" value="Submit"/>
      		</form>
    );
  }
}