import React, { Component } from 'react';


export default class ContentPage extends Component {


    render(){
        
        return (
            <div className="contentBody">
                <h2 className="pageHeader"> { this.props.title }</h2>
                <div>{this.props.image}</div>
                <div className="contentMainText"> {this.props.mainText} </div>
                <div className="contentSecondaryText clearBoth"> {this.props.secondaryText} </div>
            </div>
        );
    }


}