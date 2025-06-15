import React, { ReactNode } from 'react'

import Navbar from '../molecules/Navbar'
import Footer from '../molecules/Footer'
import ProtectedRoute from '../molecules/ProtectedRoute'

const Staticpage = ({
  children,
  auth = false,
}: {
  children: ReactNode
  auth?: boolean
}) => {
  return (
    <ProtectedRoute auth={auth}>
      <Navbar />
      <div className="w-full overflow-x-hidden mt-[88px] h-auto relative">
        <div className="w-full min-h-[60vh]">{children}</div>
        <Footer />
      </div>
    </ProtectedRoute>
  )
}

export default Staticpage
