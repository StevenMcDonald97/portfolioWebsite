import React, { Component } from 'react';


export default class Contact extends Component {

  render(){
    return(
      <form id="reused_form" action="" name="contact_form" method="post">
        <div className="modal-body">
            <div className="form-group">
              <label htmlFor="recipient-name" className="col-form-label">Your Name:</label>
              <input type="text" className="form-control" id="recipient-name" name="name" placeholder="your name..." required/>
            </div>
            <div className="form-group">
              <label htmlFor="recipient-email" className="col-form-label">Your Email:</label>
              <input type="text" className="form-control" id="recipient-email" name="email" placeholder="john@example.com" required/>
            </div>
            <div className="form-group">
              <label htmlFor="message-text" className="col-form-label">Message:</label>
              <textarea className="form-control" id="message-text" name="message" placeholder="Your message..." required></textarea>
            </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary custom-button" data-dismiss="modal">Close</button>
          <input id="contact-submit" type="submit" className="btn btn-secondary custom-button"  value="Send Message"/>
        </div>
      </form>
    )
  }

}


