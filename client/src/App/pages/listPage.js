import React, { Component } from 'react';
import axios from 'axios';

export default class ListPage extends Component {
    constructor(props){
        super(props);
        this.state={
            listObjectsData:[]
        }
        this.fetchListObjects=this.fetchListObjects.bind(this);
        this.createListObjects=this.createListObjects.bind(this);
    }

    componentDidMount(){
        this.fetchListObjects();
    }

    fetchListObjects = () =>{
        axios.get('/api/getListObjects', {
            params: {
              Ids: this.props.objectIds
            }
          }).then(function (response) {
            console.log(response);
            this.setState({ listObjectsData:response.data})
          })
        .catch(function (error) {
            console.err(error);
        });
    }

    createListObjects = () =>{
        return(
            this.state.listObjectsData.map((object)=>
                <ListObject img={object.img} title={object.title} text={object.description} />
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
        <div class="pageObject">
            <img class="objectImage" src={props.img}/>
            <h4 class="objectTitle">{props.title}</h4>
            <p class="objectText">{props.text}</p>
        </div>
    )

}

