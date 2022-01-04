import React, { useState } from 'react';
import ResultInfoModal from '../ResultInfoModal';

import './Profile.css';

const Profile = ({ isProfileOpen, toggleModal, user, updateUserInfo }) => {
    let [profileInfo, setProfileInfo] = useState({
        name: user.name,
        age: user.age,
        pet: user.pet,
    });
    let [result, setResult] = useState(null);

    const updateProfileInfo = (event) => {
        const { name, value } = event.target;
        setProfileInfo({
            ...profileInfo,
            [name]: value,
        });
    }

    const saveProfileInfo = (event) => {
        event.preventDefault();
        fetch(`https://guarded-garden-90311.herokuapp.com/profile/${user.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : window.sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                formInput: {
                    ...profileInfo
                }
            })
        }).then(resp => resp.json())
        .then(result => {
            if(result === "success") {
                updateUserInfo(profileInfo);
            }
            setResult(result);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="profile-modal">
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m mw6 shadow-5 center bg-white">
                <main className="pa4 black-80 w-80">
                    {
                        result !== null 
                        ? <ResultInfoModal 
                            operationStatus={result} 
                            toggleModal={toggleModal} 
                        />
                        : <div>
                            <img
                                src="http://tachyons.io/img/logo.jpg"
                                className="h3 w3 dib" alt="avatar" 
                            />
                            <h1>{user.name}</h1>
                            <h4>Images Submitted: {user.entries}</h4>
                            <p>Member since: {new Date(user.joined).toLocaleDateString()}</p>
                            <hr/>
                            <label className="mt2 fw6" htmlFor="name">Name:</label>
                            <input 
                                className="pa2 ba w-100" 
                                type="text" 
                                name="name"  
                                id="name" 
                                placeholder={profileInfo.name}
                                value={profileInfo.name}
                                onChange={updateProfileInfo}
                            />
                            <label className="mt2 fw6" htmlFor="age">Age:</label>
                            <input 
                                className="pa2 ba w-100" 
                                type="text" 
                                name="age"  
                                id="age" 
                                placeholder={profileInfo.age}
                                value={profileInfo.age}
                                onChange={updateProfileInfo}
                            />
                            <label className="mt2 fw6" htmlFor="pet">Pet:</label>
                            <input 
                                className="pa2 ba w-100" 
                                type="text" 
                                name="pet"  
                                id="pet" 
                                placeholder={profileInfo.pet}
                                value={profileInfo.pet}
                                onChange={updateProfileInfo}
                            />
                            <div className="mt4" style={{display: "flex", justifyContent: "space-evenly"}}>
                                <button 
                                    className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
                                    onClick={saveProfileInfo}
                                >Save</button>
                                <button 
                                    className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
                                    onClick={toggleModal}
                                >Cancel</button>
                            </div>
                        </div>
                    }
                </main>
                <div className="modal-close" onClick={toggleModal}>&times;</div>
            </article>
        </div>
    );
}

export default Profile;