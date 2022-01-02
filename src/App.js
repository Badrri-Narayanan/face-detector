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
import Profile from './components/Profile/Profile';
import Modal from './components/Modal/Modal';

const initialState = {
			input: '',
			imageURL: '',
			boxes: [],
			route: 'signIn',
			isSignedIn: false,
			isLoading: false,
			isProfileOpen: false,
			user: {
				id: '',
				name: '',
				email: '',
				entries: 0,
				joined: '',
				pet: '',
				age: ''
			}
		}

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	componentDidMount() {
		const token = window.sessionStorage.getItem('token');
		if(token) {
			fetch('http://localhost:3004/signin', {
				method: 'POST',
				headers: {
					'Content-Type' : 'application/json',
					'Authorization' : token
				}
			}).then(resp => resp.json())
				.then(data => {
					if(data && data.id) {
						this.loadProfile(data.id, token);
					}
				}).catch(console.log)
		}
	}

	loadProfile = (id, token) => {
		fetch(`http://localhost:3004/profile/${id}`, {
			method: 'get',
			headers: {
				'Content-Type' : 'application/json',
				'Authorization' : token
			}
		}).then(resp => resp.json())
		.then(user => {
			if(user && user.email) {
				this.updateUserDetails(user);
				this.onRouteChange('home');
			}
		})
	}
	
	updateUserDetails = (userInfo) => {
		this.setState({user:{
			...this.state.user,
			...userInfo,
		}})
	}
	
	calculateFaceLocation = (data) => {
		if(data && data.outputs) {
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
		return;
	}
	
	onRouteChange = (route) => {
		if(route === 'signedOut') {
			this.setState(initialState);
			return
		} else if(route === 'home') {
			this.setState({isSignedIn: true});
		}
		this.setState({ route: route });
	}
	
	displayBox = (boxes) => {
		if(boxes) {
			this.setState({boxes: boxes});
		}
	}
	
	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	toggleModal = () => {
		const { isProfileOpen } = this.state;
		this.setState({isProfileOpen: !isProfileOpen});
	}
	
	onPictureClick = () => {
		this.setState({imageURL: this.state.input});
		fetch('http://localhost:3004/imageurl', {
		//fetch('https://guarded-garden-90311.herokuapp.com/imageurl', {
						method: 'post',
						headers: {
							'Content-Type': 'application/json',
							'Authorization' : window.sessionStorage.getItem('token')
						},
						body: JSON.stringify({
							input: this.state.input
						})
					})
			.then(response => response.json())
			.then( (response) => {
				if(response) {
					fetch('http://localhost:3004/image', {
					//fetch('https://guarded-garden-90311.herokuapp.com/image', {
						method: 'put',
						headers: {
							'Content-Type': 'application/json',
							'Authorization' : window.sessionStorage.getItem('token')
						},
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
		const {isSignedIn, boxes, route, isLoading, imageURL, user, isProfileOpen} = this.state;
	  return (
		<div className="App">
			<Particles className='particles' params={paramOptions} />
			<Navigation 
				isSignedIn={isSignedIn} 
				detectRouteChange={this.onRouteChange}
				toggleModal={this.toggleModal} 
			/>
			{
				isProfileOpen && 
				<Modal>
					<Profile 
						isProfileOpen={isProfileOpen} 
						user={user} 
						toggleModal={this.toggleModal} 
						updateUserInfo={this.updateUserDetails}
					/>
				</Modal>
			}
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
									setIsLoading={this.setIsLoading} 
									loadProfile={this.loadProfile}
								/> 
							: <Spinner /> 
						:<Register updateUserDetails={this.updateUserDetails} detectRouteChange={this.onRouteChange} />
					)	
			}
		</div>
	  );
	}
}

export default App;
