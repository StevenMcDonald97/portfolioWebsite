import React, { Component } from 'react';

export default class HomePage extends Component {

		render() {

			<div>
				<div>
					<img className="landingImage" src={ this.props.imageSrc}/>

				</div>

				<div className="homeText bodyText">
					<h2 className="headerText">
						{this.props.heading}

					</h2>
					<div>
						{this.props.homeText}
					</div>
				</div>


			</div>

		}

}