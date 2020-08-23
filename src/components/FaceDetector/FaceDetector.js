import React from 'react';
import './FaceDetector.css';

const FaceDetector = ({imageUrl, box}) => {
	return(
	<div className='center ma'>
		<div className='absolute mt2'>
			<img src={imageUrl}
				id='inputimage'
				alt='Enter URL above'
				width='500px' height='auto'
			/>
			<div className='bounding-box' style={{left: box.leftCol, right: box.rightCol, top: box.topRow, bottom: box.bottomRow}} ></div>
		</div>
	</div>
	);
}

export default FaceDetector;