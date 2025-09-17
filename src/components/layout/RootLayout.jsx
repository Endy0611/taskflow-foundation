import React from 'react'

import NavbarB4Login from '../nav&footer/NavbarB4Login'
import FooterB4Login from '../nav&footer/FooterB4Login'
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <div>
      <NavbarB4Login />
      <Outlet />
      <FooterB4Login />
    </div>
  )
}
