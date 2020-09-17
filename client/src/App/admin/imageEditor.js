import React, { Component } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';  // Font Awesome
import PropTypes from 'prop-types';
import ErrorBoundary from 'App/errorBoundary';
import { BackButton } from 'App/admin/helperComponents';

export default class ImageEditor extends Component {
	constructor(props) {
		super(props);
		this.state ={
			images:this.props.images,
			imageURLs:this.props.imageURLs,
			portfolios:[]
		};
		this.getPortfolioTitles=this.getPortfolioTitles.bind(this);
		this.removeImage = this.removeImage.bind(this);
		this.onCancel=this.onCancel.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
   	}

   	componentDidMount(){
		this.getPortfolioTitles();
	}

   	getPortfolioTitles(){
		/* fetch all images from database */
		axios.get('/api/getPortfolioTitles')
		  .then((response) => {
		  	this.setState({portfolios:response.data});
		  });
	}

	removeImage = (index) => {
		console.log(index);
		if(index > -1){
			let values = [...this.state.images];
			values.splice(index, 1);
			this.setState({images:values});
			let urls = this.state.imageURLs;
			urls.splice(index, 1);
			this.setState({imageURLs:urls});
			this.props.removeImageFromParent(index);
		}
	};


	handleInputChange = (index, event) => {
	    const values = [...this.state.images];
	    if (event.target.name==="portfolio" && event.target.value != "No Portfolio"){
	    	values[index]["oldPortfolio"]=values[index]["portfolio"];
	    }
	    values[index][event.target.name]=event.target.value;
	    values[index]["isChanged"]=true;
	    this.setState({images:values});
	};

	onCancel = () =>{
		this.props.history.push('/userPanel');
	}

	onSubmit() {
		let changedImages = [];
		for (let i =0; i<this.state.images.length; i++){
					console.log(this.state.images[i]);

			if (this.state.images[i]['isChanged']){
				changedImages.push(this.state.images[i]);
			}
		};
		this.props.onSubmit(changedImages);
		this.props.history.push('/userPanel');
	}

    render(){
    	if (this.state.imageURLs.length>0){
	    	return(
	    		<div className="pageEditor">
	    			<ErrorBoundary>
          				<BackButton backPage={this.props.backPage}/>
						<h3 className='editingTitle'>Edit Images</h3>
						{(this.state.images).map((img, index) => (
				            <div className='editImageTag' key={img.fileName}>
				              <ImageErrorBoundary src={this.state.imageURLs[index]} title={img.title} portfolio={img.portfolio}/>
				              <input type='text' className='imageField' name='title' value={ img.title } placeholder='Title' onChange={event => this.handleInputChange(index, event)} />
				              <input type='text' className='imageSmallField' name='date' value={ img.date } placeholder='Date' onChange={event => this.handleInputChange(index, event)} />
				              <input type='text' className='imageSmallField' name='medium' value={ img.medium } placeholder='Medium' onChange={event => this.handleInputChange(index, event)} />
				              <input type='text' className='imageSmallField' name='size' value={ img.size } placeholder='Size' onChange={event => this.handleInputChange(index, event)} />
				              <input type='text' className='imageSmallField' name='price' value={ img.price } placeholder='Price' onChange={event => this.handleInputChange(index, event)} />
				              <select className='imageField' name='availability' value={img.availability} onChange={event => this.handleInputChange(index, event)}>            
				                <option value='forSale'>For Sale</option>
				                <option value='notForSale'>Not For Sale</option>
				                <option value='sold'>Sold</option>
				                <option value='other'>Not Applicable</option>
				              </select>
				              <select className='imageField' name='portfolio' value={img.portfolio} onChange={event => this.handleInputChange(index, event)}>            
				                <option value='none'>No Portfolio</option>
				                { 
				                	this.state.portfolios.map((portfolio)=>
				                		<option key={img.title+portfolio} value={portfolio}>{portfolio}</option>
				                	)
				                }
				              </select>
				              <button key={'button'+img.fileName} type='button' className='tooltip btn' onClick={()=>this.removeImage(index)}>
				                <FaTrashAlt />
				                <span className='tooltiptext'>Remove this Image</span>
				              </button>
				            </div>
				        ))}
				    </ErrorBoundary>
			        <button type='button' className='btn' onClick={this.props.backPage}>Cancel</button>
			        <button type='button' className='btn' onClick={this.onSubmit}>Upload</button>

			    </div>
			);
		} else {
			return <h3> No Images to Edit </h3>;
		}
    }
}

class ImageErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
      	<img src="App/upload/defaultImage.png" className='editImageTag uploadImage' alt="This image did not load"/>
      )
    }
    return (
		<img src={this.props.src} className='editImageTag uploadImage' alt={`Image titled ${this.props.title} in portfolio ${this.props.portfolio}`}/>
    )
  }
}

ImageEditor.propTypes={
	images:PropTypes.array,
	imageURLs:PropTypes.array,
	removeImageFromParent:PropTypes.func.isRequired,
	onSubmit:PropTypes.func.isRequired
}
