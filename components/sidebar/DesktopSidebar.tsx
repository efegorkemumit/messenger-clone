import { User } from '@prisma/client'
import React from 'react'

interface DesktopSidebarProps{
    currentUser : User
}

const DesktopSidebar: React.FC<DesktopSidebarProps>=({currentUser})=> {
  return (
    <div>DesktopSidebar :  {currentUser?.email}</div>
  )
}

export default DesktopSidebar