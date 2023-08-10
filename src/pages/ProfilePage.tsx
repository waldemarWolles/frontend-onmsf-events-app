import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { fetchUserAPI } from '../features/authentication/api/authAPI'
import { AuthForm, UserInfo } from '../features/authentication/components'
import { Box, Button, styled } from '@mui/material'
import { Preloader } from '../shared'

const Wrapper = styled(Box)({
  margin: '30px auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

const StyledButton = styled(Button)({
  marginBottom: '16px',
  maxWidth: '300px',
})

const ProfilePage: React.FC = () => {
  const [edit, setEdit] = useState(false)

  const { data, isLoading, isError } = useQuery(['user'], () => fetchUserAPI(), { keepPreviousData: true })

  if (isLoading) {
    return <Preloader />
  }

  if (isError) {
    return <div>Error fetching user data</div>
  }
  const { name, surname, email } = data

  return (
    <Wrapper>
      {edit ? (
        <AuthForm formType="Update user info" currentUserValues={{ name, surname, email }} onUpdatedUserData={() => setEdit(false)} />
      ) : (
        <>
          <UserInfo name={name} surname={surname} email={email} />
          <StyledButton onClick={() => setEdit(true)} size="large" variant="contained" fullWidth>
            Edit
          </StyledButton>
        </>
      )}
    </Wrapper>
  )
}

export default ProfilePage
