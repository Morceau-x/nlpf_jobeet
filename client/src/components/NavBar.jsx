import React, { Component } from 'react'
import styled from 'styled-components'
import { Navbar, Nav } from 'react-bootstrap'
import LoginNav from './LoginNav'
import { Link } from 'react-router-dom'




function NavBar() {

 //if not logged

 if (true) {
  return <LoginNav/>
 }

 else {
  return <h1>salut</h1>
 }

}

export default NavBar