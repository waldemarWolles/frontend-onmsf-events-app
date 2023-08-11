import { Box, Typography } from '@mui/material'
import { IEvent } from '../types/events'

const EventInfo: React.FC<IEvent> = ({ activityStatus, description, eventType, eventDate, name }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Name: {name}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Description: {description}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Date: {eventDate.toString()}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Event Type: {eventType}
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Activity status: {activityStatus ? 'Active' : 'Inactive'}
      </Typography>
    </Box>
  )
}

export default EventInfo
