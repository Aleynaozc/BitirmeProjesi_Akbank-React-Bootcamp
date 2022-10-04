import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Common/Header/Header'

function Layout() {
  return (
    <>
    <Header />
    <div className='container-fluid p-0'>
    <Outlet/>
   
    </div>
    </>
  )
}

export default Layout