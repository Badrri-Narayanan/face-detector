import React from 'react';
import './Rank.css';

const Rank = ({entries, name}) => {
	return(
	<div>
		<div className='f3 white'>
		{name + ', your Entry count is ...'}
		</div>
		<div className='f1 white'>
		{'#' + entries}
		</div>
	</div>
	);
}

export default Rank;