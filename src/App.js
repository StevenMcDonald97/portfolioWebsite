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
import Portfolio from "./components/portfolioPage";

import * as serviceWorker from './serviceWorker';

const links=[];
const testLink={name:"home", url:"./index.html"};
const aboutLink={name:"about", url:"./index.html"};

links[0]=testLink;
links[1]=aboutLink;

export default class App extends Component {

  state = {
    showMod: false
  };
  showModal = e => {
    this.setState({
      showMod: !this.state.showMod
    });
  };

  render(){
    return (
      <React.StrictMode>
        <Header name="Steven" links={ links }/>
        {/* <button  onClick={() => {this.showModal(); }}> show Modal </button> */}

        {/* <Modal onClose={this.showModal} show={this.state.showMod}>
          Message in Modal
        </Modal> */}
        <Portfolio></Portfolio>
      </React.StrictMode>
    );
  }
}

