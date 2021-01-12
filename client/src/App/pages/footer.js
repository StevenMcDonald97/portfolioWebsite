import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {FaFacebook, FaLinkedin, FaTwitter, FaEtsy, FaInstagram, FaShareSquare} from 'react-icons/fa';
import ErrorBoundary from 'src/App/errorBoundary';

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message:"",
      facebook:"",
      instagram:"",
      twitter:"",
      etsy:"",
      linkedin:"",
      other:[]
    };
  }

  componentDidMount() {
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


  render(){
  	return(
        <ErrorBoundary>
          <div className={`footer ${this.props.footerClass}`}>
            <div className="footerText"> {this.state.message} </div>
            <ul className='navbar-links'>
              { this.state.facebook ? <li className="footerLink"><a href={this.state.facebook} className="footerLink"><FaFacebook /></a></li>   : null}
              { this.state.instagram ? <li className="footerLink"><a href={this.state.instagram} className="footerLink"><FaInstagram /></a></li>   : null}
              { this.state.twitter ?  <li className="footerLink"><a href={this.state.twitter} className="footerLink"><FaTwitter /></a></li>   : null}
              { this.state.linkedin ? <li className="footerLink"><a href={this.state.linkedin} className="footerLink"><FaLinkedin /></a></li>   : null}
              { this.state.etsy ? <li className="footerLink"><a href={this.state.etsy} className="footerLink"><FaEtsy /></a></li>   : null}
              { this.state.other ? <li className="footerLink"><a href={this.state.other} className="footerLink"><FaShareSquare /></a></li>   : null}
            </ul>
          </div>
        </ErrorBoundary >
    );
  }

}

