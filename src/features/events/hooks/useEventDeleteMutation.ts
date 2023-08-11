import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteEventAPI } from '../api/eventsAPI'
import { IEventDataResponse } from '../types/events'

export const useDeleteEventMutation = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation(async (eventId: string) => deleteEventAPI(eventId), {
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<IEventDataResponse[]>(['events'], (oldData) => {
        return [...(oldData || []).filter((event) => event._id !== deletedId)]
      })

      queryClient.invalidateQueries(['event-types'])
    },
    onError: (error) => {
      console.log(error, 'error')
      alert(`Failed to delete Event!`)
    },
  })

  return mutation
}
