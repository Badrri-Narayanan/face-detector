import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import React, { useState } from 'react';

const ProfileIcon = ({detectRouteChange, toggleModal}) => {
    let [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="pa4 tc">
            <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
                <DropdownToggle 
                    tag="span"
                    data-toggle="dropdown"
                    aria-expanded={dropdownOpen}
                >
                    <img
                        src="http://tachyons.io/img/logo.jpg"
                        className="br-100 h3 w3 dib" alt="avatar" 
                    />
                </DropdownToggle>
                <DropdownMenu 
                    className="b--transparent shadow-5"
                    style={{marginTop: '20px', backgroundColor: 'rgba(255, 255, 255, 0.5)'}}
                    end
                >
                    <DropdownItem 
                        onClick={toggleModal}>View Profile</DropdownItem>
                    <DropdownItem 
                        onClick={() => detectRouteChange('signedOut')}
                    >Sign Out</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

export default ProfileIcon;