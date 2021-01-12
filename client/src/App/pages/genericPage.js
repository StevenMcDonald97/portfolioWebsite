import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Modal from 'src/App/pages/modal';
import ImageErrorCatch from 'src/App/pages/ImageErrorCatch';
const audioContext = require.context('../audio', true);
const images = require.context('../images', true);

export default class GenericPage extends Component {
    constructor(props){
        super(props);
        this.state={
            title:props.title,
            paragraphs:[],
            images:[],
            video:[],
            audio:[],
            imageText:[],
            videoText:[],
            audioText:[]
        }
        this.loadPage = this.loadPage.bind(this);
    }

    componentDidMount(){
        this.loadPage();
    }

    loadPage = () =>{
        const self=this;
        axios.get('/api/getPage', {
            params: {
                pageId:this.props.pageId,
                pageType:"genericPage"
            }
        }).then(function(response){
            let newState = {};
            newState.title= response.data.title ? response.data.title : "Title";
            newState.paragraphs= response.data.paragraphs ? response.data.paragraphs : [];
            newState.images= response.data.imageNames ? response.data.imageNames : [];
            newState.imageText= response.data.imageText ? response.data.imageText : [];
            newState.audio= response.data.audioNames ? response.data.audioNames : [];
            newState.audioText= response.data.audioText ? response.data.audioText : [];
            newState.video= response.data.videoLinks ? response.data.videoLinks : [];
            newState.videoText= response.data.videoText ? response.data.videoText : [];
            self.setState(newState);
        }).catch(function (error) {
            console.log(error);
        });
    }



    render(){
        const create_paragraphs = this.state.paragraphs.map((paragraph, index)=>
            <p key={index} className="blogParagraph bodyText">
                { paragraph }
            </p>
        );

        const create_images = this.state.images.map((image, index)=>
            <div key={index}>
                <ImageErrorCatch imgClass="genericPageImage" src={ image } description={" "} clickImage={()=>{}}/>
                <p key={index} className="blogParagraph bodyText">
                    { this.state.imageText[index] }
                </p>  
            </div>
        );

        const create_audio = this.state.audio.map((audio, index)=>{
           try {
                return( <div key={index}>
                            <audio controls>
                              <source src={audioContext(`./${audio}`)}/>
                            Your browser does not support the audio element.
                            </audio>
                            <p key={index} className="blogParagraph bodyText">
                                { this.state.audioText[index] }
                            </p>  
                        </div>);
           } catch (error){
                console.log(error);
                return( <div key={index}>
                            <div> Cannot Find Audio File </div>
                            <p key={index} className="blogParagraph bodyText">
                                { this.state.audioText[index] }
                            </p>  
                        </div>);
           }
           
        }

        );

        const create_video = this.state.video.map((video, index)=>
            <div key={index}>
                <iframe src={video.replace("watch?v=", "embed/")}
                        className="genericPageVideo"
                        frameBorder='0'
                        allow='autoplay; encrypted-media'
                        allowFullScreen
                        title='video'
                />
                <p key={index} className="blogParagraph bodyText">
                    { this.state.videoText[index] }
                </p>  
            </div>
        );

        return (
            <div className="page">
                <div className="listPage">
                    <h2 className="pageHeader"> { this.state.title }</h2>
                    { create_paragraphs }
                     { this.state.images.length>0  
                        ? <div>
                            <h3 className="mediumHeader"> Gallery </h3>
                            { create_images }
                        </div> : null 
                    } 

                    { this.state.video.length>0  
                        ? <div>
                            <h3 className="mediumHeader"> Watch </h3>
                            { create_video }
                        </div> : null
                    }

                    { this.state.audio.length>0
                        ? <div>
                            <h3 className="mediumHeader"> Listen </h3>
                            { create_audio }
                        </div>:null
                    }
                </div>
            </div>
        );
    }
}

