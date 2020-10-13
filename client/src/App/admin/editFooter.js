import React, { Component } from 'react';
import axios from 'axios';
import { BackButton } from 'src/App/admin/helperComponents';

export default class EditFooter extends Component{
	constructor(props){
		super(props)
		this.state ={
			message:"",
			facebook:"",
			instagram:"",
			twitter:"",
			etsy:"",
			linkedin:"",
			other:""
		}
		this.handleChange=this.handleChange.bind(this);
    	this.returnToUserPanel=this.returnToUserPanel.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
	}

	// need to load a sorted array of page links
	componentDidMount(){
		axios.get('/api/getFooter').then((response) => {
			this.setState({
				message:response.data.message,
				facebook:response.data.facebook,
				instagram:response.data.instagram,
				twitter:response.data.twitter,
				etsy:response.data.etsy,
				linkedin:response.data.linkedin,
				other:response.data.other   
			});
		});
	}

	handleChange = (event) => {
		this.setState({[event.target.name]:event.target.value})
	}

	returnToUserPanel(){
        this.props.history.push('/userPanel');
    }

    onSubmit(){


    	axios.post("/edit/editFooter", this.state).then((response)=>alert(response.data));
    }

	render(){
		return(
			<div className="pageEditor">
				<BackButton backPage={this.returnToUserPanel}/>
				<h3 className="editingTitle"> You can add an optional footer message and social media links:</h3>
				<div className='inputGroup'>
					<label className='inputLabel' htmlFor='message'>Footer Message:</label>
					<textarea className='pageField' name='message' 
						value={this.state.message} 
						onChange={this.handleChange}/>
				</div>
				<div className='inputGroup'>
					<label className='inputLabel' htmlFor='facebook'>Facebook link:</label>
					<input type='text' className='smallPageField' name='facebook' 
						value={this.state.facebook} 
						onChange={this.handleChange}/>
				</div>
				<div className='inputGroup'>
					<label className='inputLabel' htmlFor='instagram'>Instagram link:</label>
					<input type='text' className='smallPageField' name='instagram' 
						value={this.state.instagram} 
						onChange={this.handleChange}/>
				</div>
				<div className='inputGroup'>
					<label className='inputLabel' htmlFor='twitter'>Twitter link:</label>
					<input type='text' className='smallPageField' name='twitter' 
						value={this.state.twitter} 
						onChange={this.handleChange}/>
				</div>
				<div className='inputGroup'>
					<label className='inputLabel' htmlFor='linkedin'>LinkedIn link:</label>
					<input type='text' className='smallPageField' name='linkedin' 
						value={this.state.linkedin} 
						onChange={this.handleChange}/>
				</div>
				<div className='inputGroup'>
					<label className='inputLabel' htmlFor='etsy'>Etsy link:</label>
					<input type='text' className='smallPageField' name='etsy' 
						value={this.state.etsy} 
						onChange={this.handleChange}/>
				</div>
				<div className='inputGroup'>
					<label className='inputLabel' htmlFor='other'>Other social media:</label>
					<input type='text' className='smallPageField' name='other' 
						value={this.state.other} 
						onChange={this.handleChange}/>
				</div>
				<div className="layoutSubmitButtons">
					<button type="button" className="layoutSubmitButton" 
						onClick={this.onSubmit}>
				    	Submit Changes
					</button>
					<button type="button" className="layoutSubmitButton" 
						onClick={this.returnToUserPanel}>
				    	Cancel
					</button>
				</div>


			</div>

		)
	}
}


