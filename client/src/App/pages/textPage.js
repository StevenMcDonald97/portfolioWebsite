import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
const images = require.context('App/upload', true);

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
            }, ()=>console.log(this.state));
        });

    }

    componentDidMount(){
        this.getPageData()
    }

    render(){
        console.log("loading text page");
        return (
            <div className="page">
                <div className="textPage">
                    <h2 className="pageHeader"> { this.state.title }</h2>
                    <img src={images(`./${this.state.image}`)}/>
                    <div className="contentMainText"> {this.state.mainText} </div>
                    <div className="contentSecondaryText clearBoth"> {this.state.secondaryText} </div>
                </div>
            </div>
        );
    }
}

TextPage.propTypes = {
    pageId:PropTypes.string
}