import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEventAPI, updateEventAPI } from '../api/eventsAPI'
import { IEventDataResponse, IEventForm, IEventMutationProps } from '../types/events'

export const useEventFormMutation = ({ formType, onClose, reset, eventId }: IEventMutationProps) => {
  const queryClient = useQueryClient()
  const mutation = useMutation<IEventDataResponse, Error, IEventForm>(
    async (values) => (formType === 'Create' ? createEventAPI(values) : updateEventAPI(values, eventId as string)),
    {
      onSuccess: (newValue) => {
        onClose()
        if (formType === 'Create') {
          queryClient.setQueryData<IEventDataResponse[]>(['events'], (oldData) => {
            return [...(oldData || []), newValue]
          })
          reset()
          queryClient.invalidateQueries(['event-types'])
        } else {
          queryClient.setQueryData<IEventDataResponse>(['event'], newValue)
        }
      },
      onError: (error) => {
        console.log(error, 'error')
        alert(`Failed to ${formType.toLocaleLowerCase()} Event!`)
      },
    }
  )

  return mutation
}
