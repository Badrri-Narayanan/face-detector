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
import { paramOptions } from './utils';
import Spinner from './components/Spinner';

const initialState = {
			input: '',
			imageURL: '',
			boxes: [],
			route: 'signIn',
			isSignedIn: false,
			isLoading: false,
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
		const faceRegions = data.outputs[0].data.regions;
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		let faces = [];
		faceRegions.forEach(face => {
			let faceArea = face.region_info.bounding_box;
			faces.push({
				leftCol: faceArea.left_col * width,
				topRow: faceArea.top_row * height,
				rightCol: width - (faceArea.right_col * width),
				bottomRow: height - (faceArea.bottom_row * height),
			})
		})
		return faces;
	}
	
	onRouteChange = (route) => {
		if(route === 'signedOut') {
			this.setState(initialState);
		} else if(route === 'home') {
			this.setState({isSignedIn: true});
		}
		this.setState({ route: route });
	}
	
	displayBox = (boxes) => {
		this.setState({boxes: boxes});
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

	setIsLoading = (loadingState) => {
		this.setState({isLoading : loadingState})
	}
	
	render() {
		const {isSignedIn, boxes, route, isLoading, imageURL, user} = this.state;
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
					<FaceDetector boxes={boxes} imageUrl={imageURL} />
				</div> 
				:	(route === 'signIn'
						? !isLoading 
							? <SignInForm 
									loadUser={this.loadUser} 
									setIsLoading={this.setIsLoading} 
									detectRouteChange={this.onRouteChange} 
								/> 
							: <Spinner /> 
						:<Register loadUser={this.loadUser} detectRouteChange={this.onRouteChange} />
					)	
			}
		</div>
	  );
	}
}

export default App;
