import React from 'react';
import './FaceDetector.css';

const FaceDetector = ({imageUrl, boxes}) => {
	return(
	<div className='center ma'>
		<div className='absolute mt2'>
			<img src={imageUrl}
				id='inputimage'
				alt='Enter URL above'
				width='500px' height='auto'
			/>
			{
				boxes.map((box, idx) => (
					<div key={idx} className='bounding-box' style={{left: box.leftCol, right: box.rightCol, top: box.topRow, bottom: box.bottomRow}} ></div>
				))
			}
		</div>
	</div>
	);
}

export default FaceDetector;