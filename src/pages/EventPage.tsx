import React, { useState } from 'react'
import { EventFormModal, EventInfo } from '../features/events/components'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchOneEventAPI } from '../features/events/api/eventsAPI'
import { Preloader } from '../shared'
import { IEvent, IEventDataResponse } from '../features/events/types/events'
import { Box, Button, styled } from '@mui/material'
import { fetchAllEventTypesAPI } from '../features/event-types/api/eventTypesAPI'
import { IEventTypeDataResponse } from '../features/event-types/types/eventTypes'

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

const EventPage = () => {
  const { id } = useParams()
  const validEventId = typeof id === 'string' ? id : ''

  const [edit, setEdit] = useState(false)

  const {
    data: event,
    isLoading: isEventLoading,
    isError: isEventError,
  } = useQuery<IEventDataResponse>(['event'], () => fetchOneEventAPI(validEventId), {
    keepPreviousData: false,
    refetchOnMount: 'always',
  })
  console.log(event, 'useQuery<IEventDataResponse>([event]')

  const {
    data: eventTypes,
    isLoading: isEventTypesLoading,
    isError: isEventTypesError,
  } = useQuery<IEventTypeDataResponse[]>(['event-types'], () => fetchAllEventTypesAPI())

  if (isEventLoading || isEventTypesLoading) {
    return <Preloader />
  }

  if (isEventError || isEventTypesError) {
    return <div>Error fetching data</div>
  }

  return (
    <>
      <Wrapper>
        <EventInfo {...event} />
        <StyledButton onClick={() => setEdit(true)} size="large" variant="contained" fullWidth>
          Edit
        </StyledButton>
      </Wrapper>

      <EventFormModal formType="Update" eventTypes={eventTypes} isOpen={edit} onClose={() => setEdit(false)} currentEventValues={event} />
    </>
  )
}

export default EventPage
