import React, { Component } from 'react';
const images = require.context('App/upload', true);

export default class ImageErrorCatch extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  render() {
    try{
        return <img className={this.props.imgClass} src={images(`./${this.props.src}`)} alt={this.props.description} onClick = {this.props.clickImage}/>
    } catch (e){
        console.log(e);
        return <img className={this.props.imgClass} src={images('./defaultImage.png')} alt={this.props.description} onClick = {this.props.clickImage}/>
    }
  }
}