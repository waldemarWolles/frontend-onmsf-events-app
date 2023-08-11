import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Box, Button, styled } from '@mui/material'
import { EventFormModal, EventsList } from '../features/events/components'
import { EventTypeFormModal, EventTypesTabs } from '../features/event-types/components'
import { IEventTypeDataResponse } from '../features/event-types/types/eventTypes'
import { fetchAllEventTypesAPI } from '../features/event-types/api/eventTypesAPI'
import { Preloader } from '../shared'

const Container = styled(Box)({
  width: '100%',
})

const CreateEventTypeButton = styled(Button)({
  margin: '10px 10px',
  marginTop: '30px',
  height: '75px',
})

const EventTypesContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const CreateEventButton = styled(Button)({
  margin: '30px',
})

const HomePage: React.FC = () => {
  const { data: eventTypes, isLoading } = useQuery<IEventTypeDataResponse[]>(['event-types'], fetchAllEventTypesAPI)

  const [activeEventTypeTab, setActiveEventTypeTab] = useState<string>('all')
  const [isCreateEventTypeModalOpen, setIsCreateEventTypeModalOpen] = useState<boolean>(false)
  const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState<boolean>(false)

  const handleEventTypeTabChange = (newValue: string) => {
    setActiveEventTypeTab(newValue)
  }

  if (isLoading) {
    return <Preloader />
  }

  return (
    <>
      <Container>
        <EventTypesContainer>
          <EventTypesTabs
            eventTypes={eventTypes as IEventTypeDataResponse[]}
            activeTab={activeEventTypeTab}
            onTabChange={handleEventTypeTabChange}
          />
          <CreateEventTypeButton variant="contained" color="primary" onClick={() => setIsCreateEventTypeModalOpen(true)}>
            Create Event Type
          </CreateEventTypeButton>
        </EventTypesContainer>
        <CreateEventButton variant="contained" color="primary" onClick={() => setIsCreateEventModalOpen(true)}>
          Create Event
        </CreateEventButton>
        <EventsList eventType={activeEventTypeTab} />
      </Container>
      <>
        <EventTypeFormModal isOpen={isCreateEventTypeModalOpen} onClose={() => setIsCreateEventTypeModalOpen(false)} />
        <EventFormModal
          formType="Create"
          eventTypes={eventTypes as IEventTypeDataResponse[]}
          isOpen={isCreateEventModalOpen}
          onClose={() => setIsCreateEventModalOpen(false)}
        />
      </>
    </>
  )
}

export default HomePage
