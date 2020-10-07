import React, { Component } from 'react';
console.log(process.env.PUBLIC_URL);
const images = require.context('../images', true);

export default class ImageErrorCatch extends Component {
  render() {
    try{
        return <img className={this.props.imgClass} src={images(`./${this.props.src}`)} alt={this.props.description} onClick = {this.props.clickImage}/>
    } catch (e){
        console.log(e);
        return <img className={this.props.imgClass} src={images('./defaultImage.png')} alt={this.props.description} onClick = {this.props.clickImage}/>
    }
  }
}