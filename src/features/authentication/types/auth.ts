export interface IUserData {
  name: string
  surname: string
  email: string
  _id: string
  createdAt: string
  updatedAt: string
}

export interface IAuthFormResponse extends IUserData {
  token: string
}

export interface IAuthForm {
  name: string
  surname: string
  email: string
  password: string
}

export interface IAuthFormLogin extends Pick<IAuthForm, 'email' | 'password'> {}

export interface IAuthFormProps {
  formType: 'Login' | 'Register' | 'Update user info'
  currentUserValues?: Pick<IUserData, 'email' | 'name' | 'surname'>
  onUpdatedUserData?: () => void
}

export interface IAuthTabs extends Pick<IAuthFormProps, 'formType'> {
  formType: 'Login' | 'Register'
}

export interface IAuthTabsProps {
  activeTab: IAuthTabs['formType']
  onTabChange: (newValue: IAuthTabs['formType']) => void
}

export interface UserInfoProps extends Pick<IAuthForm, 'email' | 'name' | 'surname'> {}
