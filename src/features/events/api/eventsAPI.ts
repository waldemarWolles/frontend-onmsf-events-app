import axiosInstance from '../../../api/axiosAPI'
import { IEventDataResponse, IEventForm } from '../types/events'

export const createEventAPI = async (payload: IEventForm): Promise<IEventDataResponse> => {
  const response = await axiosInstance.post<IEventDataResponse>('/events', payload)
  return response.data
}

export const updateEventAPI = async (payload: IEventForm, eventId: string): Promise<IEventDataResponse> => {
  const response = await axiosInstance.patch<IEventDataResponse>(`/events/${eventId}`, payload)
  return response.data
}

export const fetchAllEventsAPI = async (): Promise<IEventDataResponse[]> => {
  const response = await axiosInstance.get<IEventDataResponse[]>('/events')
  return response.data
}

export const fetchOneEventAPI = async (eventId: string): Promise<IEventDataResponse> => {
  const response = await axiosInstance.get<IEventDataResponse>(`/events/${eventId}`)
  return response.data
}

export const deleteEventAPI = async (eventId: string): Promise<{ success: boolean }> => {
  const response = await axiosInstance.delete<{ success: boolean }>(`/events/${eventId}`)
  return response.data
}
