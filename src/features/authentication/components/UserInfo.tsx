import React from 'react'
import { UserInfoProps } from '../types/auth'
import { Box, Paper, styled } from '@mui/material'

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  width: '500px',
  height: '400px',
  border: '1px solid #e6ecf0',
  borderRadius: '16px',
  margin: '50px auto',
}))

const UserInfoContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
})

const UserInfo: React.FC<UserInfoProps> = ({ name, surname, email }) => {
  return (
    <StyledPaper>
      <UserInfoContent>
        <h1>User Info</h1>
        <p>Name: {name}</p>
        <p>Surname: {surname}</p>
        <p>Email: {email}</p>
      </UserInfoContent>
    </StyledPaper>
  )
}

export default UserInfo
