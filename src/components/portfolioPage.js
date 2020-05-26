import React, { Component } from 'react';
import PropTypes from "prop-types";


var listOfImages =[];

export default class Portfolio extends Component {

	constructor(props) {
		super(props);
		this.changeModalStateInfo = this.changeModalStateInfo.bind(this);
		this.showModal=this.showModal.bind(this);
	}

	state = {
		showMod: false,
		modImage:"",
		modTitle:""

	  };

	changeModalStateInfo(modImage, modTitle) {
		this.setState({
			modImage: modImage,
			modTitle:modTitle
		})
	}

	showModal = () => {
		this.setState({
			showMod: !this.state.showMod
		});
	};

	importAllImages = r => {
        return r.keys().map(r);
    }
    componentWillMount = ()=> {
        listOfImages = this.importAllImages(require.context('../testimages/', false, /\.(png|jpe?g|svg)$/));
	}
	
	render(){
        return(
          <div>
              {
				listOfImages.map(
					(image, index) =>   
						<Image key={index} url={image} description="painting" title="title" changeModalStateInfo={this.changeModalStateInfo} showModal={this.showModal}></Image>

				)
			  }
			<Modal onClose={this.showModal} show={this.state.showMod} img={this.state.modImage} imgTitle={this.state.modTitle}/>

          </div>
        )
    }
}

class Image extends Component {
	clickImage = imgProps => {
		this.props.changeModalStateInfo(this.props.url, this.props.title);
		this.props.showModal(); 
	}

	render() {
		return (
			<div className="column">
				<div className="content">
					<img className="portfolioImage" src={this.props.url} alt={this.props.description} width="100px" height="100px" onClick = {this.clickImage}/>
				</div>
			</div>
		);
	}
}

class Modal extends Component {

    onClose = e => {
        this.props.onClose && this.props.onClose(e);
	  };
	  
	render() {
		if (!this.props.show) {
			return null;
		}
		return (
			<div className="modal" id="modal">
			<div className="modal-header">
				<span className="close" onClick={this.onClose}>&times;</span>
			</div>
			<div className="inner-modal">
				<div className="arrow-container inline">
					<div className="arrow">&larr;</div>
					</div>
				<div className="modal-content inline">
					<div className="inline">
					<img className="zoomed-image" src={this.props.img} alt="painting"/>
					<h3>{this.props.imgTitle}</h3>
					</div>
				</div>
				<div className="arrow-container inline">
					<div className="inline arrow">&rarr;</div>
				</div>
			</div>
			</div>
		);
	}

}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
  };