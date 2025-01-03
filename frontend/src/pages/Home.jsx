import React from 'react'
import HomeScreen from './userpages/HomeScreen'
import LandingPage from './landingpages/Landingpage'
import { useAuthStore } from '../../store/authUser'

const Home = () => {
  const {user} = useAuthStore();
  return (
    <>
      {user ? <HomeScreen /> : <LandingPage />}; 
    </>
  )
}

export default Home
