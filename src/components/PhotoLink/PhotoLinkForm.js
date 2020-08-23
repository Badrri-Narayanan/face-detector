import React from 'react';
import './PhotoLinkForm.css';

const PhotoLinkForm = ({onInputChange, onPictureClick}) => {
	return(
	<div>
		<p className='f3 yellow'>
			{'This Application will detect your face. Try for free'}
		</p>
		<div className='center'>
			<div className='form pa4 center br3 shadow-4'>
				<input type="tex" className='f3 pa2 w-70 center' onChange={onInputChange} />
				<button className='w-30 grow center ph3 pv2 dib white bg-yellow' onClick={onPictureClick}>Detect</button>
			</div>
		</div>
	</div>
	);
}

export default PhotoLinkForm;