import axiosInstance from '../../../api/axiosAPI'
import { IEventTypeDataResponse, IEventType } from '../types/eventTypes'

export const createEventTypeAPI = async (payload: IEventType): Promise<IEventTypeDataResponse> => {
  const response = await axiosInstance.post<IEventTypeDataResponse>('/event-types', payload)
  return response.data
}

export const fetchAllEventTypesAPI = async (): Promise<IEventTypeDataResponse[]> => {
  const response = await axiosInstance.get<IEventTypeDataResponse[]>('/event-types')
  return response.data
}

export const deleteEventTypeAPI = async (eventTypeId: string): Promise<{ success: boolean }> => {
  const response = await axiosInstance.delete<{ success: boolean }>(`/event-types/${eventTypeId}`)
  return response.data
}
