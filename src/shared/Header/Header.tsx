import React from 'react'

import { styled, AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { NavLink, NavigateFunction, useNavigate } from 'react-router-dom'

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#fff',
  color: '#333',
})

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
})

const Navigation = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '50px',
})

const StyledNavLink = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'underline',
  },
})

const Header: React.FC = () => {
  const token: string | null = window.localStorage.getItem('token')
  const navigate: NavigateFunction = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    navigate('/auth')
  }

  return (
    <StyledAppBar position="sticky">
      <StyledToolbar>
        <Navigation>
          <StyledNavLink to="/">
            <Typography variant="h6" component="div" hidden={!token}>
              My App
            </Typography>
          </StyledNavLink>
          <StyledNavLink to="/profile" hidden={!token}>
            <Typography variant="h6" component="div">
              Profile
            </Typography>
          </StyledNavLink>
        </Navigation>
        {token && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </StyledToolbar>
    </StyledAppBar>
  )
}

export default Header
