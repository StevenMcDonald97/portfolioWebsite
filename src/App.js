import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './CSS/header.css';
import './CSS/main.css';
import './CSS/portfolio.css';
import './CSS/footer.css';
import './CSS/modal.css';

import Header from './components/Header';
// import Modal from "./components/test-modal";
// import Portfolio from "./components/portfolioPage";

import * as serviceWorker from './serviceWorker';

const links=[];
const testLink={name:"home"};
const aboutLink={name:"about"};
const portfolioLink={name:"portfolio", type:"portfolio"};

links[0]=testLink;
links[1]=aboutLink;
links[2]=portfolioLink;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.setBodyState=this.setBodyState.bind(this)
  }

  state = {
    showMod: false,
    body:<div></div>,
  };



  setBodyState = content => {
    console.log("Test");
    this.setState({body:content})
  }

  showModal = e => {
    this.setState({
      showMod: !this.state.showMod
    });
  };

  render(){
    return (
      <React.StrictMode>
        <Header name="Steven" links={ links } setBodyState={this.setBodyState}/>
        {/* <button  onClick={() => {this.showModal(); }}> show Modal </button> */}

        {/* <Modal onClose={this.showModal} show={this.state.showMod}>
          Message in Modal
        </Modal> */}
        {/* <Portfolio imgDirectory='../testimages/'></Portfolio> */}
        {this.state.body}
      </React.StrictMode>
    );
  }
}



