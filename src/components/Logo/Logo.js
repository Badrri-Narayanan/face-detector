import React, {Component} from 'react';
import './Logo.css';
import Face from './Face.png';

class Logo extends Component {
	constructor() {	
		super();
		this.wrapper = React.createRef();
	}
	render() {
		return(
			<div className='ma2 mt3 myLogo shadow-5' style={{width: '150px'}}>
						<img src={Face} alt="face" style={{paddingTop: '5px'}} />
			</div>
		);
	}
}
export default Logo;