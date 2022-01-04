import React, {Component} from 'react';

class SignInForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			signinEmail: '',
			signinPassword: ''
		}
	}
	
	onEmailChange = (event) => {
		this.setState({signinEmail: event.target.value});
	}
	
	onPasswordChange = (event) => {
		this.setState({signinPassword: event.target.value});
	}

	saveAuthTokenInSession = (token) => {
		window.sessionStorage.setItem('token', token);
	}
	
	onSubmitSignin = () => {
		const { setIsLoading, loadProfile } = this.props;
		setIsLoading(true);
		fetch('https://guarded-garden-90311.herokuapp.com/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				'email': this.state.signinEmail,
				'password': this.state.signinPassword,
			})
		}).then(response => response.json())
		.then(data =>{
			if(data.userId && data.success === 'true') {
				this.saveAuthTokenInSession(data.token)
				loadProfile(data.userId, data.token);
			} else {
				alert("Invalid Email/Password");
			}
			setIsLoading(false);
		})
		
	}

	submitForm = (event) => {
		if(event.code === "Enter") {
			this.onSubmitSignin();
		}
	}
	
	render() {
		const {detectRouteChange} = this.props;
		return(
			<div >
				<article className="pa4 dib white shadow-5 center">
					<main className="pa4 black-80 w-100">
						<div className="measure">
							<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f1 fw6 ph0 mh0">Sign In</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
								<input 
									onChange={this.onEmailChange}
									className="pa1 input-reset ba bg-transparent hover-bg-black hover-white hover-black w-100" 
									type="email" 
									name="email-address"  
									id="email-address" 
								/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
								<input 
									onChange={this.onPasswordChange}
									className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white hover-black w-100" 
									type="password" 
									name="password"  
									id="password"
									onKeyDown={this.submitForm}
								/>
							</div>
							</fieldset>
							<div className="">
							<input className="b ph3 pv2 input-reset ba b--white white bg-transparent grow pointer f6 dib" 
								type="submit" 
								method="post"
								onClick={this.onSubmitSignin} 
								value="Sign in"
							/>
							</div>
							<div className="lh-copy mt3">
							<p onClick={() => detectRouteChange('register')} href="#0" className="f4 link dim white pointer db">Register</p>
							</div>
						</div>
					</main>
				</article>
			</div>
			);
	}
}

export default SignInForm;