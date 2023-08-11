import React from 'react'
import { Card, CardContent, Typography, styled } from '@mui/material'
import { IEventDataResponse } from '../types/events'

const Container = styled(Card)({
  width: '300px',
  margin: '20px',
  position: 'relative',
})

const EventCard: React.FC<IEventDataResponse> = ({ name, activityStatus, description, eventDate, eventType, createdAt, updatedAt }) => {
  return (
    <Container>
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {description}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {activityStatus ? 'Active' : 'Inactive'}
        </Typography>
        <Typography variant="body2" component="p">
          {eventType}
        </Typography>
        <Typography variant="body2" component="p">
          {eventDate.toString()}
        </Typography>
        <Typography variant="body2" component="p">
          {createdAt}
        </Typography>
        <Typography variant="body2" component="p">
          {updatedAt}
        </Typography>
      </CardContent>
    </Container>
  )
}

export default EventCard
