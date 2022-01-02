import React from 'react';
import ProfileIcon from '../Profile/ProfileIcon';

const Navigation = ({detectRouteChange, isSignedIn, toggleModal}) => {
	if( isSignedIn )
	{
		return(
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<ProfileIcon detectRouteChange={detectRouteChange} toggleModal={toggleModal} />
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