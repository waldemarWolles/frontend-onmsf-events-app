import React from 'react'
import { Box, Button, Card, CardContent, CircularProgress, Grid, Typography, styled } from '@mui/material'
import { IEventDataResponse } from '../types/events'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteEventAPI, fetchAllEventsAPI } from '../api/eventsAPI'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'
import EventCard from './EventCard'
import { Preloader } from '../../../shared'
import { useDeleteEventMutation } from '../hooks/useEventDeleteMutation'

const Container = styled(Grid)({
  height: '100vh',
})

const EventCardWrapper = styled(Grid)({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const StyledGrid = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
  overflow: 'auto',
})

const StyledButton = styled(Button)({
  marginBottom: '16px',
  maxWidth: '300px',
})

const Buttons = styled(Box)({
  dispaly: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

interface IEventsListProps {
  eventType: string
}

const EventsList: React.FC<IEventsListProps> = ({ eventType }) => {
  const navigate: NavigateFunction = useNavigate()
  const { data: events, isLoading, isError } = useQuery<IEventDataResponse[], Error>(['events'], fetchAllEventsAPI)

  const deleteEventMutation = useDeleteEventMutation()

  const onDeleteEvent = (eventId: string, eventName: string) => {
    if (window.confirm(`Are you sure that you want to delete this product: ${eventName} ?`)) {
      deleteEventMutation.mutate(eventId)
    }
  }

  const filteredEvents = eventType === 'all' ? events : events?.filter((event: IEventDataResponse) => event.eventType === eventType)

  if (isLoading) {
    return <Preloader />
  }

  if (isError) {
    return <div>Error </div>
  }

  return (
    <Container>
      <StyledGrid container>
        {filteredEvents?.map((event: IEventDataResponse) => (
          <EventCardWrapper item xs={12} sm={6} md={4} lg={3} key={event._id}>
            <EventCard key={event._id} {...event} />

            <Buttons>
              <StyledButton onClick={() => navigate(`/events/${event._id}`)}>Edit</StyledButton>
              <StyledButton onClick={() => onDeleteEvent(event._id, event.name)}>Delete</StyledButton>
            </Buttons>
          </EventCardWrapper>
        ))}
      </StyledGrid>
    </Container>
  )
}

export default EventsList
