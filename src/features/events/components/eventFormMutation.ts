import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEventAPI, updateEventAPI } from '../api/eventsAPI'
import { IEventDataResponse, IEventForm } from '../types/events'

export const useEventMutation = (formType: 'Create' | 'Update', onClose: () => void, reset: () => void) => {
  const queryClient = useQueryClient()
  const mutation = useMutation<IEventDataResponse, Error, IEventForm>(
    async (values) => (formType === 'Create' ? createEventAPI(values) : updateEventAPI(values, '1')),
    {
      onSuccess: (newEvent) => {
        onClose()
        queryClient.setQueryData<IEventDataResponse[]>(['events'], (oldData) => [...(oldData || []), newEvent])
        reset()
      },
      onError: (error) => {
        console.log(error, 'error')
        alert(`Failed to create Event!`)
      },
    }
  )

  return mutation
}
