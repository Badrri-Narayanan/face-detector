import React, {Component} from 'react';
import './App.css';
import Particles from 'react-tsparticles';

import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/Logo';
import PhotoLinkForm from './components/PhotoLink/PhotoLinkForm';
import Rank from './components/Rank/Rank';
import FaceDetector from './components/FaceDetector/FaceDetector';
import SignInForm from './components/SignInForm/SignInForm';
import Register from './components/Register/Register';

const paramOptions = {
	background: {
	  color: {
		value: "#0d47a1",
	  },
	},
	fpsLimit: 60,
	interactivity: {
	  events: {
		onClick: {
		  enable: true,
		  mode: "push",
		},
		onHover: {
		  enable: true,
		  mode: "repulse",
		},
		resize: true,
	  },
	  modes: {
		bubble: {
		  distance: 400,
		  duration: 2,
		  opacity: 0.8,
		  size: 40,
		},
		push: {
		  quantity: 4,
		},
		repulse: {
		  distance: 200,
		  duration: 0.4,
		},
	  },
	},
	particles: {
	  color: {
		value: "#ffffff",
	  },
	  links: {
		color: "#ffffff",
		distance: 150,
		enable: true,
		opacity: 0.5,
		width: 1,
	  },
	  collisions: {
		enable: true,
	  },
	  move: {
		direction: "none",
		enable: true,
		outMode: "bounce",
		random: false,
		speed: 2,
		straight: false,
	  },
	  number: {
		density: {
		  enable: true,
		  value_area: 800,
		},
		value: 80,
	  },
	  opacity: {
		value: 0.5,
	  },
	  shape: {
		type: "circle",
	  },
	  size: {
		random: true,
		value: 5,
	  },
	},
	detectRetina: true,
  }

const initialState = {
			input: '',
			imageURL: '',
			box: {},
			route: 'signIn',
			isSignedIn: false,
			user: {
				id: '',
				name: '',
				email: '',
				entries: 0,
				joined: '',
			}
		}

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}
	
	loadUser = (luser) => {
		this.setState({user:{
				id: luser.id,
				name: luser.name,
				email: luser.email,
				entries: luser.entries,
				joined: luser.joined,
		}})
	}
	
	calculateFaceLocation = (data) => {
		const Face = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: Face.left_col * width,
			topRow: Face.top_row * height,
			rightCol: width - (Face.right_col * width),
			bottomRow: height - (Face.bottom_row * height),
		}
	}
	
	onRouteChange = (route) => {
		if(route === 'signedOut') {
			this.setState(initialState);
		} else if(route === 'home') {
			this.setState({isSignedIn: true});
		}
		this.setState({ route: route });
	}
	
	displayBox = (box) => {
		this.setState({box: box});
	}
	
	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}
	
	onPictureClick = () => {
		this.setState({imageURL: this.state.input});
		fetch('https://guarded-garden-90311.herokuapp.com/imageurl', {
						method: 'post',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({
							input: this.state.input
						})
					})
			.then(response => response.json())
			.then( (response) => {
				if(response) {
					fetch('https://guarded-garden-90311.herokuapp.com/image', {
						method: 'put',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({
							id: this.state.user.id
						})
					}).then(response => response.json())
					.then(count => this.setState(Object.assign(this.state.user, {entries: count})))
				}
			this.displayBox(this.calculateFaceLocation(response))})
			.catch(err => console.log(err));
	}
	
	render() {
		const {isSignedIn, box, route, imageURL, user} = this.state;
	  return (
		<div className="App">
			<Particles className='particles' params={paramOptions} />
			<Navigation isSignedIn={isSignedIn} detectRouteChange={this.onRouteChange} />
			{
				(route === 'home')
				? <div>
					<Logo />
					<Rank entries={user.entries} name={user.name}/>
					<PhotoLinkForm 
						onInputChange={this.onInputChange} 
						onPictureClick={this.onPictureClick}
					/>
					<FaceDetector box={box} imageUrl={imageURL} />
				</div> 
				:	(route === 'signIn'
						?<SignInForm loadUser={this.loadUser} detectRouteChange={this.onRouteChange} />
						:<Register loadUser={this.loadUser} detectRouteChange={this.onRouteChange} />
					)	
			}
		</div>
	  );
	}
}

export default App;
