import React from 'react'
import { Box, Tab, Tabs, styled } from '@mui/material'
import { IAuthTabs, IAuthTabsProps } from '../types/auth'

const TabsWrapper = styled(Box)({
  marginTop: '26px',
})

const AuthTabs: React.FC<IAuthTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <TabsWrapper>
      <Tabs value={activeTab} onChange={(_, value: IAuthTabs['formType']) => onTabChange(value)}>
        <Tab label="Login" value="Login" />
        <Tab label="Register" value="Register" />
      </Tabs>
    </TabsWrapper>
  )
}

export default AuthTabs
