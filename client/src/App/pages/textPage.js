import React, { Component } from 'react';
import axios from 'axios';

export default class TextPage extends Component {
    constructor(props){
        super(props);
        this.state={
            title:'',
            mainText:'',
            secondText:'',
            image:''
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
            image:response.data.img, 
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
                    <img src={`app/upload/${this.state.image}`}/>
                    <div className="contentMainText"> {this.state.mainText} </div>
                    <div className="contentSecondaryText clearBoth"> {this.state.secondText} </div>
                </div>
            </div>
        );
    }
}