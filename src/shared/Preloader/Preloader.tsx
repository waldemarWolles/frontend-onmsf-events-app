import { Box, CircularProgress, styled } from '@mui/material'
import React from 'react'

const CenteredCircularProgress = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
})

const Preloader: React.FC = () => {
  return (
    <CenteredCircularProgress>
      <CircularProgress />
    </CenteredCircularProgress>
  )
}

export default Preloader
