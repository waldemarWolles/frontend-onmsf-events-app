import React from 'react'
import { Box, Button, Card, CardContent, CircularProgress, Grid, Typography, styled } from '@mui/material'
import { IEventDataResponse } from '../types/events'
import { useQuery } from '@tanstack/react-query'
import { fetchAllEventsAPI } from '../api/eventsAPI'
import { Link } from 'react-router-dom'
import EventCard from './EventCard'
import { Preloader } from '../../../shared'

const Continer = styled(Grid)({
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

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
})

interface IEventsListProps {
  eventType: string
}

const EventsList: React.FC<IEventsListProps> = ({ eventType }) => {
  const { data: events, isLoading, isError, error } = useQuery<IEventDataResponse[], Error>(['events'], fetchAllEventsAPI)

  console.log({ events, isLoading, isError, error })

  if (isLoading) {
    return <Preloader />
  }

  const filteredEvents = eventType === 'all' ? events : events?.filter((event: IEventDataResponse) => event.eventType === eventType)

  return (
    <Continer>
      <StyledGrid container>
        {filteredEvents?.map((event: IEventDataResponse) => (
          <EventCardWrapper item xs={12} sm={6} md={4} lg={3} key={event._id}>
            <StyledLink to={`/events/${event._id}`}>
              <EventCard key={event._id} {...event} />
            </StyledLink>
            {/* <StyledIconButton onClick={() => onProductDeleteClick(product._id, product.name)}>
              <Delete />
            </StyledIconButton> */}
          </EventCardWrapper>
        ))}
      </StyledGrid>
    </Continer>
  )
}

export default EventsList
