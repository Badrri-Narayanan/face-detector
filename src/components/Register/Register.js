import React, {Component} from 'react';

class Register extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			email: '',
			password: '',
		}
	}
	onEmailChange = (event) => {
		this.setState({email: event.target.value});
	}
	onPasswordChange = (event) => {
		this.setState({password: event.target.value});
	}
	onNameChange = (event) => {
		this.setState({name: event.target.value});
	}
	onSubmitRegister = () => {
		fetch('https://guarded-garden-90311.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				'email': this.state.email,
				'password': this.state.password,
				'name': this.state.name,
			})
		}).then(response => response.json())
		.then(user =>{
			if(user.id) {
				this.props.updateUserDetails(user);
				this.props.detectRouteChange('home');
			}
		})
		
	}
	render() {
		return(
			<div className='center ma'>
				<article className="pa4 dib white shadow-5 center">
				  <div className="measure">
					<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					  <legend className="f1 fw6 ph0 mh0">Register</legend>
					  <div className="mt3">
						<label className="db fw6 lh-copy f3" htmlFor="email-address">Name</label>
						<input 
							className="pa2 input-reset ba bg-transparent hover-bg-black hover-white hover-black w-100" 
							type="text" 
							name="name"  
							id="name" 
							onChange = {this.onNameChange}
						/>
					  </div>
					  <div className="mt3">
						<label className="db fw6 lh-copy f3" htmlFor="email-address">Email</label>
						<input 
							className="pa2 input-reset ba bg-transparent hover-bg-black hover-white hover-black w-100" 
							type="email" 
							name="email-address"  
							id="email-address" 
							onChange = {this.onEmailChange}
						/>
					  </div>
					  <div className="mv3">
						<label className="db fw6 lh-copy f3" htmlFor="password">Password</label>
						<input 
							className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white hover-black w-100" 
							type="password" 
							name="password"  
							id="password"
							onChange = {this.onPasswordChange}
						/>
					  </div>
					</fieldset>
					<div className="">
					  <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
						type="submit" 
						onClick={this.onSubmitRegister} 
						value="Register"
					  />
					</div>
				  </div>
				</article>
			</div>
		);
	}
}

export default Register;