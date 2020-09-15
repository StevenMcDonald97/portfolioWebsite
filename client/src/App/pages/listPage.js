import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export default class ListPage extends Component {
    constructor(props){
        super(props);
        this.state={
            title:"",
            listObjectsData:[]
        }
        this.loadPage = this.loadPage.bind(this);
        this.createListObjects=this.createListObjects.bind(this);
    }

    componentDidMount(){
        this.loadPage();
    }

    loadPage = () =>{
        console.log(this.props);
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
                <ListObject key={object._id} img={object.img} title={object.title} text={object.description} />
            )
        )
    }

    render(){
        return (
            <div className="page">
                <div className="listPage">
                    <h2 className="pageHeader"> { this.props.title }</h2>
                    <div className="contentMainText"> { this.props.mainText } </div>
                    <div className="listObjects">
                        { this.createListObjects() }
                    </div>
                </div>
            </div>
        );
    }
}


const ListObject = (props) => {
    return(
        <div className="pageObject">
            <img className="objectImage" src={props.img}/>
            <h4 className="objectTitle">{props.title}</h4>
            <h5 className="objectBlurb">{props.blurb}</h5>
            <p className="objectText">{props.text}</p>
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