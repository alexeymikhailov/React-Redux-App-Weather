import React, { Component } from 'react';
import '../../css/spinner';

export default class Spinner extends Component {
	render() {
		return (
			<div className="spinner">
        		<div className="spinner-children spinner-one" />
        		<div className="spinner-children spinner-two" />
      		</div>
		);
	}
}