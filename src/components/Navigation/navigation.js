import React from 'react';

const Navigation = ({detectRouteChange, isSignedIn}) => {
	if( isSignedIn )
	{
		return(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => detectRouteChange('signedOut')} className='f3 link dim black-80 pa1 underline pointer'>Sign out</p>
			</nav>
		);
	}
	else
	{
		return(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => detectRouteChange('signIn')} className='f3 link dim black-80 pa1 underline pointer'>Sign In</p>
				<p onClick={() => detectRouteChange('register')} className='f3 link dim black-80 pa1 underline pointer'>Register</p>
			</nav>
		)	
	}
}

export default Navigation;