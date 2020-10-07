import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import ImageErrorCatch from 'src/App/pages/ImageErrorCatch';

export default class TextPage extends Component {
    constructor(props){
        super(props);
        this.state={
            title:'',
            mainText:'',
            secondaryText:'',
            image:'defaultImage.png'
        }
        this.getPageData=this.getPageData.bind(this);
    }

    getPageData = () =>{
        axios.get('/api/getPage', { params: {pageId: this.props.pageId, pageType:"text" } })
        .then((response) => {
          this.setState({
            title:response.data.title, 
            mainText:response.data.mainText, 
            secondaryText:response.data.subText, 
            image:response.data.imgName, 
            });
        });

    }

    componentDidMount(){
        this.getPageData()
    }

    render(){
        return (
            <div className="page">
                <h2 className="pageHeader"> { this.state.title }</h2>
                <div className="textPage">
                    <div className="textPageMainText bodyText emphasis"> {this.state.mainText} </div>
                    <ImageErrorCatch imgClass="textPageImage" src={this.state.image} description={"Page Image"} clickImage={()=>{}}/>
                    <div className="textPageSecondaryText bodyText emphasis"> {this.state.secondaryText} </div>
                </div>
            </div>
        );
    }
}

TextPage.propTypes = {
    pageId:PropTypes.string
}