import React from 'react'
import { useForm } from 'react-hook-form'
import { styled, TextField, Button, Paper, Typography } from '@mui/material'
import { IAuthForm, IAuthFormLogin, IAuthFormProps } from '../types/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { loginAPI, registerAPI, updateUserAPI } from '../api/authAPI'
import { NavigateFunction, useNavigate } from 'react-router-dom'

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  width: '500px',
  minHeight: '400px',
  border: '1px solid #e6ecf0',
  borderRadius: '16px',
  margin: '50px auto',
}))

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
})

const StyledTextField = styled(TextField)({
  marginBottom: '20px',
  width: 300,
})

const StyledButton = styled(Button)({
  marginBottom: '16px',
})

const Title = styled(Typography)({
  marginTop: '16px',
  marginBottom: '50px',
})

const AuthForm: React.FC<IAuthFormProps> = ({ formType, currentUserValues, onUpdatedUserData }) => {
  const queryClient = useQueryClient()
  const navigate: NavigateFunction = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Partial<IAuthForm>>({
    defaultValues:
      formType === 'Login'
        ? { email: '', password: '' }
        : formType === 'Register'
        ? {
            email: '',
            password: '',
            name: '',
            surname: '',
          }
        : { ...currentUserValues, password: '' },
    mode: 'onSubmit',
  })

  const mutation = useMutation(
    async (values: Partial<IAuthForm>) =>
      formType === 'Login'
        ? loginAPI(values as IAuthFormLogin)
        : formType === 'Register'
        ? registerAPI(values as IAuthForm)
        : updateUserAPI(values as IAuthForm),
    {
      onSuccess: (userData) => {
        console.log(userData, 'userData')
        queryClient.setQueryData(['user'], userData)
        if ('token' in userData) {
          window.localStorage.setItem('token', userData.token)
          formType === 'Update user info' ? onUpdatedUserData && onUpdatedUserData() : navigate('/')
        }
      },
      onError: (error) => {
        console.log(error, 'error')
        alert(`Failed to ${formType}!`)
      },
    }
  )

  const onSubmit = async (values: Partial<IAuthForm>) => {
    mutation.mutate(values)
  }

  return (
    <StyledPaper>
      <Title variant="h5">{formType}</Title>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledTextField
          label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', {
            required: 'Input your Email',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          fullWidth
        />
        <StyledTextField
          label="Password"
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', {
            required: 'Input your Password',
            minLength: {
              value: 5,
              message: 'Password must be at least 5 characters',
            },
          })}
          fullWidth
        />

        {formType !== 'Login' && (
          <>
            <StyledTextField
              label="Name"
              type="text"
              error={Boolean(errors.name?.message)}
              helperText={errors.name?.message}
              {...register('name', {
                required: 'Input your Name',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
              fullWidth
            />
            <StyledTextField
              label="Surname"
              type="text"
              error={Boolean(errors.surname?.message)}
              helperText={errors.surname?.message}
              {...register('surname', {
                required: 'Input your Surname',
                minLength: {
                  value: 2,
                  message: 'Surname must be at least 2 characters',
                },
              })}
              fullWidth
            />
          </>
        )}
        <StyledButton type="submit" size="large" variant="contained" fullWidth>
          {formType}
        </StyledButton>
      </StyledForm>
    </StyledPaper>
  )
}

export default AuthForm
