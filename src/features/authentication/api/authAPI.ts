import axiosInstance from '../../../api/axiosAPI'
import { IAuthForm, IAuthFormLogin, IAuthFormResponse, IUserData } from '../types/auth'

export const loginAPI = async (payload: IAuthFormLogin): Promise<IAuthFormResponse> => {
  const response = await axiosInstance.post<IAuthFormResponse>('/auth/login', payload)
  return response.data
}

export const registerAPI = async (payload: IAuthForm): Promise<IAuthFormResponse> => {
  const response = await axiosInstance.post<IAuthFormResponse>('/auth/register', payload)
  return response.data
}

export const updateUserAPI = async (payload: IAuthForm): Promise<IAuthFormResponse> => {
  const response = await axiosInstance.patch<IAuthFormResponse>('/auth/update', payload)
  return response.data
}

export const fetchUserAPI = async (): Promise<IUserData> => {
  const response = await axiosInstance.get('/auth/me')
  return response.data
}
