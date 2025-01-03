import React from 'react'
import HomeScreen from './userpages/HomeScreen'
import LandingPage from './landingpages/landingpage'
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
