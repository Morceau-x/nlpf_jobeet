import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class LoginNav extends Component {

 //if loggeed return different navbar

    render() {
        return (
            <nav class="navbar navbar-expand-md navbar-dark bg-primary">
    <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
     <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
       <Link to="/" className="navbar-brand">
        Jobeet
       </Link>
      </li>
     </ul>
    </div>
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
     <ul class="navbar-nav ml-auto">
      <li class="nav-item">
       <Link to="/login" className="nav-link">
        Login
       </Link>
      </li>
      <li class="nav-item">
       <Link to="/signup" className="nav-link">
        Signup
      </Link>
      </li>
     </ul>
    </div>
   </nav>
        )
    }
}

export default LoginNav