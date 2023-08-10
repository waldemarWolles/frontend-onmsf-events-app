import React from 'react'
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, TextField, styled } from '@mui/material'
import { useForm } from 'react-hook-form'
import { IEventForm, IEventFormProps } from '../types/events'
import { useEventMutation } from './eventFormMutation'

const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  width: '400px',
  border: '1px solid #e6ecf0',
  borderRadius: '16px',
  margin: '50px auto',
}))

const StyledTextField = styled(TextField)({
  marginBottom: '20px',
})

const EventFormModal: React.FC<IEventFormProps> = ({ isOpen, onClose, eventTypes, formType }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IEventForm>({
    defaultValues: {
      name: '',
      description: '',
      eventDate: new Date(),
      eventType: '',
      activityStatus: false,
    },
    mode: 'onChange',
  })

  const mutation = useEventMutation(formType, onClose, reset)

  const onSubmit = async (values: IEventForm) => {
    mutation.mutate(values)
    console.log(values)
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Create Event</DialogTitle>
      <DialogContent>
        <StyledForm>
          <StyledTextField
            label="Name"
            type="text"
            error={Boolean(errors.name?.message)}
            helperText={errors.name?.message}
            {...register('name', {
              required: 'Please enter a Name',
              min: {
                value: 2,
                message: 'Name length must be greater than 2',
              },
            })}
            fullWidth
          />
          <StyledTextField
            label="Description"
            type="textarea"
            error={Boolean(errors.description?.message)}
            helperText={errors.description?.message}
            {...register('description', {
              required: 'Please enter a description',
            })}
            fullWidth
            multiline
            rows={4}
          />
          <StyledTextField
            type="date"
            error={Boolean(errors.eventDate?.message)}
            helperText={errors.eventDate?.message}
            {...register('eventDate', {
              required: 'Please enter a eventDate',
            })}
            fullWidth
          />

          <StyledTextField
            label="Event Type"
            type="text"
            error={Boolean(errors.eventType?.message)}
            helperText={errors.eventType?.message}
            {...register('eventType', {
              required: 'Please select an Event Type',
            })}
            select
            SelectProps={{
              native: true,
            }}
            fullWidth
          >
            {eventTypes?.map((eventType) => (
              <option key={eventType._id} value={eventType.name}>
                {eventType.name}
              </option>
            ))}
          </StyledTextField>

          <FormControlLabel
            control={
              <Checkbox
                {...register('activityStatus')}
                onChange={(_, checked) => {
                  setValue('activityStatus', checked, { shouldTouch: true })
                }}
              />
            }
            label="Activity Status"
          />
        </StyledForm>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EventFormModal
