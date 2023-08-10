import React, { useState } from 'react'
import { AuthForm, AuthTabs } from '../features/authentication/components'
import { IAuthTabs } from '../features/authentication/types/auth'
import { Box, styled } from '@mui/material'

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  height: '100vh',
})

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<IAuthTabs['formType']>('Login')

  const handleTabChange = (newValue: IAuthTabs['formType']) => {
    setActiveTab(newValue)
  }

  return (
    <StyledBox>
      <AuthTabs activeTab={activeTab} onTabChange={handleTabChange} />
      <AuthForm formType={activeTab} />
    </StyledBox>
  )
}

export default AuthPage
