import React, { useEffect } from 'react'
import { Routes, Route, NavigateFunction, useNavigate } from 'react-router-dom'
import { Header } from './shared'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import EventPage from './pages/EventPage'
import AuthPage from './pages/AuthPage'

const App = () => {
  const token: string | null = window.localStorage.getItem('token')
  const navigate: NavigateFunction = useNavigate()

  useEffect(() => {
    if (!token) {
      navigate('/auth')
    }
  }, [])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/events/:id" element={<EventPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </>
  )
}

export default App
