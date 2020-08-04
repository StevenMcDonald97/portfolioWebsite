import React, { Component } from 'react';
import axios from 'axios'

export default class Contact extends Component {
  constructor(props){
    super(props);
    this.state = {
      formData = {
        name:'',
        email:'',
        message:''
      },
      errors = {}
    }
  }

  
  resetForm(){
    this.setState({name: '', email:'', message:''})
  }


  onChange(field, e){         
      let fields = this.state.fields;
      fields[field] = e.target.value;        
      this.setState({fields});
  }


  handleValidation(){
    const fields = this.state;
    let errors = {}; 
    let formIsValid = true;

    if (!fields.name){
      formIsValid = false;
      errors['name'] = "Cannot be empty";
    }

    if(!fields["email"]){
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }

    if (typeof fields["email"] !== "undefined"){
      let lastPositionOfAt = fields["email"].lastIndexOf('@');
      let lastPositionOfPeriod = fields["email"].lastIndexOf('.');
      if(!(lastPositionOfAt < lastPositionOfPeriod && lastPositionOfAt > 0 
          && fields["email"].indexOf('@@') == -1 && lastPositionOfPeriod>2 
          && (fields["email"].length - lastPositionOfPeriod) > 2)) {

            formisValid=false
            errors["email"] = "Must be a valid email address";

    }

    if (!fields.message){
      formIsValid = false;
      errors['message'] = "Please enter a message";
    }

    this.setState({errors: errors});
    return formIsValid;

  }

  handleSubmit(event) {
      event.preventDefault();

    axios({
      method: "POST", 
      url:"/api/SendEmail/", 
      data:  this.state
    }).then((response)=>{
      if (response.data.status === 'success'){
        alert("Message Sent."); 
        this.resetForm()
      } else if(response.data.status === 'fail'){
        alert("Message failed to send.")
      }
    })

  }

  render(){
    return(
      <form className="contactForm" name="contactForm" 
        onSubmit={this.handleSubmit.bind(this)} method="post">
        <div className="formBody">
            <div className="formGroup">
              <label htmlFor="recipientName" className="formLabel">Your Name:</label>
              <input type="text" className="formInput" value={this.state.formdata.name} 
                onChange={this.onChange.bind(this, "name")} required/>
                <span style={{color: "red"}}>{this.state.errors["name"]}</span>
            </div>
            <div className="formGroup">
              <label htmlFor="recipient-email" className="formLabel">Your Email:</label>
              <input type="text" className="formInput" value={this.state.formData.email} 
                onChange={this.onChange.bind(this, "email")}  required/>
                <span style={{color: "red"}}>{this.state.errors["email"]}</span>
            </div>
            <div className="formGroup">
              <label htmlFor="message-text" className="formLabel">Message:</label>
              <textarea className="formInput" name="message" value={this.state.formData.message} 
                onChange={this.onChange.bind(this, "message")} required></textarea>
                <span style={{color: "red"}}>{this.state.errors["message"]}</span>
            </div>
        </div>
        <div className="modal-footer">
          <button type="submit" className="submitButton">Send</button>
        </div>
      </form>
    )
  }


}


