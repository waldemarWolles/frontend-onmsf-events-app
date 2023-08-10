import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, styled } from '@mui/material'
import { EventTypeFormModalProps, IEventTypeDataResponse, IEventTypeForm } from '../types/eventTypes'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEventTypeAPI } from '../api/eventTypesAPI'

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

const EventTypeFormModal: React.FC<EventTypeFormModalProps> = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IEventTypeForm>({
    defaultValues: {
      name: '',
      imageUrl: '',
    },
    mode: 'onChange',
  })

  const mutation = useMutation(async (values: IEventTypeForm) => await createEventTypeAPI(values), {
    onSuccess: (newEventType: IEventTypeDataResponse) => {
      onClose()
      queryClient.setQueryData<IEventTypeDataResponse[]>(['event-types'], (oldData) => [...(oldData || []), newEventType])
      reset()
    },
    onError: (error) => {
      console.log(error, 'error')
      alert(`Failed to create EventType!`)
    },
  })

  const onSubmit = async (values: IEventTypeForm) => {
    mutation.mutate(values)
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Create Event Type</DialogTitle>
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
            label="Image Url"
            type="url"
            error={Boolean(errors.imageUrl?.message)}
            helperText={errors.imageUrl?.message}
            {...register('imageUrl', {
              required: 'Please enter an image Url',
            })}
            fullWidth
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

export default EventTypeFormModal
