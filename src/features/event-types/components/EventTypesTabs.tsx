import React from 'react'
import { Box, Tab, Tabs, capitalize, styled } from '@mui/material'
import { IEventTypeTabsProps } from '../types/eventTypes'

const TabsWrapper = styled(Box)({
  marginTop: '26px',
  display: 'flex',
  justifyContent: 'center',
})

const TabLabelWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
})

const TabImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  maxWidth: '100px',
})

const EventsCount = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: -8,
  right: -8,
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  borderRadius: '50%',
  width: 20,
  height: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 12,
}))

const EventTypesTabs: React.FC<IEventTypeTabsProps> = ({ eventTypes, activeTab, onTabChange }) => {
  return (
    <TabsWrapper>
      <Tabs value={activeTab} onChange={(_, value: string) => onTabChange(value)}>
        <Tab label="All" value="all" />
        {eventTypes?.map(({ name, imageUrl, eventsCount, _id }) => {
          return (
            <Tab
              key={_id}
              label={
                <TabLabelWrapper>
                  <TabImage src={imageUrl} alt={name} />

                  <EventsCount>{eventsCount}</EventsCount>
                </TabLabelWrapper>
              }
              value={name}
            ></Tab>
          )
        })}
      </Tabs>
    </TabsWrapper>
  )
}

export default EventTypesTabs
