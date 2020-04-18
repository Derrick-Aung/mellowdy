import React, { useState, useEffect } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import {connect} from 'react-redux'
import {setToken} from '../actions/authActions'
import {getUserProfileId} from '../actions/actions'
import {getUserPlaylists} from '../actions/melodyActions'
import {authEndPoint,clientID,redirectUri,scopes} from '../config'
import hash from '../hash'

const Header = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  useEffect(() => {
    let _token = hash.access_token
    props.setToken(_token)
    window.location.hash=""
  }, [])

  useEffect(() => {
    props.getUserProfileId(props.token)
  }, [props.token])

  useEffect(() => {
    props.getUserPlaylists(props.id, props.token)
  }, [props.token ,props.id])

  

  return (
    <div>
      <Navbar dark>
        <NavbarBrand href="/" className="mr-auto">
        <img className="mellowdy-logo" src={process.env.PUBLIC_URL +'/redfox.png'} alt=""/>
        Mellowdy | Discover yourself</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
                {!props.token ?  
                (<NavLink href={`${authEndPoint}?client_id=${clientID}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true&scope=${scopes.join("%20")}`}>
                  Login With Spotify
                </NavLink>):(
                  <NavLink href={redirectUri}>
                  Logout
                  </NavLink>
                )}
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/Derrick-Aung/mellowdy">GitHub</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
      token: state.auth.token,
      id: state.general.id
  }
}


export default connect(mapStateToProps, {setToken,getUserProfileId,getUserPlaylists})(Header);