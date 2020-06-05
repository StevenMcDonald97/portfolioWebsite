import React, { Component } from 'react';
import HomeImage from "../testimages/home.jpg";
export default class HomePage extends Component {

		render() {
			return(
				<div>
					<div>
						<img className="landingImage" src={HomeImage} alt={this.props.imgDescription}/>

					</div>

					<div className="homeText bodyText">
						{/* <h2 className="headerText">
							{this.props.heading}
						</h2> */}
						<div className="homeBodyText">
							{this.props.homeText}
						</div>
					</div>


				</div>
			);
		}

}