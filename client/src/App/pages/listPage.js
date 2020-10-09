import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Modal from 'src/App/pages/modal';
import ImageErrorCatch from 'src/App/pages/ImageErrorCatch';

export default class ListPage extends Component {
    constructor(props){
        super(props);
        this.state={
            title:"",
            listObjectsData:[],
            showModal:false,
            modalImage:'',
            modalTitle:'',
            modalBlurb:'',
            modalText:''
        }
        this.showModal=this.showModal.bind(this);
        this.loadPage = this.loadPage.bind(this);
        this.createListObjects=this.createListObjects.bind(this);
        this.changeModalStateInfo=this.changeModalStateInfo.bind(this);
    }

    componentDidMount(){
        this.loadPage();
    }

    showModal = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    };

    loadPage = () =>{
        var self = this;
        axios.get('/api/getPage', {
            params: {
                pageId:this.props.pageId,
                pageType:"list"
            }
        }).then(function(response){
            self.setState({
                title:response.data.title,
                listObjectsData:response.data.childObjects
            });
        }).catch(function (error) {
            console.log(error);
        });
    }

    createListObjects = () =>{
        
        return(
            this.state.listObjectsData.map((object)=>
                <ListObject key={object._id} img={object.imgName} title={object.title} blurb={object.blurb} text={object.description} changeModalStateInfo={this.changeModalStateInfo} showModal={this.showModal}/>
            )
        )
    }

    changeModalStateInfo(image, title, blurb, text) {
        console.log(image);
        this.setState({
            modalImage: image,
            modalTitle: title,
            modalBlurb: blurb,
            modalText: text
        })
    }

    render(){
        var modalBody = <ListModalContent image={this.state.modalImage} title={this.state.modalTitle} blurb={this.state.modalBlurb} text={this.state.modalText}/>;
        return (
            <div className="page">
                <div className="listPage">
                    <h2 className="pageHeader"> { this.state.title }</h2>
                    <div className="bodyText center"> { this.props.mainText } </div>
                    <div className="listObjects">
                        { this.createListObjects() }
                    </div>
                    <Modal onClose={ this.showModal } show={ this.state.showModal} content={ modalBody }/>
                </div>
            </div>
        );
    }
}

const ListModalContent = (props) =>{
    return(
        <div className="listObjectContainer">
            { props.image ? <ImageErrorCatch imgClass="listModalImage" src={props.image} description={""}/> : "" }
            <h2 className="mediumHeader modalText">{props.title}</h2>
            <div className="listModalTextContainer">
                <p className="bodyText modalText">{props.text}</p>
            </div>
        </div>
    )
}

const ListObject = (props) => {
    const clickObject = () => {
        props.changeModalStateInfo(props.img, props.title, props.blurb, props.text);
        props.showModal(); 
    }

    return(
        <div className="listPageObject" onClick={clickObject}>
            <div className="objectTitle">{props.title}</div>
            <div className="objectBlurb">{props.blurb}</div>
        </div>
    )

}

ListPage.propTypes = {
  title: PropTypes.string,
  mainText: PropTypes.string,
  objectIds:PropTypes.array
};

ListObject.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  img:PropTypes.string
};