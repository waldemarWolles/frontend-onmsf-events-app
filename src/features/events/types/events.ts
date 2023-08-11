import { IEventTypeDataResponse } from '../../event-types/types/eventTypes'

export interface IEvent {
  name: string
  description: string
  eventDate: Date
  eventType: string
  activityStatus: boolean
}

export interface IEventForm extends IEvent {}

export interface IEventDataResponse extends IEventForm {
  user: string
  _id: string
  createdAt: string
  updatedAt: string
}

export interface IEventFormProps {
  isOpen: boolean
  onClose: () => void
  formType: 'Create' | 'Update'
  currentEventValues?: Pick<IEventDataResponse, '_id' | 'activityStatus' | 'description' | 'name' | 'eventDate' | 'eventType'>
  eventTypes: IEventTypeDataResponse[]
}

export interface IEventMutationProps {
  formType: 'Create' | 'Update'
  onClose: () => void
  reset: () => void
  eventId?: string
}
