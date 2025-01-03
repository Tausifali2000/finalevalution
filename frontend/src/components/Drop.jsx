import React from 'react'
import { useAuthStore } from '../../store/authUser';

const Drop = () => {

  const { user } = useAuthStore();
  const { username } = user;
  return (
    <select
    value={username}>
      
    </select>
  )
}

export default Drop
