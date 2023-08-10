export interface IEventType {
  name: string
  imageUrl: string
}

export interface IEventTypeForm extends IEventType {}

export interface IEventTypeDataResponse extends IEventType {
  _id: string
  eventsCount: number
}

export interface IEventTypeTabsProps {
  eventTypes: IEventTypeDataResponse[]
  activeTab: string
  onTabChange: (value: string) => void
}

export interface EventTypeFormModalProps {
  isOpen: boolean
  onClose: () => void
}
