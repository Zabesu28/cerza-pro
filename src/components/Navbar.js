import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { NavLink } from 'react-router-dom';
import { MenuItem, Typography } from '@mui/material';
import '../styles/navbar.css'

function Navbar() {

  return (
    <AppBar position="static" className="navbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MenuItem><NavLink className='lien' to="/">ENCYCLOPEDIE</NavLink></MenuItem>
          <MenuItem><NavLink className='lien' to="/">MISSIONS</NavLink></MenuItem>
          <MenuItem><NavLink className='lien' to="/questionnaireSante">QUESTIONNAIRE SANTE</NavLink></MenuItem>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;