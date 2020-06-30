import React, { Component } from 'react';


export default class EditImages extends Component {


    render(){




    }


}
// for each image in the database (maybe 20 at a time?), creat an edit form
// populated by the iamge data and the available portfolios. 
// on submit, validate all forms for titles then update database

function ImageData(props){

	return (
		<div className="ImageData">
			<img src={ prop.url }/>
			<form>
		        <label>Artwork Title</label>
		        <input type="text" name="title" />
		       	<label>Size</label>
		        <input type="text" name="size" />
		        <label>Date</label>
		        <input type="text" name="date" />
		        <label>Medium</label>
		        <input type="text" name="medium" />		        		        
		        <label>Portfolio</label>
		        <select id="cars" name="cars">
				    <option value="portfolio1">One</option>
				    <option value="portfolio2">Two</option>
				</select>
	      </form>
		</div>

		)

}