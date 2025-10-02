import React from 'react'

import NavbarB4Login from '../nav&footer/NavbarB4Login'
import FooterB4Login from '../nav&footer/FooterB4Login'
import { Outlet } from 'react-router-dom'
import ScrollToTop from './ScrollToTop'
import { useNetworkState } from 'react-use'
import OfflineMode from '../../utils/offlineMode'


export default function RootLayout() {
  const { online } = useNetworkState();

  if (!online) {
    return < OfflineMode />;
  }
  return (
    <div>
      <NavbarB4Login />
      <ScrollToTop />
      <Outlet />
      <FooterB4Login />
    </div>
  )
}
