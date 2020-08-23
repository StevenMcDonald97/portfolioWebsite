import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';
import Modal from 'App/pages/modal'
var listOfImages =[];
const images = require.context('App/upload', true);

export default class Portfolio extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title:'',
            description:'',
            imageNames:[],
            showMod: false,
            modalImage:{},
            imageKey:-1
          };
        this.changeModalStateInfo = this.changeModalStateInfo.bind(this);
        this.showModal=this.showModal.bind(this);
        this.getPageData=this.getPageData.bind(this);
        this.getPortfolioImages=this.getPortfolioImages.bind(this);
    }

    getPageData = () =>{
        axios.get('/api/getPage', { params: {pageId: this.props.pageId, pageType:"portfolio" } })
        .then((response) => {
          this.setState({
            title:response.data.title, 
            description:response.data.description, 
            imageNames:response.data.imageFileNames, 
            }, ()=>this.getPortfolioImages());
        });
    }

    getPortfolioImages = () => {
        axios.get(
            '/api/getPortfolioImages', 
            { params: {imageNames:this.state.imageNames} }
        ).then((response)=>{
            listOfImages=response.data
        });
    }

    componentDidMount(){
        this.getPageData();
    }


    changeModalStateInfo(modalImage, modalKey) {
        this.setState({
            modalImage: modalImage,
            imageKey:modalKey
        })
    }

    showModal = () => {
        this.setState({
            showMod: !this.state.showMod
        });
    };



    
    render(){
        return(
          <div className="row">
              {
                listOfImages.map(
                    (image, index) =>   
                        <Image key={index} imgKey={index} img={image} description="A painting" changeModalStateInfo={this.changeModalStateInfo} showModal={this.showModal}></Image>
                )
              }
            <PortfolioModal onClose={this.showModal} show={this.state.showMod} img={this.state.modalImage} modalKey={this.state.imageKey} changeModalStateInfo={this.changeModalStateInfo}/>

          </div>
        )
    }
}

class Image extends Component {
    clickImage = () => {
        this.props.changeModalStateInfo(this.props.img, this.props.imgKey);
        this.props.showModal(); 
    }

    render() {
        return (
            <div className="column">
                <div className="content">
                    <img className="portfolioImage" src={images(`./${this.props.img.fileName}`)} alt={this.props.description} onClick = {this.clickImage}/>
                </div>
            </div>
        );
    }
}

// a different modal component is used here because it needs to be able to 
// flip through images
class PortfolioModal extends Component {

    onClose = e => {
        this.props.onClose && this.props.onClose(e);
      };

    incrementImage = () => {
        var newKey;
        var newImage;
        if ((this.props.modalKey<listOfImages.length-1)){
            newKey = this.props.modalKey+1;
            newImage = listOfImages[newKey];
            this.props.changeModalStateInfo(newImage, newKey);
        }
    }

    decrementImage = () => {
        var newKey;
        var newImage;
        if ((this.props.modalKey>0)){
            newKey = this.props.modalKey-1;
            newImage = listOfImages[newKey];
            this.props.changeModalStateInfo(newImage, newKey);
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
                            <img className="zoomed-image" src={images(`./${this.props.img.fileName}`)} alt="artwork"/>
                            <h3 className="portfolioImgTitle">
                                {this.props.img.title}
                            </h3>
                            <h4 className="portfolioImgInfo">
                                { (this.props.img.size) ? this.props.img.size : "" } { (this.props.img.medium) ? this.props.img.medium : ""} {  (this.props.img.price) ? this.props.img.price : "" } {  (this.props.img.date) ? this.props.img.date : "" }
                            </h4>

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