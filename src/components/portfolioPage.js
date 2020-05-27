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
		modalImage:"",
		modalTitle:"",
		imageKey:-1,
	  };

	changeModalStateInfo(modalImage, modalTitle, modalKey) {
		this.setState({
			modalImage: modalImage,
			modalTitle:modalTitle,
			imageKey:modalKey
		})
		console.log(this.state.imageKey);
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
		var dir=''+this.props.imgDirectory;

        listOfImages = this.importAllImages(require.context('../testimages/', false, /\.(png|jpe?g|svg)$/));
	}
	
	render(){
        return(
          <div>
              {
				listOfImages.map(
					(image, index) =>   
						<Image key={index} imgIndex={index} url={image} description="painting" title="title" changeModalStateInfo={this.changeModalStateInfo} showModal={this.showModal}></Image>
				)
			  }
			<Modal onClose={this.showModal} show={this.state.showMod} img={this.state.modalImage} imgTitle={this.state.modalTitle} modalKey={this.state.imageKey} changeModalStateInfo={this.changeModalStateInfo}/>

          </div>
        )
    }
}

class Image extends Component {
	clickImage = () => {
		this.props.changeModalStateInfo(this.props.url, this.props.title, this.props.imgIndex);
		this.props.showModal(); 
	}

	render() {
		return (
			<div className="column">
				<div className="content">
					<img className="portfolioImage" src={this.props.url} alt={this.props.description} onClick = {this.clickImage}/>
				</div>
			</div>
		);
	}
}

class Modal extends Component {

    onClose = e => {
        this.props.onClose && this.props.onClose(e);
	  };

	incrementImage = () => {
		var newKey;
		var newImage;
		if ((this.props.modalKey<listOfImages.length-1)){
			newKey = this.props.modalKey+1;
			newImage = listOfImages[newKey];
			this.props.changeModalStateInfo(newImage, "title", newKey);

		}

	}

	decrementImage = () => {
		var newKey;
		var newImage;
		if ((this.props.modalKey>0)){
			newKey = this.props.modalKey-1;
			newImage = listOfImages[newKey];
			this.props.changeModalStateInfo(newImage, "title", newKey);
		}

	}
  
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
					<div className="arrow" onClick={()=>this.decrementImage()}>&larr;</div>
					</div>
				<div className="modal-content inline">
					<div className="inline">
					<img className="zoomed-image" src={this.props.img} alt="painting"/>
					<h3 className="imgTitle">{this.props.imgTitle}</h3>
					</div>
				</div>
				<div className="arrow-container inline">
					<div className="inline arrow" onClick={()=>this.incrementImage()}>&rarr;</div>
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