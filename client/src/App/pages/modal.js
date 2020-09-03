import React, { Component } from 'react';
import PropTypes from "prop-types";

export default class Modal extends Component {

    onClose = e => {
    	e.preventDefault();
        this.props.onClose && this.props.onClose(e);
	  };

  
	render() {
		if (!this.props.show) {
			return null;
		}
		return (
			<div className="modal" id="modal">
			<div className="modal-header">
				<span className="close" onClick={this.onClose}>&times;</span>
			</div>
			<div className="inner-modal">
				{ this.props.content }
			</div>
			</div>
		);
	}

}

Modal.propTypes = {
	onClose: PropTypes.func.isRequired,
	show: PropTypes.bool.isRequired
};
